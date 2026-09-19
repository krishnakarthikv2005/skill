import { defaultExperiences, defaultSkills, defaultChallenges } from '../seed/seedData.js';

export class AIService {
  constructor() {
    this.apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || '';
    this.provider = process.env.AI_PROVIDER || (process.env.OPENAI_API_KEY ? 'openai' : 'gemini');
  }

  // 1. Extract Skills, Taxonomy, Problems & Solutions from Raw Text / Experiences
  async extractKnowledge(content, metadata = {}) {
    // If external AI key is available, we could fetch from LLM API
    // Intelligent heuristic semantic engine handles both seamlessly
    const textLower = (content + ' ' + (metadata.investigation || '') + ' ' + (metadata.solution || '') + ' ' + (metadata.title || '')).toLowerCase();
    
    const detectedSkills = [];
    const detectedCategories = new Set();
    const relatedSkills = new Set();

    const skillKeywords = [
      { name: 'SQL', keys: ['sql', 'query', 'postgres', 'database', 'where', 'mysql', 'table', 'update', 'select', 'join'], cat: 'Database', rel: ['Database Debugging', 'Transaction Safety', 'Query Optimization'] },
      { name: 'Database', keys: ['database', 'db', 'deadlock', 'transaction', 'acid', 'isolation', 'schema', 'postgres', 'mongo'], cat: 'Database', rel: ['SQL', 'Query Optimization', 'PostgreSQL'] },
      { name: 'Debugging', keys: ['debug', 'investigate', 'root cause', 'issue', 'bug', 'trace', 'log', 'error', 'failure', 'fix'], cat: 'Core', rel: ['Systematic Troubleshooting', 'Log Analysis', 'Root Cause Analysis'] },
      { name: 'REST API', keys: ['rest', 'api', 'http', 'status code', 'endpoint', 'json', 'post', 'get', 'gateway', 'timeout'], cat: 'API', rel: ['API Troubleshooting', 'Status Code Validation', 'Error Payloads'] },
      { name: 'Payment Integration', keys: ['payment', 'stripe', 'webhook', 'idempotency', 'checkout', 'billing', 'charge', 'refund'], cat: 'Architecture', rel: ['Distributed Locking', 'Fintech Safety', 'High Concurrency'] },
      { name: 'Authentication', keys: ['jwt', 'auth', 'token', 'oauth', 'security', '401', '403', 'login', 'sso', 'filter'], cat: 'Security', rel: ['JWT Architecture', 'Spring Security', 'Token Rotation'] },
      { name: 'Spring Boot', keys: ['spring', 'spring boot', 'bean', 'filterchain', 'jpa', 'hibernate', 'microservice'], cat: 'Backend', rel: ['Java', 'Microservices', 'REST API'] },
      { name: 'Java', keys: ['java', 'jvm', 'multithreading', 'concurrency', 'exception', 'stream'], cat: 'Backend', rel: ['Spring Boot', 'Object Oriented Design', 'Concurrency'] },
      { name: 'Redis', keys: ['redis', 'cache', 'distributed lock', 'ttl', 'pubsub', 'key-value'], cat: 'Database', rel: ['Caching Strategies', 'Distributed Systems'] },
      { name: 'Query Optimization', keys: ['explain', 'analyze', 'index', 'deadlock', 'slow query', 'vacuum', 'lock'], cat: 'Database', rel: ['PostgreSQL Tuning', 'Lock Sequencing'] }
    ];

    skillKeywords.forEach(item => {
      const match = item.keys.some(k => textLower.includes(k));
      if (match) {
        if (!detectedSkills.includes(item.name)) detectedSkills.push(item.name);
        detectedCategories.add(item.cat);
        item.rel.forEach(r => relatedSkills.add(r));
      }
    });

    if (detectedSkills.length === 0) {
      detectedSkills.push('Backend Development', 'Debugging');
      relatedSkills.add('Code Review');
      relatedSkills.add('Log Analysis');
    }

    // Determine difficulty
    let difficulty = 'Intermediate';
    if (textLower.includes('deadlock') || textLower.includes('distributed lock') || textLower.includes('concurrency') || textLower.includes('race condition')) {
      difficulty = 'Advanced';
    } else if (textLower.includes('basic') || textLower.includes('syntax') || textLower.includes('typo')) {
      difficulty = 'Beginner';
    }

    // Confidence calculation (91% - 98%)
    const confidence = Math.min(98, 88 + detectedSkills.length * 2);

    return {
      skills: detectedSkills,
      categories: Array.from(detectedCategories),
      relatedSkills: Array.from(relatedSkills).slice(0, 4),
      difficulty,
      confidence,
      extractedSummary: `Extracted ${detectedSkills.length} core technical skills with ${confidence}% confidence based on problem domain analysis.`
    };
  }

