import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

/**
 * Este middleware comprueba si el token se proporciona en el header 'Authorization',
 * si el token es proporcionado se comprueba su veracidad o si sufrio alguna alteración,
 * si el token pasa las validaciónes se le proporciona acceso a la ruta.
 * 
 * @param req
 * @param res
 * @param next
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Obtenemos el token del header 'authorization'
  const token:string | undefined = req.get('authorization');
  
  if (typeof token === 'string') {
    jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err: any, decoded:any) => {
      if( err ) {
        return res.status(401).json({
          code:    -100,
          message: 'ERROR: Unauthorized',
          result:  err
        });
      }

      next(); // Si el token es valido se le da acceso
    });
  } else {
    return res.status(400).json({
      code:    -1,
      message: 'ERROR: Bad request',
      result:  'Error: \'Authorization\' token is required.\n'
    });
  }
};
