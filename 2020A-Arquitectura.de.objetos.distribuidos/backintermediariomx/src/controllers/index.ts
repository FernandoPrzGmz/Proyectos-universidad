import { Request, Response } from 'express';

export const __help__ = (req:Request, res:Response) => {
  return res.json({
    code:    0,
    message: 'Hello world!',
    result:  `${req.protocol}://${req.get('host')}${req.originalUrl}`
  });
};