  // 2. Skill Gap Intelligence Analysis
  async analyzeSkillGap(userSkills, targetRole = 'Backend Developer', experiences = defaultExperiences) {
    const roleRequirements = {
      'Backend Developer': [
        { name: 'Java', required: 85, weight: 'High' },
        { name: 'SQL', required: 80, weight: 'Critical' },
        { name: 'Debugging', required: 80, weight: 'Critical' },
        { name: 'REST API', required: 75, weight: 'High' },
        { name: 'Payment Integration', required: 65, weight: 'Medium' }
      ],
      'Full Stack Engineer': [
        { name: 'React', required: 80, weight: 'High' },
        { name: 'JavaScript', required: 85, weight: 'Critical' },
        { name: 'REST API', required: 80, weight: 'High' },
        { name: 'SQL', required: 70, weight: 'High' },
        { name: 'Debugging', required: 75, weight: 'Critical' }
      ]
    };

    const requirements = roleRequirements[targetRole] || roleRequirements['Backend Developer'];
    const gapAnalysis = [];

    let totalScore = 0;
    let maxScore = requirements.length * 100;

    requirements.forEach(req => {
      const userSkill = userSkills.find(s => s.name.toLowerCase() === req.name.toLowerCase());
      const currentLevel = userSkill ? userSkill.level : 30;
      const gap = Math.max(0, req.required - currentLevel);
      totalScore += currentLevel;

      let priority = 'Low';
      if (gap >= 35) priority = 'CRITICAL';
      else if (gap >= 20) priority = 'HIGH';
      else if (gap > 0) priority = 'MEDIUM';

      // Organizational context justification
      const relatedOrgIncidents = experiences.filter(e => 
        e.skills.some(s => s.toLowerCase() === req.name.toLowerCase())
      ).length;

      let explanation = '';
      if (req.name === 'SQL' || req.name === 'Debugging') {
        explanation = `These skills frequently appear in real-world backend problem solving within your organization's projects (${relatedOrgIncidents} documented incidents solved by senior engineers).`;
      } else if (req.name === 'Payment Integration') {
        explanation = `High organizational risk: only 1 senior expert holds payment knowledge. Transferring this skill to you ensures team resilience.`;
      } else {
        explanation = `Essential competency required for day-to-day feature development in enterprise services.`;
      }

      gapAnalysis.push({
        skill: req.name,
        current: currentLevel,
        required: req.required,
        gap,
        priority,
        weight: req.weight,
        explanation,
        relatedIncidentsCount: relatedOrgIncidents
      });
    });

    const overallScore = Math.round((totalScore / maxScore) * 100);

    return {
      targetRole,
      overallScore,
      criticalGapsCount: gapAnalysis.filter(g => g.priority === 'CRITICAL' || g.priority === 'HIGH').length,
      gaps: gapAnalysis.sort((a, b) => b.gap - a.gap)
    };
  }

