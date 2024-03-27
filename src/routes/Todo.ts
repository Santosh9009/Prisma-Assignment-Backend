import express, { Request, Response, Router } from "express";
const router = express.Router();
import { string, z, ZodSchema } from "zod";
import { authmiddleware } from "../middleware";
import { CreateTodo, DeleteTodo, GetTodo, UpdateTodo } from "../db/Todo";

// add todo

const todoSchema: ZodSchema<{ title: string; description: string }>
 = z.object({
  title: string(),
  description: string(),
});

router.post("/add",authmiddleware, async (req: Request, res: Response) => {
  const todo = todoSchema.safeParse(req.body);

  if(!todo.success){
    res.status(400).json({
      message: 'Invalid inputs'
    })
  }
  await CreateTodo(res.locals.id,req.body);
  res.status(200).json({
    message: "Todo created successfully"
  })
});




// update todo
const UpdateSchema: ZodSchema<{ title?: string; description?: string }>
 = z.object({
  title: string().optional(),
  description: string().optional(),
});

router.put("/update/:id",authmiddleware, async (req: Request, res: Response) => {
  const todo = UpdateSchema.safeParse(req.body);
  const id :number = parseInt(req.params.id);

  if(!todo.success){
    res.status(400).json({
      message: 'Invalid inputs'
    })
  }
  await UpdateTodo(id,req.body);
  res.status(200).json({
    message: "Todo Updated successfully"
  })
});



// get all todos
router.get("/get",authmiddleware, async (req: Request, res: Response) => {
 
  const todos = await GetTodo(res.locals.id);
  res.status(200).json({
    Todo: todos
  })
});


// delete todo
router.delete("/delete/:id",authmiddleware, async (req: Request, res: Response) => {
  const id :number = parseInt(req.params.id);

  await DeleteTodo(id);
  res.status(200).json({
    message: "Todo deleted successfully"
  })
});

export { router };
