import { Request, Response, NextFunction } from "express";

const ensureIsAdm = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.user.isAdm === true) {
    return next();
  }

  return response.status(403).json({
    message: "You must be adm to create a category.",
  });
};

export default ensureIsAdm;
