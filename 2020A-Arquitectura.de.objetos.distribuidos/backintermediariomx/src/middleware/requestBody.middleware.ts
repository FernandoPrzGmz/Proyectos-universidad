import { Request, Response, NextFunction } from "express";

/**
 * Este middleware comprueba si en el req.body estan definidas propiedades requeridas.
 * si se cumple con todas se le proporciona acceso a la ruta.
 * 
 * @param propertiesPath Array de path ex. ['email', 'password', 'user.id']
 */
export const requiredParametersInRequestBody = (propertiesPath: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {

    const [ error, errorMessage ] = getErrorInBodyRequest(propertiesPath, req.body);
    if(error){
      return res.status(400).json({
        code:    -1,
        message: 'ERROR: Bad request',
        result:  errorMessage
      });
    }

    next();
  }
}

function objHasNestedProperty(propertyPath:string, obj: any): ({ isEmpty: boolean, message?: string }) {
  let properties: string[] = propertyPath.split('.');

  for (let i = 0; i < properties.length; i++) {
    let prop: string = properties[i];
    if(!obj || !obj.hasOwnProperty(prop)){
      return { isEmpty: true, message: `'${propertyPath}' is required.\n` };
    }
  }
  return { isEmpty: false };
}

function getErrorInBodyRequest(propertiesPath:string[], obj: any): [boolean, string] {
  let error: boolean = false,
      errorStr: string = 'Error: ';
  
  propertiesPath.forEach(propertyPath => {
    const { isEmpty, message } = objHasNestedProperty(propertyPath, obj);
    if (isEmpty) {
      error = true;
      errorStr += message
    }
  });
  return [error, error ? errorStr : ''];
}
