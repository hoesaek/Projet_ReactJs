import { Request, Response } from "express";
import { taskDao, userDao } from "../database/Dao";
import ITask from "../types/ITask";

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const result = await taskDao.getAll();
    console.log("result", result);
    res.json(result);
  } catch (e) {
    res.send({ error: e });
    console.log("error", e);
  }
};

const getTaskById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    console.log(req.params);
    const result = await taskDao.getByParam("id", id);

    res.json(result);
  } catch (e) {
    res.send({ error: e });
    console.log("error", e);
  }
};

const addTask = async (req: Request, res: Response) => {
  //@todo sanitiser les entrees
  try {
    const result = await taskDao.create({
      id: req.body.id,
      task_name: req.body.task_name,
      description: req.body.description,
      user: req.body.user || null,
      status: req.body.status || "WAIT",
      isArchived: false,
    });

    res.json(result);
  } catch (e) {
    res.send({ error: e });
    console.log("error", e);
  }
};

const countTasks = async (req: Request, res: Response) => {
  try {
    const tasksCount = await taskDao.count();
    res.json(tasksCount);
  } catch (e) {
    res.send({ error: e });
    console.log("error", e);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const user = await taskDao.getUser(id);
    res.json(user);
  } catch (e) {
    res.send({ error: e });
    console.log("error", e);
  }
};

const deleteTask = async (req: Request, res: Response) => {
  const id = req.params.id as unknown as number;
  try {
    const result = taskDao.deleteTask(id);
    res.json(result)
  } catch (error) {
    res.json(error)
  }
  
}

export { getAllTasks, getTaskById, addTask, countTasks, getUser, deleteTask };
