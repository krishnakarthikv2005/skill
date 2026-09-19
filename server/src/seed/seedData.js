export const defaultUsers = [
  {
    _id: 'user-senior-arun',
    name: 'Arun Kumar',
    email: 'arun@company.com',
    password: 'password123',
    role: 'senior',
    department: 'Core Backend',
    experienceYears: 8,
    targetRole: 'Principal Backend Architect',
    skills: [
      { name: 'Java', level: 95, category: 'Backend' },
      { name: 'Spring Boot', level: 92, category: 'Backend' },
      { name: 'SQL', level: 94, category: 'Database' },
      { name: 'REST API', level: 90, category: 'API' },
      { name: 'Debugging', level: 96, category: 'Core' },
      { name: 'Payment Integration', level: 88, category: 'Architecture' }
    ],
    xp: 3450,
    level: 'Expert',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    _id: 'user-junior-kumar',
    name: 'Kumar',
    email: 'kumar@company.com',
    password: 'password123',
    role: 'junior',
    department: 'Core Backend',
    experienceYears: 1,
    targetRole: 'Backend Developer',
    skills: [
      { name: 'Java', level: 75, category: 'Backend' },
      { name: 'SQL', level: 45, category: 'Database' },
      { name: 'Debugging', level: 40, category: 'Core' },
      { name: 'REST API', level: 60, category: 'API' },
      { name: 'Payment Integration', level: 20, category: 'Architecture' }
    ],
    xp: 480,
    level: 'Explorer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
  },
  {
    _id: 'user-admin-sophia',
    name: 'Sophia Vance',
    email: 'admin@company.com',
    password: 'password123',
    role: 'admin',
    department: 'Engineering Leadership',
    experienceYears: 14,
    targetRole: 'VP of Engineering',
    skills: [
      { name: 'Architecture', level: 98, category: 'Leadership' },
      { name: 'System Design', level: 95, category: 'Architecture' },
      { name: 'Knowledge Governance', level: 99, category: 'Governance' }
    ],
    xp: 7200,
    level: 'Master',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    _id: 'user-senior-priya',
    name: 'Priya Sharma',
    email: 'priya@company.com',
    password: 'password123',
    role: 'senior',
    department: 'Cloud & Security',
    experienceYears: 9,
    targetRole: 'Lead Security Architect',
    skills: [
      { name: 'Security', level: 96, category: 'Security' },
      { name: 'Authentication', level: 94, category: 'Security' },
      { name: 'AWS', level: 91, category: 'Cloud' },
      { name: 'Microservices', level: 89, category: 'Architecture' }
    ],
    xp: 3890,
    level: 'Expert',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  {
    _id: 'user-senior-david',
    name: 'David Chen',
    email: 'david@company.com',
    password: 'password123',
    role: 'senior',
    department: 'Data Infrastructure',
    experienceYears: 11,
    targetRole: 'Staff Database Engineer',
    skills: [
      { name: 'PostgreSQL', level: 98, category: 'Database' },
      { name: 'Query Optimization', level: 95, category: 'Database' },
      { name: 'Redis', level: 92, category: 'Database' },
      { name: 'High Availability', level: 90, category: 'Infrastructure' }
    ],
    xp: 4100,
    level: 'Expert',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  }
];

export const defaultExperiences = [
  {
    _id: 'exp-1',
    title: 'Leave Approval Database Issue',
    authorId: 'user-senior-arun',
    authorName: 'Arun Kumar',
    authorRole: 'Senior Backend Engineer (8 yrs exp)',
    project: 'HR Core Enterprise Portal',
    department: 'HR Tech',
    problem: 'Employee leave approval status was not updating in the PostgreSQL database even though the frontend UI showed "Approval Successful".',
    investigation: 'Checked API gateway logs and traced database query execution. Discovered the SQL UPDATE statement had a stale WHERE clause condition (WHERE status = "DRAFT" instead of "SUBMITTED"), causing 0 rows to be updated silently without throwing a syntax error.',
    solution: 'Corrected the SQL update condition to match state machine transitions and added transactional assertion checking affectedRows > 0.',
    lessons: 'Always verify database update WHERE conditions during multi-state approval workflows, and assert affectedRows === 1 in critical transactions.',
    skills: ['SQL', 'Database', 'Debugging', 'REST API', 'Backend Development'],
    difficulty: 'Intermediate',
    confidence: 96,
    relatedSkills: ['Database Debugging', 'Transaction Safety', 'State Machine Validation'],
    likes: 24,
    views: 188,
    transferredCount: 14,
    createdAt: new Date('2024-03-15T10:30:00Z'),
    updatedAt: new Date('2024-03-15T10:30:00Z')
  },
  {
    _id: 'exp-2',
    title: 'Payment Webhook Duplicate Processing & Idempotency',
    authorId: 'user-senior-arun',
    authorName: 'Arun Kumar',
    authorRole: 'Senior Backend Engineer (8 yrs exp)',
    project: 'Global Checkout Gateway',
    department: 'Fintech',
    problem: 'Customers were occasionally charged twice when their bank network retried webhook notifications during high-traffic flash sales.',
    investigation: 'Inspected payment gateway logs. Identified race conditions where two simultaneous webhook requests for the same checkoutId executed parallel credit debits before either could write the completion record.',
    solution: 'Introduced Redis distributed locking around checkoutId combined with a dedicated idempotency_keys database table with unique constraints.',
    lessons: 'Never rely on third-party webhook single-delivery guarantees. Every financial webhook must be protected by an atomic idempotency key and distributed lock.',
    skills: ['Payment Integration', 'Redis', 'Security', 'Debugging', 'Database'],
    difficulty: 'Advanced',
    confidence: 94,
    relatedSkills: ['Distributed Locking', 'Fintech Safety', 'High Concurrency'],
    likes: 42,
    views: 310,
    transferredCount: 22,
    createdAt: new Date('2024-05-10T14:15:00Z'),
    updatedAt: new Date('2024-05-10T14:15:00Z')
  },
  {
    _id: 'exp-3',
    title: 'Employee Authentication Token Expiry Bug',
    authorId: 'user-senior-priya',
    authorName: 'Priya Sharma',
    authorRole: 'Lead Security Architect (9 yrs exp)',
    project: 'Single Sign-On (SSO) Platform',
    department: 'Cloud & Security',
    problem: 'When user JWT expired, the backend silently returned 403 Forbidden instead of 401 Unauthorized, preventing the frontend token refresh interceptor from refreshing tokens.',
    investigation: 'Examined Spring Security FilterChain ordering. Found that ExpiredJwtException in the custom JWT filter was caught by general ExceptionTranslationFilter rather than custom AuthEntryPoint.',
    solution: 'Explicitly routed ExpiredJwtException to a dedicated AuthenticationEntryPoint returning standard 401 with Token-Expired header.',
    lessons: 'In Spring Security, exceptions thrown inside custom filters before DispatcherServlet must be handled explicitly through HandlerExceptionResolver or AuthenticationEntryPoint.',
    skills: ['Authentication', 'API', 'Security', 'Spring Boot', 'Debugging'],
    difficulty: 'Intermediate',
    confidence: 95,
    relatedSkills: ['JWT Architecture', 'OAuth2', 'Spring Security'],
    likes: 31,
    views: 245,
    transferredCount: 19,
    createdAt: new Date('2024-06-01T09:00:00Z'),
    updatedAt: new Date('2024-06-01T09:00:00Z')
  },
  {
    _id: 'exp-4',
    title: 'High Concurrency Postgres Deadlock on Inventory Allocation',
    authorId: 'user-senior-david',
    authorName: 'David Chen',
    authorRole: 'Staff Database Engineer (11 yrs exp)',
    project: 'Order Management System',
    department: 'Data Infrastructure',
    problem: 'Sudden surge in concurrent multi-item checkout requests triggered PostgreSQL ERROR 40P01: deadlock detected during row-level locking.',
    investigation: 'Analyzed pg_locks and pg_stat_activity. Thread A was locking Product #12 then #45, while concurrent Thread B locked Product #45 then #12.',
    solution: 'Enforced sorted ascending primary key row locking (ORDER BY item_id ASC) in SQL before executing inventory decrements in transactions.',
    lessons: 'Always acquire multiple resource locks in a strict global deterministic order to mathematically eliminate circular deadlocks.',
    skills: ['PostgreSQL', 'SQL', 'Query Optimization', 'Database', 'Debugging'],
    difficulty: 'Advanced',
    confidence: 97,
    relatedSkills: ['Lock Sequencing', 'Database Concurrency', 'ACID Isolation'],
    likes: 56,
    views: 412,
    transferredCount: 29,
    createdAt: new Date('2024-07-20T16:40:00Z'),
    updatedAt: new Date('2024-07-20T16:40:00Z')
  }
];

export const defaultSkills = [
  {
    name: 'Java',
    category: 'Backend',
    description: 'Core object-oriented backend programming language used in enterprise services.',
    relatedSkills: ['Spring Boot', 'REST API', 'Debugging'],
    expertCount: 9,
    learnerCount: 14,
    riskLevel: 'Low',
    riskReason: 'Widely distributed expertise across backend teams.'
  },
  {
    name: 'Spring Boot',
    category: 'Backend',
    description: 'Enterprise Java microservice framework for building scalable REST APIs.',
    relatedSkills: ['Java', 'REST API', 'Authentication'],
    expertCount: 7,
    learnerCount: 11,
    riskLevel: 'Low',
    riskReason: 'Healthy expert-to-learner ratio.'
  },
  {
    name: 'SQL',
    category: 'Database',
    description: 'Relational query language, indexing, transactional queries and joins.',
    relatedSkills: ['Database', 'Query Optimization', 'PostgreSQL', 'Debugging'],
    expertCount: 12,
    learnerCount: 18,
    riskLevel: 'Low',
    riskReason: 'Core competency well supported by database guilds.'
  },
  {
    name: 'REST API',
    category: 'API',
    description: 'API design, status codes, payload formatting, rate limiting, and webhooks.',
    relatedSkills: ['Java', 'Spring Boot', 'Authentication', 'Debugging'],
    expertCount: 8,
    learnerCount: 15,
    riskLevel: 'Low',
    riskReason: 'Well documented across internal services.'
  },
  {
    name: 'Debugging',
    category: 'Core Engineering',
    description: 'Systematic root-cause diagnosis, log analysis, profiling, and reproduction.',
    relatedSkills: ['SQL', 'REST API', 'Java', 'Database'],
    expertCount: 6,
    learnerCount: 22,
    riskLevel: 'Medium',
    riskReason: 'High demand from juniors with fewer senior debugging playbooks recorded.'
  },
  {
    name: 'Payment Integration',
    category: 'Fintech / Architecture',
    description: 'Stripe/Adyen payment gateways, idempotency keys, webhook verification, and reconciliation.',
    relatedSkills: ['Security', 'Redis', 'Database', 'REST API'],
    expertCount: 1,
    learnerCount: 8,
    riskLevel: 'Critical',
    riskReason: 'Only 1 expert (Arun Kumar) currently holds end-to-end payment knowledge. High business risk if not transferred.'
  },
  {
    name: 'Authentication',
    category: 'Security',
    description: 'JWT tokens, OAuth2, SSO, session management, and filter chains.',
    relatedSkills: ['Security', 'REST API', 'Spring Boot'],
    expertCount: 2,
    learnerCount: 9,
    riskLevel: 'Medium',
    riskReason: 'Only 2 security leads manage SSO across all products.'
  },
  {
    name: 'Query Optimization',
    category: 'Database',
    description: 'EXPLAIN ANALYZE, indexing strategies, deadlock mitigation, vacuuming.',
    relatedSkills: ['SQL', 'PostgreSQL', 'Database'],
    expertCount: 2,
    learnerCount: 12,
    riskLevel: 'High',
    riskReason: 'Critical database performance optimization concentrated in 2 staff engineers.'
  }
];

export const defaultChallenges = [
  {
    _id: 'chal-1',
    title: 'Silent Database Update Failure in Approval Workflow',
    scenario: 'In the HR Portal, an employee submits an approval request. The web UI displays "Status Updated: Approved" and a 200 OK HTTP status. However, when the manager checks the database record later, the status column remains "PENDING".',
    question: 'As a Junior Developer assigned to triage this incident, what is the most effective first step to diagnose the issue?',
    options: [
      {
        id: 'A',
        text: 'Rebuild the React frontend UI bundle and clear browser cache.',
        isCorrect: false,
        explanation: 'The frontend already successfully received a 200 response; the problem is downstream in the backend update query logic.'
      },
      {
        id: 'B',
        text: 'Inspect backend query logs and verify the WHERE condition of the SQL UPDATE statement.',
        isCorrect: true,
        explanation: 'Correct! As documented in Arun Kumar\'s Leave Approval incident, SQL UPDATE queries with mismatched WHERE clauses (e.g. status = "DRAFT" vs "SUBMITTED") succeed without error but affect 0 rows.'
      },
      {
        id: 'C',
        text: 'Restart the PostgreSQL server cluster immediately.',
        isCorrect: false,
        explanation: 'Restarting the database disrupts active users without addressing the underlying query logic bug.'
      },
      {
        id: 'D',
        text: 'Delete and recreate the employees table schema.',
        isCorrect: false,
        explanation: 'Destructive schema modifications will cause data loss and are unrelated to query parameter matching.'
      }
    ],
    skill: 'SQL Debugging',
    difficulty: 'Intermediate',
    xp: 50,
    sourceExperienceId: 'exp-1',
    sourceExperienceTitle: 'Leave Approval Database Issue',
    sourceExpertName: 'Arun Kumar'
  },
  {
    _id: 'chal-2',
    title: 'Duplicate Payment Triggered on Webhook Retry',
    scenario: 'During a Black Friday spike, a customer receives two order confirmation emails and gets charged twice for order #9021. The payment provider retried the webhook 3 seconds after the initial dispatch.',
    question: 'How should you architect the payment webhook endpoint to permanently eliminate duplicate charges?',
    options: [
      {
        id: 'A',
        text: 'Reject all incoming webhooks if the server CPU load is over 70%.',
        isCorrect: false,
        explanation: 'Rejecting webhooks will cause lost payment confirmation events.'
      },
      {
        id: 'B',
        text: 'Implement an atomic Idempotency Key check with Redis distributed locking on orderId.',
        isCorrect: true,
        explanation: 'Correct! As captured in Arun Kumar\'s Payment Gateway playbook, distributed locking with an idempotency key guarantees only the first webhook executes debit logic.'
      },
      {
        id: 'C',
        text: 'Ask the payment provider never to send retried webhooks.',
        isCorrect: false,
        explanation: 'Webhooks are best-effort at-least-once deliveries; the receiving system must be idempotent.'
      },
      {
        id: 'D',
        text: 'Add a 5-second sleep delay before processing payments.',
        isCorrect: false,
        explanation: 'Artificial thread sleeps worsen concurrency bottlenecks and do not prevent race conditions.'
      }
    ],
    skill: 'Payment Integration',
    difficulty: 'Advanced',
    xp: 60,
    sourceExperienceId: 'exp-2',
    sourceExperienceTitle: 'Payment Webhook Duplicate Processing & Idempotency',
    sourceExpertName: 'Arun Kumar'
  },
  {
    _id: 'chal-3',
    title: 'Expired JWT Token Returning 403 Forbidden instead of 401',
    scenario: 'Frontend developers report that expired access tokens cause the application to log the user out abruptly instead of triggering the silent OAuth refresh endpoint.',
    question: 'What is the root architectural cause in the Spring Security FilterChain?',
    options: [
      {
        id: 'A',
        text: 'The database user table is missing an expired_at timestamp index.',
        isCorrect: false,
        explanation: 'Token validity is verified by JWT signature and claims, not by database polling.'
      },
      {
        id: 'B',
        text: 'ExpiredJwtException occurred before DispatcherServlet and was caught by general ExceptionTranslationFilter defaulting to 403.',
        isCorrect: true,
        explanation: 'Correct! As solved by Priya Sharma, unhandled security filter exceptions must be delegated to a custom AuthenticationEntryPoint to return explicit 401 Unauthorized.'
      },
      {
        id: 'C',
        text: 'The browser localStorage is corrupted.',
        isCorrect: false,
        explanation: 'The HTTP status code 403 originates directly from the backend security filter.'
      },
      {
        id: 'D',
        text: 'CORS headers are blocking JWT decryption on port 8080.',
        isCorrect: false,
        explanation: 'CORS affects cross-origin browser transport, not backend JWT parsing logic.'
      }
    ],
    skill: 'Authentication',
    difficulty: 'Intermediate',
    xp: 45,
    sourceExperienceId: 'exp-3',
    sourceExperienceTitle: 'Employee Authentication Token Expiry Bug',
    sourceExpertName: 'Priya Sharma'
  }
];

export const defaultKnowledgeAssets = [
  {
    _id: 'asset-1',
    title: 'Enterprise PostgreSQL Production Runbook & Query Tuning',
    type: 'RUNBOOK',
    content: 'Standard operating procedures for managing high-volume Postgres clusters, index maintenance, vacuum policies, and investigating lock contentions.',
    skills: ['PostgreSQL', 'SQL', 'Query Optimization', 'Database'],
    source: 'Data Infrastructure Guild',
    freshnessScore: 92,
    lastReviewed: new Date('2024-08-10'),
    status: 'Fresh',
    riskNote: 'Recently updated with PG16 partition optimization rules.',
    extractedProblems: ['Deadlocks on multi-row updates', 'Slow seq scans on legacy audit logs'],
    extractedSolutions: ['Enforce ORDER BY primary key locking', 'Add partial BRIN indexes']
  },
  {
    _id: 'asset-2',
    title: 'Payment API Integration Guide (v1 SDK)',
    type: 'DOCX',
    content: 'Step-by-step guide for integrating Stripe v1 legacy payment intents and merchant checkout tokens.',
    skills: ['Payment Integration', 'REST API', 'Security'],
    source: 'Fintech Core Team',
    freshnessScore: 42,
    lastReviewed: new Date('2023-01-15'),
    status: 'Outdated',
    riskNote: '⚠️ Possibly Outdated: Stripe SDK v2 changed webhook signing algorithm and webhook event secrets. Critical review needed.',
    extractedProblems: ['Webhook signature verification failure', 'Deprecated charges API'],
    extractedSolutions: ['Migrate to PaymentIntents v2 SDK', 'Enforce raw body verification']
  },
  {
    _id: 'asset-3',
    title: 'Spring Security 6.x & JWT Filter Chain Architecture',
    type: 'PDF',
    content: 'Standard blueprint for stateless microservice authentication, token rotation, and exception handling in Spring Boot 3.',
    skills: ['Authentication', 'Spring Boot', 'Security', 'REST API'],
    source: 'Security Architecture Team',
    freshnessScore: 88,
    lastReviewed: new Date('2024-04-20'),
    status: 'Fresh',
    riskNote: 'Compliant with current OAuth2 and JWT standards.',
    extractedProblems: ['Silent 403 on expired token', 'CORS preflight filter ordering'],
    extractedSolutions: ['Custom AuthenticationEntryPoint', 'CorsConfigurationSource bean injection']
  }
];

export const defaultTimelineEvents = [
  {
    year: '2022',
    title: 'Senior Mastered SQL & DB Concurrency',
    expert: 'Arun Kumar',
    description: 'Arun mastered advanced transaction isolation and PostgreSQL debugging across high-throughput enterprise systems.',
    badge: 'Experience Acquired',
    type: 'senior-milestone'
  },
  {
    year: '2023',
    title: 'Solved 12 Critical Production Incidents',
    expert: 'Arun Kumar & Priya Sharma',
    description: 'Resolved silent approval failures, payment webhook race conditions, and filter-chain edge cases.',
    badge: 'Problems Solved',
    type: 'incident-resolution'
  },
  {
    year: '2024',
    title: 'Documented Tacit Knowledge in Org Portal',
    expert: 'Arun Kumar',
    description: 'Created comprehensive incident postmortems for Leave Approval and Idempotent Payment processing.',
    badge: 'Documented',
    type: 'tacit-capture'
  },
  {
    year: '2025',
    title: 'AI Knowledge Engine Extraction',
    expert: 'Skill Inheritance AI',
    description: 'Engine parsed problems, investigations, and solutions into connected Skill Graph nodes and workplace simulators.',
    badge: 'AI Extracted',
    type: 'ai-engine'
  },
  {
    year: '2026',
    title: 'Junior Inherited Skills & Cleared Challenges',
    expert: 'Kumar (Junior Trainee)',
    description: 'Kumar diagnosed realistic database approval scenarios, increasing SQL skill from 45% to 75% without trial-and-error in production.',
    badge: 'Skill Inherited',
    type: 'skill-inherited'
  }
];

export const defaultLearningPath = {
  userId: 'user-junior-kumar',
  targetRole: 'Backend Developer',
  skills: ['SQL', 'Debugging', 'REST API', 'Payment Integration'],
  progress: 28,
  tasks: [
    {
      id: 'task-d1',
      day: 1,
      title: 'SQL Fundamentals & Relational State Machines',
      skill: 'SQL',
      description: 'Review table schemas, status constraints, and transaction lifecycles in the HR Tech service.',
      difficulty: 'Beginner',
      estimatedTime: '45 mins',
      xp: 20,
      status: 'completed',
      sourceExperienceTitle: 'HR Core Enterprise Portal Architecture'
    },
    {
      id: 'task-d2',
      day: 2,
      title: 'SQL Debugging & Stale WHERE Conditions',
      skill: 'Debugging',
      description: 'Learn how to detect 0-row updates and trace PostgreSQL query logs from Arun Kumar\'s leave approval incident.',
      difficulty: 'Intermediate',
      estimatedTime: '60 mins',
      xp: 30,
      status: 'completed',
      sourceExperienceTitle: 'Leave Approval Database Issue'
    },
    {
      id: 'task-d3',
      day: 3,
      title: 'REST API Error Handling & Status Codes',
      skill: 'REST API',
      description: 'Understand the difference between 401 Unauthorized vs 403 Forbidden and implement RFC7807 problem details.',
      difficulty: 'Intermediate',
      estimatedTime: '50 mins',
      xp: 25,
      status: 'in_progress',
      sourceExperienceTitle: 'Employee Authentication Token Expiry Bug'
    },
    {
      id: 'task-d4',
      day: 4,
      title: 'Practice Problem: Database State Mismatch',
      skill: 'SQL Debugging',
      description: 'Simulate a bug where user roles fail to sync after admin approval.',
      difficulty: 'Intermediate',
      estimatedTime: '40 mins',
      xp: 35,
      status: 'pending',
      challengeId: 'chal-1',
      sourceExperienceTitle: 'Leave Approval Database Issue'
    },
    {
      id: 'task-d5',
      day: 5,
      title: 'Real-world Simulation: Payment Gateway Idempotency',
      skill: 'Payment Integration',
      description: 'Diagnose and fix duplicate webhook race conditions using Redis distributed locks.',
      difficulty: 'Advanced',
      estimatedTime: '75 mins',
      xp: 50,
      status: 'pending',
      challengeId: 'chal-2',
      sourceExperienceTitle: 'Payment Webhook Duplicate Processing & Idempotency'
    },
    {
      id: 'task-d6',
      day: 6,
      title: 'Senior Mentor Review with Arun Kumar',
      skill: 'Architecture Review',
      description: 'Pair with Arun Kumar to review your transactional SQL update patterns and error handling.',
      difficulty: 'Intermediate',
      estimatedTime: '45 mins',
      xp: 40,
      status: 'pending',
      sourceExperienceTitle: 'Mentor 1:1 Knowledge Handover'
    },
    {
      id: 'task-d7',
      day: 7,
      title: 'Comprehensive Backend Skill Assessment',
      skill: 'Full Backend Mastery',
      description: 'Final evaluation covering SQL query safety, token pipelines, and payment idempotency.',
      difficulty: 'Advanced',
      estimatedTime: '60 mins',
      xp: 60,
      status: 'pending',
      sourceExperienceTitle: 'Final Certification'
    }
  ]
};
