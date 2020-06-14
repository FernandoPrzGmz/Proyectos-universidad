import express, { Express } from 'express';
import { __help__ } from '../../../controllers';
import { update,changePassword, getUserInfo } from '../../../controllers/user/me';

const router = express.Router();

module.exports = (app: Express) => {
  //#region Routes
  router.get('/__help__', __help__);
  
  router.get('/', getUserInfo);

  router.post('/update', update);
  
  router.post('/change-password', changePassword);
  //#endregion

  //#region Nested routes
  // ...
  //#endregion
  return router;
}
