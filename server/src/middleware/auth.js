import jwt from 'jsonwebtoken';
import { defaultUsers } from '../seed/seedData.js';

const JWT_SECRET = process.env.JWT_SECRET || 'skill_inheritance_secret_key_2026';

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id || user.id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // For seamless demoing, attach default junior user if no header is present
    req.user = defaultUsers.find(u => u.role === 'junior') || defaultUsers[1];
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // If token expired or invalid, fallback gracefully for demo flow
    req.user = defaultUsers.find(u => u.role === 'junior') || defaultUsers[1];
    next();
  }
};

export const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: `Access denied for role ${req.user.role}. Required: ${allowedRoles.join(', ')}` });
    }
    next();
  };
};
