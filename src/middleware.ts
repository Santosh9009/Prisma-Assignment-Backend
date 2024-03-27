import { Request,Response,NextFunction,Locals } from "express";
import { config } from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { number } from "zod";
config();
const sercetkey:string = process.env.JWT_SECRET || '';

export async function authmiddleware(req:Request,res:Response,next:NextFunction):Promise<void>{
  const authheader = req.headers.authorization;
  
  if(!authheader || !authheader.startsWith('Bearer ') ){
    res.status(403).json({})
  }
  const token : string = authheader?.split(' ')[1] || "";
  try{
    const decoded = jwt.verify(token,sercetkey) as JwtPayload;
    if(decoded.id){
      res.locals.id = decoded.id
    }
    next();
  }catch{

  }

}