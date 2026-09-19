import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'senior', 'junior'], default: 'junior' },
  department: { type: String, default: 'Engineering' },
  experienceYears: { type: Number, default: 1 },
  targetRole: { type: String, default: 'Full Stack Engineer' },
  skills: [{
    name: String,
    level: Number, // percentage 0 - 100
    category: String,
    lastAssessed: { type: Date, default: Date.now }
  }],
  xp: { type: Number, default: 120 },
  level: { type: String, default: 'Explorer' },
  avatar: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// Experience Schema
const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authorId: { type: String, default: 'user-senior-arun' },
  authorName: { type: String, required: true },
  authorRole: { type: String, default: 'Senior Backend Engineer' },
  project: { type: String, required: true },
  department: { type: String, default: 'Core Engineering' },
  problem: { type: String, required: true },
  investigation: { type: String, required: true },
  solution: { type: String, required: true },
  lessons: { type: String, required: true },
  skills: [{ type: String }],
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' },
  confidence: { type: Number, default: 94 },
  relatedSkills: [{ type: String }],
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  transferredCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Skill Schema
const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, default: 'Backend' },
  description: { type: String },
  relatedSkills: [{ type: String }],
  expertCount: { type: Number, default: 1 },
  learnerCount: { type: Number, default: 0 },
  riskLevel: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Low' },
  riskReason: { type: String, default: '' }
});

// LearningPath Schema
const learningPathSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  targetRole: { type: String, required: true },
  skills: [{ type: String }],
  tasks: [{
    id: String,
    day: Number,
    title: String,
    skill: String,
    description: String,
    difficulty: String,
    estimatedTime: String,
    xp: Number,
    status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
    challengeId: String,
    sourceExperienceTitle: String
  }],
  progress: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Challenge Schema
const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  scenario: { type: String, required: true },
  question: { type: String, required: true },
  options: [{
    id: String,
    text: String,
    isCorrect: Boolean,
    explanation: String
  }],
  skill: { type: String, required: true },
  difficulty: { type: String, default: 'Intermediate' },
  xp: { type: Number, default: 50 },
  sourceExperienceId: { type: String },
  sourceExperienceTitle: { type: String },
  sourceExpertName: { type: String }
});

// Mentorship Schema
const mentorshipSchema = new mongoose.Schema({
  mentorId: { type: String, required: true },
  mentorName: { type: String, required: true },
  menteeId: { type: String, required: true },
  menteeName: { type: String, required: true },
  skill: { type: String, required: true },
  message: { type: String },
  status: { type: String, enum: ['pending', 'accepted', 'completed', 'declined'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

// KnowledgeAsset Schema
const knowledgeAssetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['PDF', 'DOCX', 'TXT', 'RUNBOOK', 'INCIDENT_POSTMORTEM'], default: 'TXT' },
  content: { type: String, required: true },
  skills: [{ type: String }],
  source: { type: String, default: 'Internal Runbook' },
  freshnessScore: { type: Number, default: 85 },
  lastReviewed: { type: Date, default: Date.now },
  status: { type: String, enum: ['Fresh', 'Review Needed', 'Outdated'], default: 'Fresh' },
  riskNote: { type: String },
  extractedProblems: [{ type: String }],
  extractedSolutions: [{ type: String }]
});

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export const ExperienceModel = mongoose.models.Experience || mongoose.model('Experience', experienceSchema);
export const SkillModel = mongoose.models.Skill || mongoose.model('Skill', skillSchema);
export const LearningPathModel = mongoose.models.LearningPath || mongoose.model('LearningPath', learningPathSchema);
export const ChallengeModel = mongoose.models.Challenge || mongoose.model('Challenge', challengeSchema);
export const MentorshipModel = mongoose.models.Mentorship || mongoose.model('Mentorship', mentorshipSchema);
export const KnowledgeAssetModel = mongoose.models.KnowledgeAsset || mongoose.model('KnowledgeAsset', knowledgeAssetSchema);
