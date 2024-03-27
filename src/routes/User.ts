import express,{Request, Response,Router} from 'express';
import jwt from 'jsonwebtoken';
import { z,ZodSchema} from 'zod';
import { GetUser , CreateUser, UpdateUser} from '../db/User';
import { authmiddleware } from '../middleware';
import { config } from 'dotenv';
const router = Router();
config();
const sercetkey: string  = process.env.JWT_SECRET || '';

// signup 
const SignupSchema : ZodSchema<{
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}>= z.object({
  username: z.string().email(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string().min(5),
})

router.post('/signup',async(req:Request,res:Response)=>{
  const userData = SignupSchema.safeParse(req.body);
  if(!userData.success){
    res.status(400).json({
      message: 'Invalid inputs'
    })
    return;
  }

  const existingUser = await GetUser(req.body.username);
  if(existingUser){
    res.status(403).json({
      message:'User already exists'
    })
    return;
  }

  const user = await CreateUser(req.body);
  const token = jwt.sign({id:user.id},sercetkey)

  res.status(200).json({
    message: 'User created successfully',
    token: token
  })

})


// signin
const SigninSchema: ZodSchema<{
  username: string,
  password: string
}> = z.object({
  username: z.string().email(),
  password: z.string(),
})

router.post('/signin', async( req:Request, res:Response)=>{
  const userData = SigninSchema.safeParse(req.body);
  if(!userData.success){
    res.status(400).json({
      message: 'Invalid inputs'
    })
    return;
  }

  const existingUser = await GetUser(req.body.username);
  if(!existingUser){
    res.status(403).json({
      message:'No user already exists'
    })
    return;
  }

  const token  = jwt.sign({id: existingUser.id},sercetkey)
  res.status(200).json({
    token: token
  })

})

// update user

const UpdateSchema = z.object({
  firstname: z.string().optional(),
  lastname:  z.string().optional(),
  password: z.string().optional(),
})

router.put('/update',authmiddleware,async(req:Request,res:Response)=>{
  const userData = UpdateSchema.safeParse(req.body);
  if(!userData.success){
    res.status(400).json({
      message: 'Invalid inputs'
    })
    return;
  }

  const user = await UpdateUser(res.locals.id,req.body)
  res.status(200).json({
    message:'Updated successfully',
  })


})


export {router};