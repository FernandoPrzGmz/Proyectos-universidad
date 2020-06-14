import express, { Express } from 'express';
import { verifyToken } from '../../middleware/authentication.middleware';
import { requiredParametersInRequestBody } from '../../middleware/requestBody.middleware';
import { getPublicationList, getPublicationByIdOrFolio } from '../../controllers/publication';

const router = express.Router();

module.exports = (app: Express) => {
  //#region Routes
  router.get('/:PublicationID', getPublicationByIdOrFolio);

  router.post('/getPublicationList', [
    requiredParametersInRequestBody(['page', 'pagination'])
  ], getPublicationList );
  //#endregion

  //#region Nested routes
  router.use('/me', [
    verifyToken
  ], require('./me/index')(app));
  //#endregion
  return router;
}
