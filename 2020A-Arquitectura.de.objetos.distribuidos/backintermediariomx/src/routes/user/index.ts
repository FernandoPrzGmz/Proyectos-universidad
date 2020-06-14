import express, { Express } from 'express';
import { verifyToken } from '../../middleware/authentication.middleware';
import { requiredParametersInRequestBody } from '../../middleware/requestBody.middleware';
import { signup, login } from './../../controllers/user/index';

const router = express.Router();

module.exports = (app: Express) => {
  //#region Routes
  router.post('/signup', [
    requiredParametersInRequestBody(['firstName', 'lastName', 'email','password'])
  ], signup );
  
  router.post('/login', [
    requiredParametersInRequestBody([ 'email', 'password'])
  ], login );
  //#endregion

  //#region Nested routes
  // ...
  router.use('/me', [
    verifyToken
  ], require('./me/index')(app));
  //#endregion
  return router;
}
