import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface UserPayload {
  userId: string;
  // add other properties if needed
}

interface AuthRequest extends Request {
  user?: UserPayload;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    // Validate header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ msg: "Authorization token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    // TypeScript now knows token exists
    if (!token) {
      return res.status(401).json({ msg: "Token missing" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET not set");
      return res.status(500).json({ msg: "Internal server error" });
    }

    // Verify token
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload & UserPayload;

    req.user = { userId: decoded.userId };

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ msg: "Token expired" });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ msg: "Invalid token" });
    } else {
      console.error(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  }
};

export default authMiddleware;