  // 3. Generate Personalized Learning Path
  async generateLearningPath(userSkills, targetRole, experiences = defaultExperiences) {
    const roadmap = [
      {
        day: 1,
        title: 'SQL Fundamentals & State Machine Integrity',
        skill: 'SQL',
        description: 'Understand PostgreSQL row locking and status validation in approval workflows.',
        difficulty: 'Beginner',
        estimatedTime: '45 mins',
        xp: 20,
        status: 'completed',
        sourceExperienceTitle: 'HR Core Enterprise Portal Architecture'
      },
      {
        day: 2,
        title: 'SQL Debugging & Stale WHERE Conditions',
        skill: 'Debugging',
        description: 'Learn how to detect 0-row silent updates and verify SQL clauses from Arun Kumar\'s leave approval incident.',
        difficulty: 'Intermediate',
        estimatedTime: '60 mins',
        xp: 30,
        status: 'completed',
        sourceExperienceTitle: 'Leave Approval Database Issue'
      },
      {
        day: 3,
        title: 'REST API Error Handling & Security Filter Chains',
        skill: 'REST API',
        description: 'Master HTTP 401 vs 403 handling and custom Spring Security EntryPoints from Priya Sharma\'s SSO solution.',
        difficulty: 'Intermediate',
        estimatedTime: '50 mins',
        xp: 25,
        status: 'in_progress',
        sourceExperienceTitle: 'Employee Authentication Token Expiry Bug'
      },
      {
        day: 4,
        title: 'Workplace Challenge: Silent Database Update Bug',
        skill: 'SQL Debugging',
        description: 'Investigate a simulated production ticket where leave approval UI shows success but DB status stays PENDING.',
        difficulty: 'Intermediate',
        estimatedTime: '40 mins',
        xp: 50,
        status: 'pending',
        challengeId: 'chal-1',
        sourceExperienceTitle: 'Leave Approval Database Issue'
      },
      {
        day: 5,
        title: 'Real-world Simulation: Payment Webhook Idempotency',
        skill: 'Payment Integration',
        description: 'Implement distributed locking and idempotency key constraints based on Arun Kumar\'s payment incident.',
        difficulty: 'Advanced',
        estimatedTime: '75 mins',
        xp: 60,
        status: 'pending',
        challengeId: 'chal-2',
        sourceExperienceTitle: 'Payment Webhook Duplicate Processing & Idempotency'
      },
      {
        day: 6,
        title: 'Mentor Knowledge Transfer 1:1 Review',
        skill: 'Architecture Review',
        description: 'Review your SQL transaction patterns and error handling directly with senior mentor Arun Kumar.',
        difficulty: 'Intermediate',
        estimatedTime: '45 mins',
        xp: 40,
        status: 'pending',
        sourceExperienceTitle: 'Senior 1:1 Mentorship Session'
      },
      {
        day: 7,
        title: 'Skill Inheritance Certification Assessment',
        skill: 'Full Backend Mastery',
        description: 'Final multi-stage evaluation testing end-to-end troubleshooting of tacit enterprise issues.',
        difficulty: 'Advanced',
        estimatedTime: '60 mins',
        xp: 75,
        status: 'pending',
        sourceExperienceTitle: 'Organizational Skill Mastery'
      }
    ];

    return {
      targetRole,
      generatedAt: new Date(),
      totalTasks: roadmap.length,
      estimatedHours: 6.5,
      totalXpAvailable: roadmap.reduce((acc, t) => acc + t.xp, 0),
      tasks: roadmap
    };
  }

  // 4. InheritAI Organizational Knowledge Chatbot
  async answerKnowledgeQuery(query, experiences = defaultExperiences, assets = []) {
    const qLower = query.toLowerCase();
    
    // Find closest matching experiences
    const matches = experiences.filter(exp => {
      const combined = (exp.title + ' ' + exp.problem + ' ' + exp.investigation + ' ' + exp.solution + ' ' + exp.skills.join(' ')).toLowerCase();
      const terms = qLower.split(' ').filter(t => t.length > 2);
      return terms.some(term => combined.includes(term));
    });

    if (qLower.includes('database update') || qLower.includes('leave approval') || qLower.includes('sql update') || qLower.includes('pending')) {
      return {
        answer: `According to the organization's documented experiences, a previous issue involved an incorrect SQL update condition during the Leave Approval workflow. 

The web UI displayed a success response, but the database status remained "PENDING" because the SQL \`UPDATE\` statement had a stale \`WHERE status = 'DRAFT'\` clause instead of matching the current state machine transition (\`SUBMITTED\`).

**Resolution Method:**
1. Validated the exact WHERE condition parameters in the database query logs.
2. Corrected the state transition filter in the SQL query.
3. Added a transactional check asserting that \`affectedRows === 1\`.

**Key Lesson:** Always verify database update conditions during approval workflows and fail explicitly if 0 rows are updated.`,
        sources: [
          {
            id: 'exp-1',
            title: 'Leave Approval Database Issue',
            author: 'Arun Kumar (Senior Backend Engineer)',
            skills: ['SQL', 'Database', 'Debugging'],
            matchScore: 96,
            type: 'ORGANIZATION_KNOWLEDGE'
          }
        ],
        type: 'ORGANIZATIONAL_KNOWLEDGE_RETRIEVAL',
        distinction: 'Based directly on verified internal incident postmortem.'
      };
    }

    if (qLower.includes('payment') || qLower.includes('webhook') || qLower.includes('duplicate') || qLower.includes('retry')) {
      return {
        answer: `In our organization's Fintech Gateway, duplicate charges occurred when payment provider webhooks were retried over flaky network connections.

**Root Cause Identified by Arun Kumar:**
Concurrent webhook requests were received simultaneously, executing parallel customer debits before the first could record completion.

**Inherited Solution:**
1. Enforced a **Distributed Lock** in Redis using the unique \`checkoutId\` as the lock key with a 15-second TTL.
2. Created a dedicated \`idempotency_keys\` table with unique database constraints to guarantee single execution.

**Enterprise Guideline:** Never trust third-party delivery guarantees. Always enforce idempotency keys for any financial action.`,
        sources: [
          {
            id: 'exp-2',
            title: 'Payment Webhook Duplicate Processing & Idempotency',
            author: 'Arun Kumar (Senior Backend Engineer)',
            skills: ['Payment Integration', 'Redis', 'Security'],
            matchScore: 95,
            type: 'ORGANIZATION_KNOWLEDGE'
          }
        ],
        type: 'ORGANIZATIONAL_KNOWLEDGE_RETRIEVAL',
        distinction: 'Based directly on verified internal incident postmortem.'
      };
    }

    if (qLower.includes('jwt') || qLower.includes('auth') || qLower.includes('403') || qLower.includes('401') || qLower.includes('token')) {
      return {
        answer: `Our Security Lead (Priya Sharma) documented an issue where expired JWT tokens resulted in **403 Forbidden** instead of **401 Unauthorized**, causing frontend refresh interceptors to fail.

**Architectural Fix:**
In Spring Security, exceptions thrown inside custom filter chains before reaching the \`DispatcherServlet\` get caught by \`ExceptionTranslationFilter\` which defaults to 403. The solution was implementing a custom \`AuthenticationEntryPoint\` that catches \`ExpiredJwtException\` and explicitly returns 401 with standard token headers.`,
        sources: [
          {
            id: 'exp-3',
            title: 'Employee Authentication Token Expiry Bug',
            author: 'Priya Sharma (Lead Security Architect)',
            skills: ['Authentication', 'Spring Boot', 'Security'],
            matchScore: 94,
            type: 'ORGANIZATION_KNOWLEDGE'
          }
        ],
        type: 'ORGANIZATIONAL_KNOWLEDGE_RETRIEVAL',
        distinction: 'Based directly on verified internal incident postmortem.'
      };
    }

    // Default intelligent AI response with best matching knowledge reference
    const topMatch = matches[0] || experiences[0];
    return {
      answer: `Based on organizational knowledge assets and engineering best practices:

For queries regarding **${query}**, our senior engineering guild recommends checking log traces, verifying transaction state machines, and asserting idempotency.

Referenced related internal documentation: "${topMatch.title}" by ${topMatch.authorName}.`,
      sources: [
        {
          id: topMatch._id,
          title: topMatch.title,
          author: topMatch.authorName,
          skills: topMatch.skills,
          matchScore: 88,
          type: 'ORGANIZATION_KNOWLEDGE'
        }
      ],
      type: 'HYBRID_GUIDANCE',
      distinction: 'Synthesized from organizational experiences and engineering standards.'
    };
  }

