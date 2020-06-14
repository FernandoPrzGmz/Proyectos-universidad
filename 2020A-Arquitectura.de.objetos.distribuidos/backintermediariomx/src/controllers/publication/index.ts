//#region Imports
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Utils from '../../libs/classes/Utils.class';
import { Publication } from '../../models/Publication.model';
import { User } from '../../models/User.model';
import { PublicationComment } from '../../models/PublicationComment.model';
//#endregion

/**
 * Obtener todas las publicaciones activas y publicadas.
 * 
 * Se habilitan los filtros:
 *  - [data]                         Coincidencia en folio o nombre del propietario
 *  - [priceRange]                   Rango de precio
 *  - [startDate, endDate]           Rango de fechas en la creacion de la publicación
 *  - [startEventDate, endEventDate] Rango de fechas fecha del evento
 * 
 * @param req 
 * @param res 
 */
export const getPublicationList = async(req: Request, res: Response) => {
  try {
    //#region Filtros
    let where = {};
    // Filtro por coincidencia en folio o nombre del propietario
    if(req.body.data) {
      where = {
        ...where,
        [Op.or]: [
          {'$Folio$': { [Op.like]: `%${req.body.data.trim()}%` }},
          {'$PublicationOwner.FirstName$': { [Op.like]: `%${req.body.data.trim()}%` }},
          {'$PublicationOwner.LastName$': { [Op.like]: `%${req.body.data.trim()}%` }},
        ]
      };
    }
    // Filtro por rango de precio se ignora si hay un null en el array
    if(req.body.priceRange && !req.body.priceRange.includes(null)) where = { ...where, Price: { [Op.between]: req.body.priceRange } };
    // Filtro por fecha
    const betweenDate = Utils.getDateRange(req.body.startDate, req.body.endDate);
    if (betweenDate) where = { ...where, CreatedAt: { [Op.between]: betweenDate } };
    // Filtro por fecha del evento
    const betweenEventDate = Utils.getDateRange(req.body.startEventDate, req.body.endEventDate);
    if (betweenEventDate) where = { ...where, EventDate: { [Op.between]: betweenEventDate } };
    //#endregion
    
    const publicationList = await Utils.getListPagination({
      model: Publication,
      options: {
        attributes: ['PublicationID', ['CreatedAt', 'Date'], 'Folio', 'EventDate', 'Price', 'Cover', 'Title', 'Details' ],
        where: {
          Status: true, 
          Published: true,
          ...where
        },
        include: [{
          model: User,
          as: 'PublicationOwner',
          attributes: [ 'UserID', 'FirstName', 'LastName'],
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
};


/**
 * Obtener publicación por ID o Folio si se esta activa y fue publicada
 *  
 * @param req 
 * @param res 
 */
export const getPublicationByIdOrFolio = async(req: Request, res: Response) => {
  try {
    const publication = await Publication.findOne({
      attributes: [['CreatedAt', 'Date'], 'PublicationID', 'Folio', 'Details', 'EventDate', 'Price' ],
      where: {
        [Op.or]: {
          Folio: req.params['PublicationID'],
          PublicationID: req.params['PublicationID']
        },
        Status: true,
        Published: true
      },
      include: [{
        model: User,
        as: 'PublicationOwner',
        attributes:['UserID', 'FirstName', 'LastName'],
      },{
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
};
