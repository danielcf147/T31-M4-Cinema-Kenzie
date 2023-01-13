import { NextFunction, Request, Response } from "express";

const isAdmOrSameUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.isAdm === false && req.user.id !== req.params.id) {
    return res.status(401).json({ message: "User dont have authorization" });
  }

  return next();
};

export default isAdmOrSameUserMiddleware;
