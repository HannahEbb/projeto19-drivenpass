import { Router } from 'express';
import { tokenValidation } from '../middlewares/tokenValidator';
import{ schemaValidator } from '../middlewares/schemaValidator';
import { getAllRegisters, getCategoryRegisters, getOneRegister, postCategoryRegister,deleteOneRegister } from '../controllers/resgisterControllers';
 
const registerRouter = Router();

registerRouter.get('/registers', getAllRegisters);
registerRouter.get('/registers/:category', getCategoryRegisters);
registerRouter.get('/registers/:category/:id', getOneRegister);
registerRouter.post('/registers/:category', postCategoryRegister);
registerRouter.delete('/registers/:category/:id',  deleteOneRegister);


export default registerRouter;