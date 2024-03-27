import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

interface Todo{
  title: string, description: string 
}

export async function CreateTodo(todo: Todo,userid:number){
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
      title: todo.title,
      description: todo.description
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

async function DeleteTodo(userid : number, id:number){
   await Prisma.todo.delete({
     where:{
      userid:userid,
      id:id
     }
   })
 }
