import jwt from 'jsonwebtoken';
import { FindAndCountOptions } from 'sequelize/types';
import { JWT } from '../interfaces/Api.interface';

export default class Utils {
  private static _instance: Utils;
  
  private constructor() {}

  /**
   * Obtiene la instancia de Utils.
   * Si aún no ha sido instanciada, crea una unica instancia.
   */
  public static getInstance(): Utils {
    if (!Utils._instance) Utils._instance = new Utils();
    return Utils._instance;
  }

  /**
   * Convierte string de jwt a un obj del tipo JWT
   * @param _jwt json web token para parsear
   */
  public static jwtDecode(_jwt: string): JWT | null {
    const decode = jwt.decode(_jwt);
    if (decode && typeof(decode) != 'string') {
      return {
        iat: decode['iat'],
        exp: decode['exp'],
        data: {
          UserID:    decode['data']['UserID'],
          FirstName: decode['data']['FirstName'],
          LastName:  decode['data']['LastName'],
          Country:   decode['data']['Country']
        }
      }
    }
    return null;
  }

  /**
   * Descarta atributos con valores null para actualizar lo necesario en los metodos update
   * @param body 
   */
  public static discardNullInBodyUpdate(body: { [x: string]:any }): { [x: string]: any } {
    let payload: { [x:string]: any } = {};
    Object.keys(body).forEach((key:string) => {
      if(body[key]) payload[key] = body[key];
    });
    return { ...payload };
  }

  public static getDateRange(startDate: string, endDate: string): Date[] | null {    
    if(startDate || endDate) {
      // Llegan los dos rangos de fechas
      if(startDate && endDate) {
        return [ new Date(startDate), new Date(endDate) ];
      } 
      
      // Llega startDate y se le suma un dia porque endDate llega null
      if (startDate && endDate == null) {
        return [
          new Date(startDate),
          new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1))];
      }

      // Llega endDate y se le resta un dia porque startDate llega null
      if (startDate == null && endDate){
        return [
          new Date(new Date(endDate).setDate(new Date(endDate).getDate() - 1)), 
          new Date(endDate),];
      }
    }
    return null;
  }

  /**
   * Obtiene los datos por paginación de un modelo permitiendo filtros avanzados
   * 
   * @param M Sequelize 
   * @param filters Paginacion y Filtros
   */
  public static getListPagination(
    M: { model: any; options: FindAndCountOptions; },
    P: { page: number; pagination: number; }
  ): Promise<{ page: number; pages: number; pagination: number; total: number; results: any[]; }> {
    let page   = P['page'] || 0;
    let limit  = P['pagination'] || 10;
    let offset = page * limit;

    return new Promise((resolve, reject) => {
      M['model'].findAndCountAll({
        ...M['options'],
        limit,
        offset
      }).then((res: { rows: any[]; count: number }) => {
        resolve({
          page:       page,
          pages:      Math.ceil(res.count / limit),
          pagination: P['pagination'],
          total:      res.count,
          results:    res.rows
        });
      }).catch(reject);
    });
  }
}