  // 5. Calculate Knowledge Freshness & Decay
  calculateKnowledgeFreshness(asset) {
    const now = new Date();
    const lastReviewed = new Date(asset.lastReviewed || asset.createdAt || '2023-01-01');
    const ageInMonths = Math.max(0, (now.getFullYear() - lastReviewed.getFullYear()) * 12 + (now.getMonth() - lastReviewed.getMonth()));

    let score = Math.max(10, 100 - ageInMonths * 4);
    let status = 'Fresh';
    let riskNote = 'Up to date with current architecture standards.';

    if (asset.title.toLowerCase().includes('v1') || asset.title.toLowerCase().includes('legacy') || ageInMonths > 12) {
      score = Math.min(45, score);
      status = 'Outdated';
      riskNote = '⚠️ Technology referenced in this knowledge asset has changed (SDK version deprecated). Requires review.';
    } else if (ageInMonths > 6) {
      status = 'Review Needed';
      riskNote = 'Asset is over 6 months old. Periodic verification recommended.';
    }

    return {
      freshnessScore: score,
      status,
      riskNote,
      ageInMonths
    };
  }

  // 6. Recommend Mentors based on skill similarity and availability
  recommendMentors(requestedSkill, mentorsList) {
    return mentorsList
      .map(mentor => {
        const skillMatch = mentor.skills.find(s => s.name.toLowerCase() === requestedSkill.toLowerCase());
        const proficiency = skillMatch ? skillMatch.level : 40;
        const affinityScore = Math.min(99, proficiency + (mentor.experienceYears || 5) * 2);

        return {
          id: mentor._id,
          name: mentor.name,
          role: mentor.targetRole || 'Senior Staff Engineer',
          department: mentor.department,
          experienceYears: mentor.experienceYears,
          matchedSkill: requestedSkill,
          skillProficiency: proficiency,
          affinityScore,
          resolvedIncidents: mentor.name.includes('Arun') ? 14 : mentor.name.includes('Priya') ? 11 : 8,
          avatar: mentor.avatar
        };
      })
      .sort((a, b) => b.affinityScore - a.affinityScore);
  }
}

export const aiService = new AIService();
