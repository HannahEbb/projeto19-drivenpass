import { Router } from 'express';
import { schemaValidator } from '../middlewares/schemaValidator';
import signUpSchema from '../schemas/signUpSchema';
import signInSchema from '../schemas/signInSchema';


const authRouter = Router();

authRouter.post('/sign-up', schemaValidator(signUpSchema));
authRouter.post('/sign-in', schemaValidator(signInSchema));

export default authRouter;