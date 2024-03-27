import express from 'express';
import {router as userRouter} from './User';
import {router as todoRouter} from './Todo';
const router = express.Router();

 router.use('/user',userRouter);
 router.use('/todo',todoRouter);

export {router};