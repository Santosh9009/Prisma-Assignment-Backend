import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

export async function CreateTodo(title: string, description: string , userid : number){
  await Prisma.todo.create({
    data:{
      title: title,
      description: description, 
      userid: userid
    }
  })
}


export async function UpdateTodo(id: number, title?: string, description?: string  ){
 
  
  await Prisma.todo.update({
    where:{
      id: id
    },
    data:{
      title: title,
      description: description
    }
  })
}



async function GetTodo(userid : number){
 const todos =  await Prisma.todo.findMany({
    where:{
      userid: userid
    }
  })
  return todos;
}