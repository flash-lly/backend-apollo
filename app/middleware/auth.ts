import { AppRequest } from '../utils/global.types';
import { NextFunction, Response } from 'express';
import { ResponseCodes } from '../utils/responses';
import { verifyJwt } from '../utils/jwt';

export const auth = (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    //console.log("req.headers",req.headers)
    //console.log("req.headers.authorization", JSON.stringify(req.headers.authorization, null, 2))
    const token = req.headers.authorization?.split(' ')[1];
    //console.log("token",token)
    const user = verifyJwt(token);
   // console.log("user", user)
    if (!user) throw '';

    req.token = user;

    next();
  } catch {
    res.status(401).json({ message: ResponseCodes.UNAUTHORIZED });
  }
};
