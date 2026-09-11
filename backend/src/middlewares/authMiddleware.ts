import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    id?: string;
    patientId?: string;
    phone: string;
    name?: string;
    abhaId?: string;
  };
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ success: false, message: 'Access token required' });
    return;
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as {
      id?: string;
      patientId?: string;
      phone: string;
      name?: string;
      abhaId?: string;
    };
    req.user = {
      ...decoded,
      id: decoded.id || decoded.patientId,
      patientId: decoded.patientId || decoded.id,
    };
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: 'Invalid or expired token' });
    return;
  }
};

export const optionalAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, ENV.JWT_SECRET) as {
        id?: string;
        patientId?: string;
        phone: string;
        name?: string;
        abhaId?: string;
      };
      req.user = {
        ...decoded,
        id: decoded.id || decoded.patientId,
        patientId: decoded.patientId || decoded.id,
      };
    } catch {
      // Ignore error for optional auth
    }
  }
  next();
};
