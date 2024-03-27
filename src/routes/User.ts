import express from 'express';
import jwt from 'jsonwebtoken';
import {string, z} from 'zod';
import { GetUser , CreateUser} from '../db/User';
import { config } from 'dotenv';
const router = express.Router();
config();
const sercetkey: string  = process.env.JWT_SECRET || '';


const SignupSchema = z.object({
  username: z.string().email(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string().min(5),
})

router.post('/signup',async(req,res)=>{
  const userData = SignupSchema.safeParse(req.body);
  if(!userData.success){
    res.status(400).json({
      message: 'Invalid inputs'
    })
  }

  const ExistingUser = await GetUser(req.body.username);
  if(ExistingUser){
    res.status(403).json({
      message:'User already exists'
    })
  }

  const user = await CreateUser(req.body);
  const token = jwt.sign(user.username,sercetkey)

  res.status(200).json({
    message: 'User created successfully',
    token: token
  })

})

const SigninSchema = z.object({
  username: z.string().email(),
  password: z.string(),
})

router.post('/signin', async(req,res)=>{
  const userData = SigninSchema.safeParse(req.body);
  if(!userData.success){
    res.status(400).json({
      message: 'Invalid inputs'
    })
  }

  const ExistingUser = await GetUser(req.body.username);
  if(ExistingUser){
    res.status(403).json({
      message:'User already exists'
    })
  }

  const user = GetUser(req.body.username)

})


export {router};