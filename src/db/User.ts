import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

interface userData{
  username: string,password: string, firstname: string, lastname : string
}

export async function CreateUser(data: userData){
  const user = await Prisma.user.create({
    data:{
      username: data.username,
      password : data.password,
      firstname: data.firstname,
      lastname: data.lastname
    }
  })
  return user;
}


export async function GetUser(username : string){
 const user =  await Prisma.user.findUnique({
    where:{
      username: username
    }
  })
    return user
  }



