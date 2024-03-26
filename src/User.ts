import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

export async function CreateUser(username: string,password: string, firstname: string, lastname : string ){
  await Prisma.user.create({
    data:{
      username: username,
      password : password,
      firstname: firstname,
      lastname: lastname
    }
  })
}


export async function GetUser(username : string){
 const user =  await Prisma.user.findUnique({
    where:{
      username: username
    }
  })
    return user
  }


