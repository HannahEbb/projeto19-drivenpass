import { Router } from 'express';
import { tokenValidation } from '../middlewares/tokenValidator';
import{ schemaValidator } from '../middlewares/schemaValidator';
import { getAllRegisters, getCategoryRegisters, getOneRegister } from '../controllers/resgisterControllers';
 
const registerRouter = Router();

registerRouter.get('/registers', tokenValidation, getAllRegisters);
registerRouter.get('/registers/:category', tokenValidation, getCategoryRegisters);
registerRouter.get('/registers/:category/:id', tokenValidation, getOneRegister);
registerRouter.post('/registers/:category', tokenValidation);
registerRouter.delete('/registers/:category/:id', tokenValidation);


export default registerRouter;