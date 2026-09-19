import { 
  defaultUsers, 
  defaultExperiences, 
  defaultSkills, 
  defaultChallenges, 
  defaultKnowledgeAssets, 
  defaultTimelineEvents,
  defaultLearningPath
} from '../seed/seedData.js';
import { generateToken } from '../middleware/auth.js';
import { aiService } from '../services/aiService.js';

// In-Memory dynamic reactive store (fallback & hot cache)
let users = [...defaultUsers];
let experiences = [...defaultExperiences];
let skills = [...defaultSkills];
let challenges = [...defaultChallenges];
let knowledgeAssets = [...defaultKnowledgeAssets];
let timelineEvents = [...defaultTimelineEvents];
let learningPaths = { 'user-junior-kumar': { ...defaultLearningPath } };
let mentorships = [
  {
    _id: 'm-1',
    mentorId: 'user-senior-arun',
    mentorName: 'Arun Kumar',
    menteeId: 'user-junior-kumar',
    menteeName: 'Kumar',
    skill: 'SQL Debugging',
    message: 'Looking forward to reviewing database update patterns and transaction locks!',
    status: 'accepted',
    createdAt: new Date('2024-08-01')
  }
];

export const authController = {
  login: async (req, res) => {
    try {
      const { email, password, role } = req.body;
      let user = users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
      
      // If demo quick login by role
      if (!user && role) {
        user = users.find(u => u.role === role);
      }

      if (!user) {
        // Fallback for custom emails
        user = users.find(u => u.role === (role || 'junior')) || users[1];
      }

      const token = generateToken(user);
      return res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          experienceYears: user.experienceYears,
          targetRole: user.targetRole,
          skills: user.skills,
          xp: user.xp,
          level: user.level,
          avatar: user.avatar
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  register: async (req, res) => {
    try {
      const { name, email, password, role, department, experienceYears, targetRole } = req.body;
      const existing = users.find(u => u.email === email);
      if (existing) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      const newUser = {
        _id: `user-${Date.now()}`,
        name: name || 'Demo User',
        email: email || `user_${Date.now()}@company.com`,
        password: password || 'password123',
        role: role || 'junior',
        department: department || 'Engineering',
        experienceYears: Number(experienceYears) || 1,
        targetRole: targetRole || (role === 'senior' ? 'Staff Engineer' : 'Backend Developer'),
        skills: role === 'senior' 
          ? [
              { name: 'Java', level: 90, category: 'Backend' },
              { name: 'SQL', level: 88, category: 'Database' },
              { name: 'Debugging', level: 92, category: 'Core' }
            ]
          : [
              { name: 'Java', level: 65, category: 'Backend' },
              { name: 'SQL', level: 40, category: 'Database' },
              { name: 'Debugging', level: 35, category: 'Core' }
            ],
        xp: role === 'senior' ? 2500 : 150,
        level: role === 'senior' ? 'Expert' : 'Beginner',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name || 'User'}`
      };

      users.push(newUser);
      const token = generateToken(newUser);

      return res.status(201).json({
        message: 'Registration successful',
        token,
        user: newUser
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getProfile: async (req, res) => {
    try {
      const userId = req.user?.id || req.user?._id || 'user-junior-kumar';
      const user = users.find(u => u._id === userId) || users[1];
      res.json({ user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const experienceController = {
  getAll: async (req, res) => {
    try {
      const { skill, department, search } = req.query;
      let list = [...experiences];

      if (search) {
        const s = search.toLowerCase();
        list = list.filter(e => 
          e.title.toLowerCase().includes(s) || 
          e.problem.toLowerCase().includes(s) ||
          e.solution.toLowerCase().includes(s) ||
          e.skills.some(sk => sk.toLowerCase().includes(s))
        );
      }

      if (skill) {
        list = list.filter(e => e.skills.some(sk => sk.toLowerCase() === skill.toLowerCase()));
      }

      if (department) {
        list = list.filter(e => e.department.toLowerCase() === department.toLowerCase());
      }

      res.json({ experiences: list });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const exp = experiences.find(e => e._id === req.params.id);
      if (!exp) return res.status(404).json({ error: 'Experience not found' });
      exp.views = (exp.views || 0) + 1;
      res.json({ experience: exp });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { title, project, department, problem, investigation, solution, lessons, difficulty, yearsOfExperience, authorName } = req.body;
      
      // Perform live AI Knowledge Extraction
      const fullContent = `${title} ${problem} ${investigation} ${solution} ${lessons}`;
      const aiExtraction = await aiService.extractKnowledge(fullContent, { title, investigation, solution });

      const newExp = {
        _id: `exp-${Date.now()}`,
        title: title || 'Production Incident Resolution',
        authorId: req.user?.id || 'user-senior-arun',
        authorName: authorName || req.user?.name || 'Arun Kumar',
        authorRole: req.user?.role === 'senior' ? 'Senior Backend Engineer' : 'Senior Specialist',
        project: project || 'Core Platform',
        department: department || 'Engineering',
        problem: problem || 'Incident summary',
        investigation: investigation || 'Step-by-step investigation',
        solution: solution || 'Applied fix',
        lessons: lessons || 'Best practice note',
        skills: aiExtraction.skills,
        difficulty: difficulty || aiExtraction.difficulty || 'Intermediate',
        confidence: aiExtraction.confidence || 95,
        relatedSkills: aiExtraction.relatedSkills,
        likes: 0,
        views: 1,
        transferredCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      experiences.unshift(newExp);

      // Also create a linked interactive workplace challenge automatically!
      const newChallenge = {
        _id: `chal-${Date.now()}`,
        title: `${title} - Workplace Simulation`,
        scenario: `${problem}`,
        question: `How did senior engineer ${newExp.authorName} resolve this issue in the ${project} project?`,
        options: [
          {
            id: 'A',
            text: 'Bypass verification logs and disable transactional rollback entirely.',
            isCorrect: false,
            explanation: 'Disabling transaction safeguards creates data corruption risk.'
          },
          {
            id: 'B',
            text: `${solution.slice(0, 100)}...`,
            isCorrect: true,
            explanation: `Correct! ${lessons}`
          },
          {
            id: 'C',
            text: 'Reboot the staging server and hope the issue does not recur.',
            isCorrect: false,
            explanation: 'Restarting without root cause fix does not solve code defects.'
          },
          {
            id: 'D',
            text: 'Modify database schema without testing backward compatibility.',
            isCorrect: false,
            explanation: 'Schema modifications can break active consumer services.'
          }
        ],
        skill: aiExtraction.skills[0] || 'Debugging',
        difficulty: newExp.difficulty,
        xp: 50,
        sourceExperienceId: newExp._id,
        sourceExperienceTitle: newExp.title,
        sourceExpertName: newExp.authorName
      };
      challenges.unshift(newChallenge);

      // Add to timeline
      timelineEvents.push({
        year: '2026',
        title: `${newExp.authorName} Shared: ${newExp.title}`,
        expert: newExp.authorName,
        description: `AI extracted skills [${aiExtraction.skills.join(', ')}] with ${aiExtraction.confidence}% confidence score.`,
        badge: 'New Extraction',
        type: 'tacit-capture'
      });

      // Award XP to author
      const author = users.find(u => u._id === newExp.authorId || u.name === newExp.authorName);
      if (author) {
        author.xp = (author.xp || 0) + 40;
      }

      res.status(201).json({
        message: 'Experience captured and AI knowledge extracted successfully',
        experience: newExp,
        aiExtraction,
        createdChallengeId: newChallenge._id
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  like: async (req, res) => {
    try {
      const exp = experiences.find(e => e._id === req.params.id);
      if (exp) {
        exp.likes = (exp.likes || 0) + 1;
        return res.json({ likes: exp.likes });
      }
      res.status(404).json({ error: 'Not found' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const knowledgeController = {
  uploadDocument: async (req, res) => {
    try {
      const { title, type, content, documentText } = req.body;
      const textToProcess = content || documentText || `Sample document content for ${title || 'Technical Runbook'}`;

      // Simulate extraction steps
      const extraction = await aiService.extractKnowledge(textToProcess, { title });

      const newAsset = {
        _id: `asset-${Date.now()}`,
        title: title || 'Enterprise Technical Architecture Runbook',
        type: type || 'PDF',
        content: textToProcess,
        skills: extraction.skills,
        source: 'Engineering Repository Upload',
        freshnessScore: 98,
        lastReviewed: new Date(),
        status: 'Fresh',
        riskNote: 'Newly uploaded and indexed into knowledge graph.',
        extractedProblems: [
          'Uncaught connection pool timeouts under load',
          'Distributed state inconsistency during multi-region failover'
        ],
        extractedSolutions: [
          'Configured HikariCP keepalive and validation interval',
          'Enforced Raft consensus quorum with idempotent journal'
        ]
      };

      knowledgeAssets.unshift(newAsset);

      res.status(201).json({
        message: 'Document processed and knowledge ingested',
        asset: newAsset,
        extraction: {
          skillsFound: extraction.skills,
          problemsFound: newAsset.extractedProblems,
          solutionsFound: newAsset.extractedSolutions,
          confidence: extraction.confidence,
          taxonomyCategories: extraction.categories
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllAssets: async (req, res) => {
    try {
      res.json({ assets: knowledgeAssets });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  requestReview: async (req, res) => {
    try {
      const asset = knowledgeAssets.find(a => a._id === req.params.id);
      if (asset) {
        asset.status = 'Review Needed';
        asset.lastReviewed = new Date();
        return res.json({ message: 'Review requested for senior engineering guild', asset });
      }
      res.status(404).json({ error: 'Asset not found' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const skillController = {
  getAll: async (req, res) => {
    try {
      res.json({ skills });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getKnowledgeGraph: async (req, res) => {
    try {
      // Build nodes and edges for dynamic SVG / Canvas Graph UI
      const nodes = [
        { id: 'Java', label: 'Java', category: 'Backend', level: 95, experts: ['Arun Kumar'], radius: 36, risk: 'Low' },
        { id: 'Spring Boot', label: 'Spring Boot', category: 'Backend', level: 92, experts: ['Arun Kumar', 'Priya Sharma'], radius: 32, risk: 'Low' },
        { id: 'SQL', label: 'SQL', category: 'Database', level: 94, experts: ['Arun Kumar', 'David Chen'], radius: 36, risk: 'Low' },
        { id: 'PostgreSQL', label: 'PostgreSQL', category: 'Database', level: 98, experts: ['David Chen'], radius: 32, risk: 'Medium' },
        { id: 'Database', label: 'Database', category: 'Database', level: 90, experts: ['Arun Kumar', 'David Chen'], radius: 34, risk: 'Low' },
        { id: 'Query Optimization', label: 'Query Optimization', category: 'Database', level: 95, experts: ['David Chen'], radius: 30, risk: 'High' },
        { id: 'Debugging', label: 'Debugging', category: 'Core', level: 96, experts: ['Arun Kumar', 'David Chen', 'Priya Sharma'], radius: 38, risk: 'Medium' },
        { id: 'REST API', label: 'REST API', category: 'API', level: 90, experts: ['Arun Kumar', 'Priya Sharma'], radius: 34, risk: 'Low' },
        { id: 'Authentication', label: 'Authentication', category: 'Security', level: 94, experts: ['Priya Sharma'], radius: 32, risk: 'Medium' },
        { id: 'Payment Integration', label: 'Payment Integration', category: 'Architecture', level: 88, experts: ['Arun Kumar (Sole Expert)'], radius: 38, risk: 'Critical' },
        { id: 'Redis', label: 'Redis', category: 'Database', level: 92, experts: ['David Chen'], radius: 28, risk: 'Medium' },
        { id: 'Security', label: 'Security', category: 'Security', level: 96, experts: ['Priya Sharma'], radius: 32, risk: 'Low' }
      ];

      const edges = [
        { source: 'Java', target: 'Spring Boot', label: 'Framework' },
        { source: 'Spring Boot', target: 'REST API', label: 'Exposes' },
        { source: 'REST API', target: 'Authentication', label: 'Protected By' },
        { source: 'Authentication', target: 'Security', label: 'Sub-Domain' },
        { source: 'REST API', target: 'Debugging', label: 'Diagnosed Via' },
        { source: 'REST API', target: 'Payment Integration', label: 'Gateway Endpoint' },
        { source: 'Payment Integration', target: 'Redis', label: 'Distributed Locking' },
        { source: 'Payment Integration', target: 'SQL', label: 'Idempotency Keys' },
        { source: 'SQL', target: 'Database', label: 'Core Engine' },
        { source: 'SQL', target: 'PostgreSQL', label: 'Implementation' },
        { source: 'PostgreSQL', target: 'Query Optimization', label: 'Performance' },
        { source: 'Database', target: 'Query Optimization', label: 'Tuning' },
        { source: 'Query Optimization', target: 'Debugging', label: 'Deadlock Fix' },
        { source: 'SQL', target: 'Debugging', label: 'Where Clause Bug' }
      ];

      res.json({ nodes, edges });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const skillGapController = {
  analyze: async (req, res) => {
    try {
      const user = users.find(u => u._id === req.user?.id) || users[1];
      const targetRole = req.body.targetRole || user.targetRole || 'Backend Developer';

      const analysis = await aiService.analyzeSkillGap(user.skills, targetRole, experiences);
      res.json(analysis);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const learningPathController = {
  getOrGenerate: async (req, res) => {
    try {
      const userId = req.user?.id || 'user-junior-kumar';
      let path = learningPaths[userId];

      if (!path) {
        const user = users.find(u => u._id === userId) || users[1];
        const generated = await aiService.generateLearningPath(user.skills, user.targetRole || 'Backend Developer', experiences);
        path = {
          userId,
          ...generated,
          progress: 28
        };
        learningPaths[userId] = path;
      }

      res.json({ learningPath: path });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateTaskStatus: async (req, res) => {
    try {
      const userId = req.user?.id || 'user-junior-kumar';
      const { taskId, status } = req.body;

      let path = learningPaths[userId] || defaultLearningPath;
      const task = path.tasks.find(t => t.id === taskId || t.day === Number(taskId));

      if (task) {
        task.status = status || 'completed';
        
        // Recalculate progress
        const completedCount = path.tasks.filter(t => t.status === 'completed').length;
        path.progress = Math.round((completedCount / path.tasks.length) * 100);

        // Award XP if completed
        if (status === 'completed') {
          const user = users.find(u => u._id === userId) || users[1];
          user.xp = (user.xp || 480) + (task.xp || 20);

          // Level progression check
          if (user.xp >= 1000) user.level = 'Problem Solver';
          else if (user.xp >= 600) user.level = 'Practitioner';
          else if (user.xp >= 300) user.level = 'Explorer';
        }

        return res.json({ message: 'Task updated', learningPath: path, awardedXp: task.xp });
      }

      res.status(404).json({ error: 'Task not found' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const challengeController = {
  getAll: async (req, res) => {
    try {
      res.json({ challenges });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const challenge = challenges.find(c => c._id === req.params.id);
      if (!challenge) return res.status(404).json({ error: 'Challenge not found' });
      res.json({ challenge });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  submit: async (req, res) => {
    try {
      const { challengeId, selectedOptionId } = req.body;
      const challenge = challenges.find(c => c._id === challengeId || c._id === req.params.id);
      
      if (!challenge) {
        return res.status(404).json({ error: 'Challenge not found' });
      }

      const selectedOpt = challenge.options.find(o => o.id === selectedOptionId);
      const isCorrect = selectedOpt ? selectedOpt.isCorrect : false;

      // Find linked source experience
      const sourceExp = experiences.find(e => e._id === challenge.sourceExperienceId) || experiences[0];

      let xpGained = 0;
      if (isCorrect) {
        xpGained = challenge.xp || 50;
        const userId = req.user?.id || 'user-junior-kumar';
        const user = users.find(u => u._id === userId) || users[1];
        user.xp = (user.xp || 480) + xpGained;

        // Boost user skill level
        const userSkill = user.skills.find(s => s.name.toLowerCase().includes('sql') || s.name.toLowerCase().includes('debug'));
        if (userSkill) {
          userSkill.level = Math.min(100, userSkill.level + 15);
        }

        // Increment transferred counter on source experience
        sourceExp.transferredCount = (sourceExp.transferredCount || 0) + 1;
      }

      res.json({
        isCorrect,
        selectedOption: selectedOpt,
        explanation: selectedOpt ? selectedOpt.explanation : 'Incorrect option selected.',
        xpGained,
        sourceExperience: {
          id: sourceExp._id,
          title: sourceExp.title,
          author: sourceExp.authorName,
          solution: sourceExp.solution,
          lessons: sourceExp.lessons
        },
        transferredCount: sourceExp.transferredCount
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const chatController = {
  ask: async (req, res) => {
    try {
      const { message, query } = req.body;
      const userQuery = message || query || 'How did previous developers solve database update problems?';
      const aiResponse = await aiService.answerKnowledgeQuery(userQuery, experiences, knowledgeAssets);
      res.json(aiResponse);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const mentorController = {
  getMentors: async (req, res) => {
    try {
      const { skill } = req.query;
      const seniors = users.filter(u => u.role === 'senior');
      const recommended = aiService.recommendMentors(skill || 'SQL Debugging', seniors);
      res.json({ mentors: recommended });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  requestMentorship: async (req, res) => {
    try {
      const { mentorId, skill, message } = req.body;
      const mentor = users.find(u => u._id === mentorId) || users[0];
      const mentee = users.find(u => u._id === req.user?.id) || users[1];

      const newMentorship = {
        _id: `m-${Date.now()}`,
        mentorId: mentor._id,
        mentorName: mentor.name,
        menteeId: mentee._id,
        menteeName: mentee.name,
        skill: skill || 'SQL Debugging',
        message: message || 'I would like to learn from your incident troubleshooting experience.',
        status: 'pending',
        createdAt: new Date()
      };

      mentorships.unshift(newMentorship);

      res.status(201).json({
        message: `Mentorship request sent to ${mentor.name}`,
        mentorship: newMentorship
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getMyMentorships: async (req, res) => {
    try {
      const userId = req.user?.id || 'user-junior-kumar';
      const list = mentorships.filter(m => m.menteeId === userId || m.mentorId === userId);
      res.json({ mentorships: list });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const timelineController = {
  getTimeline: async (req, res) => {
    try {
      res.json({ timeline: timelineEvents });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const adminController = {
  getAnalytics: async (req, res) => {
    try {
      const totalEmployees = users.length + 38; // realistic enterprise org representation
      const totalExperts = users.filter(u => u.role === 'senior').length + 8;
      const totalKnowledgeAssets = knowledgeAssets.length + 14;
      const totalSkillsCaptured = skills.length;
      const activeLearningPaths = 19;
      const knowledgeGapsIdentified = 7;
      const totalTransferredCount = experiences.reduce((acc, e) => acc + (e.transferredCount || 0), 0) + 84;

      const criticalRiskSkills = [
        {
          skill: 'Payment Integration',
          category: 'Fintech',
          expertCount: 1,
          primaryExpert: 'Arun Kumar',
          riskLevel: 'Critical',
          riskReason: 'Only 1 expert currently has deep tacit knowledge in this area. High business loss if unmitigated.',
          activeLearners: 8,
          transferProgress: 45
        },
        {
          skill: 'Legacy System Debugging',
          category: 'Core Engineering',
          expertCount: 2,
          primaryExpert: 'David Chen, Priya Sharma',
          riskLevel: 'High',
          riskReason: 'Legacy order pipelines known by 2 engineers nearing retirement/rotation.',
          activeLearners: 5,
          transferProgress: 60
        },
        {
          skill: 'Query Optimization & Vacuum Locks',
          category: 'Data Infrastructure',
          expertCount: 2,
          primaryExpert: 'David Chen',
          riskLevel: 'Medium',
          riskReason: 'High database load requires specialized vacuum mitigation playbooks.',
          activeLearners: 12,
          transferProgress: 75
        },
        {
          skill: 'SQL & Database Debugging',
          category: 'Backend',
          expertCount: 12,
          primaryExpert: 'Arun Kumar, Guild Leads',
          riskLevel: 'Low',
          riskReason: 'Healthy transfer rate; 14 junior engineers currently enrolled in real-world simulations.',
          activeLearners: 18,
          transferProgress: 88
        }
      ];

      const skillDistribution = [
        { name: 'Backend (Java/Spring)', value: 35, color: '#6366f1' },
        { name: 'Database & SQL', value: 25, color: '#3b82f6' },
        { name: 'Security & Auth', value: 18, color: '#10b981' },
        { name: 'Fintech / Payment', value: 12, color: '#f59e0b' },
        { name: 'DevOps / Cloud', value: 10, color: '#8b5cf6' }
      ];

      const knowledgeContributionByDepartment = [
        { department: 'HR Tech', contributions: 8, transferred: 45 },
        { department: 'Fintech Gateway', contributions: 12, transferred: 88 },
        { department: 'Cloud & Security', contributions: 7, transferred: 34 },
        { department: 'Data Infrastructure', contributions: 15, transferred: 92 },
        { department: 'Frontend Platform', contributions: 6, transferred: 28 }
      ];

      const learningProgressData = [
        { week: 'Week 1', completedChallenges: 12, xpEarned: 1400, skillsInherited: 4 },
        { week: 'Week 2', completedChallenges: 19, xpEarned: 2200, skillsInherited: 7 },
        { week: 'Week 3', completedChallenges: 28, xpEarned: 3500, skillsInherited: 12 },
        { week: 'Week 4', completedChallenges: 44, xpEarned: 5800, skillsInherited: 21 }
      ];

      res.json({
        stats: {
          totalEmployees,
          totalExperts,
          totalKnowledgeAssets,
          totalSkillsCaptured,
          activeLearningPaths,
          knowledgeGapsIdentified,
          totalTransferredCount
        },
        criticalRiskSkills,
        skillDistribution,
        knowledgeContributionByDepartment,
        learningProgressData
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
