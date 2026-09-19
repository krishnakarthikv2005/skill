import express from 'express';
import { 
  authController, 
  experienceController, 
  knowledgeController, 
  skillController, 
  skillGapController, 
  learningPathController, 
  challengeController, 
  chatController, 
  mentorController, 
  timelineController, 
  adminController 
} from '../controllers/apiController.js';
import { verifyAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// 1. Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/users/profile', verifyAuth, authController.getProfile);

// 2. Experiences routes
router.get('/experiences', experienceController.getAll);
router.get('/experiences/:id', experienceController.getById);
router.post('/experiences', verifyAuth, experienceController.create);
router.post('/experiences/:id/like', experienceController.like);

// 3. Knowledge Assets & Document Ingestion
router.post('/knowledge/upload', verifyAuth, knowledgeController.uploadDocument);
router.get('/knowledge', knowledgeController.getAllAssets);
router.post('/knowledge/:id/review', verifyAuth, knowledgeController.requestReview);

// 4. Skills & Knowledge Graph
router.get('/skills', skillController.getAll);
router.get('/skills/graph', skillController.getKnowledgeGraph);

// 5. Skill Gap Intelligence
router.post('/skill-gap/analyze', verifyAuth, skillGapController.analyze);

// 6. Personalized Learning Path
router.get('/learning-path', verifyAuth, learningPathController.getOrGenerate);
router.post('/learning-path/generate', verifyAuth, learningPathController.getOrGenerate);
router.post('/learning-path/task', verifyAuth, learningPathController.updateTaskStatus);

// 7. Workplace Problem Simulator / Challenges
router.get('/challenges', challengeController.getAll);
router.get('/challenges/:id', challengeController.getById);
router.post('/challenges/generate', verifyAuth, challengeController.getAll);
router.post('/challenges/:id/submit', verifyAuth, challengeController.submit);

// 8. InheritAI Knowledge Chatbot
router.post('/chat', chatController.ask);

// 9. Mentorship
router.get('/mentors', mentorController.getMentors);
router.post('/mentorship/request', verifyAuth, mentorController.requestMentorship);
router.get('/mentorship/my', verifyAuth, mentorController.getMyMentorships);

// 10. Skill Inheritance Timeline
router.get('/timeline', timelineController.getTimeline);

// 11. Admin Analytics & Risk Radar
router.get('/admin/analytics', verifyAuth, adminController.getAnalytics);

export default router;
