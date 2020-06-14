import express, { Express } from 'express';
import { __help__ } from '../../../controllers';
import { getBookingsList, getBookingByIdOrFolio } from '../../../controllers/booking/me';
import { requiredParametersInRequestBody } from '../../../middleware/requestBody.middleware';

const router = express.Router();

module.exports = (app: Express) => {
  //#region Routes
  router.get('/__help__', __help__);

  router.get('/:BookingID', getBookingByIdOrFolio);
  
  router.post('/getBookingList', [ 
    requiredParametersInRequestBody([ 'page', 'pagination' ])
  ], getBookingsList);
  //#endregion

  //#region Nested routes
  // ...
  //#endregion
  return router;
}
