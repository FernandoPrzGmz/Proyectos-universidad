//#region Imports
// packages
import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { JWT } from '../../../libs/interfaces/Api.interface';
import Utils from '../../../libs/classes/Utils.class';
import { User } from '../../../models/User.model';
import { UserContact } from '../../../models/UserContact.model';
//#endregion

export const getUserInfo = async (req:Request, res:Response) => {
  const tokenUser: JWT | null = Utils.jwtDecode(req.get('authorization') || '');
  if (tokenUser) {
    try {
      // Consultamos los valores del usuario para mostrar en la vista
      return res.json({
        code:    0,
        message: `SUCCESS`,
        result:  await User.findByPk( tokenUser.data.UserID, {
          attributes: { exclude: ['Password'] },
          include: [{
            model: UserContact,
            as:    'ContactList',
            attributes: { exclude: ['UserContactID', 'Status', 'CreatedAt', 'UpdatedAt', 'UserID'] }
          }]
        })
      });
  
    // Todos los errores en las consultas caen aqui.
    } catch (error) {
      console.error(error);
      return res.json({
        code:    -1,
        message: `Error: Un error desconocido ha ocurrido.`,
        result:  null
      });
    }
  // El decode fallo
  } else {
    return res.json({
      code:    -1,
      message: `Error: Problemas con el token.`,
      result:  null
    });
  }
};

export const update = async(req:Request, res:Response) => {
  const tokenUser: JWT | null = Utils.jwtDecode(req.get('authorization') || '');
  if (tokenUser) {
    try {
      // Establecemos los posibles valores, los datos null seran descartados
      const body: { [x:string]: any } = {
        FirstName: req.body['firstName']  ? req.body['firstName'].trim()  : null,
        LastName:  req.body['lastName']   ? req.body['lastName'].trim()   : null,
        Biography: req.body['biography']  ? req.body['biography'].trim()  : null,
        City:      req.body['city']       ? req.body['city'].trim()       : null,
        Country:   req.body['country']    ? req.body['country'].trim()    : null
      };
      
      // Se actualizan los datos del usuario
      await User.update( Utils.discardNullInBodyUpdate(body), {
        where: { UserID: tokenUser.data.UserID },
      });
      
      // Consultamos los valores del usuario para mostrar en la vista
      return res.json({
        code:    0,
        message: `SUCCESS`,
        result:  await User.findByPk( tokenUser.data.UserID, {
          attributes: { exclude: ['Password'] }
        })
      });
  
    // Todos los errores en las consultas caen aqui.
    } catch (error) {
      console.error(error);
      return res.json({
        code:    -1,
        message: `Error: Un error desconocido ha ocurrido.`,
        result:  null
      });
    }
  // El decode fallo
  } else {
    return res.json({
      code:    -1,
      message: `Error: Problemas con el token.`,
      result:  null
    });
  }
};

export const changePassword = async(req:Request, res:Response) => {
  const tokenUser: JWT | null = Utils.jwtDecode(req.get('authorization') || '');
  if (tokenUser) {
    try {
      const user = await User.findByPk( tokenUser.data.UserID, {
        attributes: [ 'UserID', 'Password' ]
      });
      // Validación contraseña incorrecta
      if (user && bcrypt.compareSync(req.body['oldPassword'], user.Password)) {
        user.Password = bcrypt.hashSync(req.body['newPassword'].trim(), 10);
        await user.save();
        return res.json({
          code:    0,
          message: `SUCCESS`,
          result:  true
        });
      } else {
        return res.json({
          code:    -1,
          message: `Error: La contraseña es incorrecta.`,
          result:  null
        });
      }

    // Todos los errores en las consultas caen aqui.
    } catch (error) {
      console.error(error);
      return res.json({
        code:    -1,
        message: `Error: Un error desconocido ha ocurrido.`,
        result:  null
      });
    }
  // El decode fallo
  } else {
    return res.json({
      code:    -1,
      message: `Error: Problemas con el token.`,
      result:  null
    });
  }
};
