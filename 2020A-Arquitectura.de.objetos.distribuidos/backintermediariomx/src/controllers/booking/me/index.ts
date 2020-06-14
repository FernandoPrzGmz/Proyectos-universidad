//#region Imports
// packages
import { Request, Response} from 'express';
import { Op } from 'sequelize';
import { v1 as uuidv1 } from 'uuid';
// Interfaces
import { JWT } from '../../../libs/interfaces/Api.interface';
// Classes
import Utils from '../../../libs/classes/Utils.class';
// models
import { Booking } from '../../../models/Booking.model';
import { Publication } from '../../../models/Publication.model';
import { User } from '../../../models/User.model';
//#endregion

export const getBookingsList = async(req:Request, res:Response) => {
  const tokenUser: JWT | null = Utils.jwtDecode(req.get('authorization') || '');
  if (tokenUser) {
    try {
      //#region Filtros
      let where = {};
      // Filtro por fecha
      const betweenDate = Utils.getDateRange(req.body.startDate, req.body.endDate);
      if (betweenDate) where = { ...where, CreatedAt: { [Op.between]: betweenDate } };
      // Filtro por folio
      if(req.body.data) where = { ...where, Folio: { [Op.like]: `%${req.body.data.trim()}%` } };
      //#endregion
      
      const bookingList = await Utils.getListPagination({
        model: Booking,
        options: {
          where: { ...where, UserID: tokenUser.data.UserID },
          include: [{
            model: Publication,
            as: 'Publication',
            include: [{
               model: User,
               as: 'PublicationOwner',
               attributes: [ 'UserID', 'FirstName', 'LastName']
            }]
          }]
        }
      }, {
        page:       req.body.page,
        pagination: req.body.pagination
      });
      //
      return res.json({
        code:    0,
        message: `SUCCESS`,
        result:  bookingList
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

/**
 * Obtener reservacón del usuario por ID o Folio
 */
export const getBookingByIdOrFolio = async(req: Request, res: Response) => {
  const tokenUser: JWT | null = Utils.jwtDecode(req.get('authorization') || '');
  if (tokenUser) {
    try {
      const booking = await Booking.findOne({
        where: {
          Status: true,
          UserID: tokenUser.data.UserID,
          [Op.or]: {
            Folio:     req.params['BookingID'],
            BookingID: req.params['BookingID']
          }
        },
        include: [{
          model: Publication,
          as: 'Publication',
          include: [{
             model: User,
             as: 'PublicationOwner',
             attributes: [ 'UserID', 'FirstName', 'LastName']
          }]
        }]
      });

      return res.json({
        code:    0,
        message: `SUCCESS`,
        result:  booking
      });
    } catch (error) {
      console.error(error);
      return res.json({
        code:    -1,
        message: `Error: Un error desconocido ha ocurrido.`,
        result:  null
      });
    }
  } else {
    return res.json({
      code:    -1,
      message: `Error: Problemas con el token.`,
      result:  null
    });
  }
};


/**
 * Crear una nueva reservacion del usuario
 */
export const createBooking = async(req: Request, res: Response) => {
  const tokenUser: JWT | null = Utils.jwtDecode(req.get('authorization') || '');
  if (tokenUser) {
    try {
      const booking = await Booking.create({
        Status:        true,
        PublicationID: req.body['publicationID'],
        UserID:        tokenUser.data.UserID,
        Folio:         uuidv1(),
        Total:         req.body['total']
      });
      return res.json({
        code:    0,
        message: `SUCCESS`,
        result:  booking
      });
    } catch (error) {
      console.error(error);
      return res.json({
        code:    -1,
        message: `Error: Un error desconocido ha ocurrido.`,
        result:  null
      });
    }
  } else {
    return res.json({
      code:    -1,
      message: `Error: Problemas con el token.`,
      result:  null
    });
  }
}