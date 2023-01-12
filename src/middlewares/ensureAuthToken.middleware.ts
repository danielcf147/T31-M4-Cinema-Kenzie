import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const ensureAuthMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let token = request.headers.authorization;

  if (!token) {
    return response.status(401).json({
      message: "Invalid token",
    });
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded: any) => {
    if (error) {
      return response.status(401).json({
        message: error.message,
      });
    }

    request.user = {
      id: decoded.sub as string,
      isAdm: decoded.isAdm,
    };

    return next();
  });
};

export default ensureAuthMiddleware;
