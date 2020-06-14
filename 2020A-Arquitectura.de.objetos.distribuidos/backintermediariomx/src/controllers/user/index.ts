//#region Imports
// packages
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// models
import { User } from '../../models/User.model';
import { UserContact } from '../../models/UserContact.model';
//#endregion

export const login = async(req:Request, res:Response) => {
  try {
    // Se consulta el contacto (email o num telefono)
    const userContact = await UserContact.findOne({
      attributes: ['Status', 'UserID'],
      where: {
        Status:  true,
        Contact: req.body['email'],
      }
    });

    // El email no corresponde a un usuario registrado
    if(userContact === null) {
      return res.json({
        code:    -1,
        message: `Error: El email ${req.body['email']} no se encuentra registrado.`,
        result:  null
      });
    // Se consulta y se prueba la contraseña
    } else {
      const user = await User.findByPk(userContact.UserID, {
        attributes: ['UserID', 'Status', 'FirstName', 'LastName', 'Password', 'Country']
      });

      // Validación usuario innactivo
      if (user && !user.Status) {
        return res.json({
          code:    -1,
          message: `Error: El usuario se encuentra innactivo.`,
          result:  null
        });
      }
      // Validación contraseña incorrecta
      if (user && !bcrypt.compareSync(req.body['password'], user.Password)) {
        return res.json({
          code:    -1,
          message: `Error: La contraseña es incorrecta.`,
          result:  null
        });
      }

      // El usuario supero las validaciones
      // Se eliminan los campos innecesarios
      const jsonUser = JSON.parse( JSON.stringify(user) );
      ['Password', 'Status'].forEach(att => delete jsonUser[att]);

      // Se finaliza el proceso y se retorna el jwt
      return res.json({
        code:    0,
        message: 'SUCCESS',
        result:  jwt.sign({
            data: jsonUser,
            iat: new Date().getTime(),
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12), // en segundos {seg mint hr}
          }, `${process.env.JWT_SECRET_KEY}`)
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
};

export const signup = async(req: Request, res: Response) => {
  try {
    // Se consulta el email para ver si es unico
    const isUserContactUnique:boolean = await UserContact.findOne({
      where: {
        Contact: req.body['email'],
        Status:  true,
        IsEmail: true
      }}) === null;
    
    // Si el email no ha esta siendo utilizado se crea una instancia nueva del usuario
    if( isUserContactUnique ) {
      // Se crea la instancia del usuario
      const newUser = await User.create({
        Status:    true,
        FirstName: req.body['firstName'].trim(),
        LastName:  req.body['lastName'].trim(),
        Password:  bcrypt.hashSync(req.body['password'].trim(), 10)
      });

      // Se crea la instancia del contacto del usuario
      await UserContact.create({
        UserID:    newUser['UserID'],
        Status:    true,
        Contact:   req.body['email'].trim(),
        IsEmail:   true,
        IsMain:    true
      });
      
      // Proceso concluido
      return res.json({
        code:    0,
        message: `SUCCESS`,
        result:  true
      });
    
    // El email ya se encuentra utilizado
    } else {
      return res.json({
        code:    -1,
        message: `Error: El email ${req.body['email']} ya ha sido registrado.`,
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
};
