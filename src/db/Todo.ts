import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

interface Todo{
  title: string, description: string 
}

export async function CreateTodo(userid:number,todo:Todo){
  await Prisma.todo.create({
    data:{
      title: todo.title,
      description: todo.description, 
      userid: userid
    }
  })
}

interface data{
  title?: string, description?: string
}

export async function UpdateTodo(id: number, todo:data ){
 
  
  await Prisma.todo.update({
    where:{
      id: id
    },
    data:{
      ...todo
    }
  })
}



export async function GetTodo(userid : number){
 const todos =  await Prisma.todo.findMany({
    where:{
      userid: userid
    }
  })
  return todos;
}


export async function DeleteTodo( id:number){
   await Prisma.todo.delete({
     where:{
      id:id
     }
   })
 }
