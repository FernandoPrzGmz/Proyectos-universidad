import express, { Express } from 'express';
import { requiredParametersInRequestBody } from '../../../middleware/requestBody.middleware';
import {
  getPublicationByIdOrFolio,
  getPublicationList,
  togglePublished,
  updatePublicationByIdOrFolio,
  deletePublicationByIdOrFolio,
  createPublication,
} from '../../../controllers/publication/me';

const router = express.Router();

module.exports = (app: Express) => {
  //#region Routes
  router.get('/:PublicationID', getPublicationByIdOrFolio);

  router.post('/getPublicationList', [
    requiredParametersInRequestBody(['page', 'pagination'])
  ], getPublicationList );

  router.post('/togglePublished', togglePublished);
  
  router.post('/create', [
    requiredParametersInRequestBody([ 'details', 'cover', 'title', 'eventDate', 'price' ])
  ], createPublication);

  router.post('/remove', deletePublicationByIdOrFolio);

  router.post('/update', [
    requiredParametersInRequestBody([ 'PublicationID' ])
  ], updatePublicationByIdOrFolio);
  //#endregion

  //#region Nested routes
  //#endregion
  return router;
}
