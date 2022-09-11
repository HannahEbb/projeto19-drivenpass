import { Router } from 'express';
import { tokenValidation } from '../middlewares/tokenValidator';
import { getAllRegisters, getCategoryRegisters, getOneRegister, postCategoryRegister,deleteOneRegister } from '../controllers/resgisterControllers';
 
const registerRouter = Router();

registerRouter.get('/registers', tokenValidation, getAllRegisters);
registerRouter.get('/registers/:category', tokenValidation, getCategoryRegisters);
registerRouter.get('/registers/:category/:id', tokenValidation, getOneRegister);
registerRouter.post('/registers/:category', tokenValidation, postCategoryRegister);
registerRouter.delete('/registers/:category/:id', tokenValidation, deleteOneRegister);


export default registerRouter;