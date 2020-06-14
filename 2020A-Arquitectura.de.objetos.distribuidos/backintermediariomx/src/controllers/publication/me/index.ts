//#region Imports
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { v1 as uuidv1 } from 'uuid';
import Utils from '../../../libs/classes/Utils.class';
import { JWT } from '../../../libs/interfaces/Api.interface';
import { Publication } from '../../../models/Publication.model';
import { User } from '../../../models/User.model';
import { PublicationComment } from '../../../models/PublicationComment.model';
import { Booking } from '../../../models/Booking.model';
//#endregion

/**
 * Obtener las publicaciones del usuario
 * 
 * Se habilitan los filtros:
 *  - [data]                         Coincidencia en folio
 *  - [published]                    Mostrar solo publicadas o no publicadas
 *  - [startDate, endDate]           Rango de fechas en la creacion de la publicación
 *  - [startEventDate, endEventDate] Rango de fechas fecha del evento
 */
export const getPublicationList = async(req: Request, res: Response) => {
  const tokenUser: JWT | null = Utils.jwtDecode(req.get('authorization') || '');
  if (tokenUser) {
    try {
      //#region Filtros
      let where = {};
      // Filtro por publicaciones publicadas o no publicadas
      if(req.body.published != null ) where = { ...where, Published: req.body.published };
      // Filtro por coincidencia en folio
      if(req.body.data) {
        where = { ...where, [Op.or]: [ {'$Folio$': { [Op.like]: `%${req.body.data.trim()}%` }} ] };
      }
      // Filtro por rango de precio
      if(req.body.priceRange) where = { ...where, Price: { [Op.between]: req.body.priceRange } };
      // Filtro por rango de fecha
      const betweenDate = Utils.getDateRange(req.body.startDate, req.body.endDate);
      if (betweenDate) where = { ...where, CreatedAt: { [Op.between]: betweenDate } };
      // Filtro por rango de fecha del evento
      const betweenEventDate = Utils.getDateRange(req.body.startEventDate, req.body.endEventDate);
      if (betweenEventDate) where = { ...where, EventDate: { [Op.between]: betweenEventDate } };
      //#endregion
      
      const publicationList = await Utils.getListPagination({
        model: Publication,
        options: {
          attributes:['PublicationID', ['CreatedAt', 'Date'], 'Folio', 'Published', 'EventDate', 'Price' ],
          where: {
            Status: true, 
            UserID: tokenUser.data.UserID,
            ...where
          }
        }
      }, {
        page:       req.body.page,
        pagination: req.body.pagination
      });
      //
      return res.json({
        code:    0,
        message: `SUCCESS`,
        result:  publicationList
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
  } else {
    return res.json({
      code:    -1,
      message: `Error: Problemas con el token.`,
      result:  null
    });
  }
  
};


/**
 * Obtener publicación del usuario por ID o Folio
 */
export const getPublicationByIdOrFolio = async(req: Request, res: Response) => {
  const tokenUser: JWT | null = Utils.jwtDecode(req.get('authorization') || '');
  if (tokenUser) {
    try {
      const publication = await Publication.findOne({
        where: {
          Status: true,
          UserID: tokenUser.data.UserID,
          [Op.or]: {
            Folio:         req.params['PublicationID'],
            PublicationID: req.params['PublicationID']
          }
        },
        include: [{
          model: PublicationComment,
          as: 'Comments',
          attributes: [ 'Comment', ['CreatedAt', 'Date'] ],
          // where: { Status: true }, // FIXME: Obtener solo los comentarios activos
          include:[{
            model: User,
            as: 'CommentOwner',
            attributes:['UserID', 'FirstName', 'LastName'],
          }]
        }]
      });

      return res.json({
        code:    0,
        message: `SUCCESS`,
        result:  publication
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
 * Borrado logico de publicación del usuario por ID o folio
 */
export const deletePublicationByIdOrFolio = async(req: Request, res: Response) => {
  const tokenUser: JWT | null = Utils.jwtDecode(req.get('authorization') || '');
  if (tokenUser) {
    try {
      // Se realiza el borrado logico cambiando Status a false
      const publication = await Publication.update({ Status: false },{
        where: {
          UserID: tokenUser.data.UserID,
          Status: true,
          [Op.or]: {
            Folio:         req.body['PublicationID'],
            PublicationID: req.body['PublicationID']
          }
        }
      });
      // 
      return res.json({
        code:    publication[0] ? 0 : -1,
        message: publication[0] ? `SUCCESS` : `Error: No se encontro resultados con ID o Folio: ${req.body['PublicationID']}`,
        result:  !!publication[0]
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


/**
 * Crear una nueva publicación del usuario
 */
export const createPublication = async(req: Request, res: Response) => {
  const tokenUser: JWT | null = Utils.jwtDecode(req.get('authorization') || '');
  if (tokenUser) {
    try {
      const publication = await Publication.create({
        Status:    true,
        Folio:     uuidv1(),
        UserID:    tokenUser.data.UserID,
        Published: req.body['published'] || false,
        Cover:     req.body['cover'].trim(),
        Title:     req.body['title'].trim(),
        Details:   req.body['details'].trim(),
        EventDate: req.body['eventDate'].trim(),
        Price:     req.body['price']
      });
      return res.json({
        code:    0,
        message: `SUCCESS`,
        result:  publication
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


/**
 * // TODO: 
 * Editar una publicación del usuario por ID o Folio
 */
export const updatePublicationByIdOrFolio = async(req: Request, res: Response) => {
  const tokenUser: JWT | null = Utils.jwtDecode(req.get('authorization') || '');
  if (tokenUser) {
    try {
      // Se obtiene la publicación
      const publication:any = await Publication.findOne({
        where: {
          Status: true,
          UserID: tokenUser.data.UserID,
          [Op.or]: {
            Folio:         req.body['PublicationID'],
            PublicationID: req.body['PublicationID'],
          }
        }
      });

      if (publication) {
        const bookingsCount = await Booking.count({
          where: { PublicationID: publication.PublicationID }
        });
        if (bookingsCount === 0) {
          // Establecemos los posibles valores, los datos null seran descartados
          const body: { [x:string]: any } = {
            Details:   req.body['details']   ? req.body['details'].trim()   : null,
            Cover:     req.body['cover']     ? req.body['cover'].trim()     : null,
            Title:     req.body['title']     ? req.body['title'].trim()     : null,
            EventDate: req.body['eventDate'] ? req.body['eventDate'].trim() : null,
            Price:     req.body['price']     ? req.body['price']            : null
          };
          const attr = Utils.discardNullInBodyUpdate(body);
          // Se establecen para ser guardados
          Object.keys(attr).forEach(key => publication[key] = attr[key] );
          await publication.save()
          // Se envia la publicación editada
          return res.json({
            code:    0,
            message: 'SUCCESS',
            result:  publication
          });
        } else {
          return res.json({
            code:    -1,
            message: `Error: No se ha podido actualizar. La publicacíon con ID o Folio: ${req.body['PublicationID']} cuenta con reservaciones.`,
            result:  null
          });
        }
      } else {
        return res.json({
          code:    -1,
          message: `Error: No se encontro resultados con ID o Folio: ${req.body['PublicationID']}`,
          result:  null
        });
      }
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


/**
 * Alternar la visibilidad de una publicación del usuario por ID o Folio
 */
export const togglePublished = async(req: Request, res: Response) => {
  const tokenUser: JWT | null = Utils.jwtDecode(req.get('authorization') || '');
  if (tokenUser) {
    try {
      const publication = await Publication.findOne({
        where: {
          Status: true,
          UserID: tokenUser.data.UserID,
          [Op.or]: {
            Folio:         req.body['PublicationID'],
            PublicationID: req.body['PublicationID']
          }
        },
        include: [{
          model: PublicationComment,
          as:    'Comments',
          attributes: [ 'Comment', ['CreatedAt', 'Date'] ],
          // where: { Status: true }, // FIXME: Obtener solo los comentarios activos
          include:[{
            model: User,
            as:    'CommentOwner',
            attributes:['UserID', 'FirstName', 'LastName'],
          }]
        }]
      });
      // 
      if (publication) {
        // Se alterna el estado de la publicación
        publication.Published = !publication.Published;
        await publication.save();
        return res.json({
          code:    0,
          message: `SUCCESS`,
          result:  publication
        });
      } else {
        return res.json({
          code:    -1,
          message: `Error: No se encontro resultados con ID o Folio: ${req.body['PublicationID']}`,
          result:  null
        });
      }
      
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