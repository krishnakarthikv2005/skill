const BASE_URL = '/api';

export const getAuthToken = () => localStorage.getItem('skill_ai_token');
export const setAuthToken = (token) => localStorage.setItem('skill_ai_token', token);
export const removeAuthToken = () => localStorage.removeItem('skill_ai_token');

export const getCurrentStoredUser = () => {
  const u = localStorage.getItem('skill_ai_user');
  return u ? JSON.parse(u) : null;
};

export const setCurrentStoredUser = (user) => {
  localStorage.setItem('skill_ai_user', JSON.stringify(user));
};

export const apiFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.warn(`[API fetch error for ${endpoint}]:`, error.message);
    throw error;
  }
};

export const api = {
  // Auth
  login: (data) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  getProfile: () => apiFetch('/users/profile'),

  // Experiences
  getExperiences: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return apiFetch(`/experiences${q ? `?${q}` : ''}`);
  },
  getExperienceById: (id) => apiFetch(`/experiences/${id}`),
  createExperience: (data) => apiFetch('/experiences', { method: 'POST', body: JSON.stringify(data) }),
  likeExperience: (id) => apiFetch(`/experiences/${id}/like`, { method: 'POST' }),

  // Knowledge Ingestion
  uploadDocument: (data) => apiFetch('/knowledge/upload', { method: 'POST', body: JSON.stringify(data) }),
  getKnowledgeAssets: () => apiFetch('/knowledge'),
  requestAssetReview: (id) => apiFetch(`/knowledge/${id}/review`, { method: 'POST' }),

  // Skills & Graph
  getSkills: () => apiFetch('/skills'),
  getKnowledgeGraph: () => apiFetch('/skills/graph'),

  // Skill Gap Analysis
  analyzeSkillGap: (data = {}) => apiFetch('/skill-gap/analyze', { method: 'POST', body: JSON.stringify(data) }),

  // Learning Path
  getLearningPath: () => apiFetch('/learning-path'),
  updateTaskStatus: (taskId, status) => apiFetch('/learning-path/task', { method: 'POST', body: JSON.stringify({ taskId, status }) }),

  // Simulator / Challenges
  getChallenges: () => apiFetch('/challenges'),
  getChallengeById: (id) => apiFetch(`/challenges/${id}`),
  submitChallenge: (challengeId, selectedOptionId) => apiFetch(`/challenges/${challengeId}/submit`, { method: 'POST', body: JSON.stringify({ challengeId, selectedOptionId }) }),

  // InheritAI Chat
  askInheritAI: (message) => apiFetch('/chat', { method: 'POST', body: JSON.stringify({ message }) }),

  // Mentorship
  getMentors: (skill) => apiFetch(`/mentors${skill ? `?skill=${encodeURIComponent(skill)}` : ''}`),
  requestMentorship: (mentorId, skill, message) => apiFetch('/mentorship/request', { method: 'POST', body: JSON.stringify({ mentorId, skill, message }) }),
  getMyMentorships: () => apiFetch('/mentorship/my'),

  // Timeline
  getTimeline: () => apiFetch('/timeline'),

  // Admin
  getAdminAnalytics: () => apiFetch('/admin/analytics'),
};
