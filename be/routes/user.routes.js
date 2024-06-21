import { Router } from 'express';
import { signup, signin } from '../controllers/user.controllers.js';

const userRoutes = Router();

userRoutes.post('/register', signup);
userRoutes.post('/login', signin);

export default userRoutes;
