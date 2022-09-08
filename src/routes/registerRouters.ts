import { Router } from 'express';
//import { hasValidToken } from '../middlewares/validateApiKeyMiddleware';
//import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware';

const registerRouter = Router();

registerRouter.get('/registers');
registerRouter.get('/registers/:category');
registerRouter.get('/registers/:category/:id');
registerRouter.post('/registers/:category');
registerRouter.delete('/registers/:category/:id');


export default registerRouter;