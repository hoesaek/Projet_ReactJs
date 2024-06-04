import { Request, Response } from "express";
import { userDao } from "../database/Dao";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userDao.getAll();
     
        res.json(result);
    } catch (e) {
        res.json({error : e});
        console.log('error',e);
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number;
        const result = await userDao.getByParam('id',id);
   
        res.json(result);
    } catch (e) {
        res.send({error : e});
        console.log('error',e);
    }
}


const addUser = async (req: Request, res: Response) => {
    // @todo sanitize value
    try {
        const result =await userDao.create({id :req.body.id, first_name :req.body.first_name, last_name:req.body.last_name, email: req.body.email });
        
        res.json(result);
    } catch (e) {
        res.json({error : e});
        console.log('error',e);
    }
}

const  countUsers = async (req: Request, res: Response) => {
    try {
    const usersCount = await userDao.count();
    res.json(usersCount);
    } catch (e) {
        res.send({error : e});
        console.log('error',e);
    }
}

const getListTasks = async (req: Request, res: Response) => {
    try {
    const id = req.params.id as unknown as number;
    const usersCount = await userDao.getTasks(id);
    res.json(usersCount);
    } catch (e) {
        res.json({error : e});
        console.log('error',e);
    }
}

const updateUser = async (req: Request, res: Response) => {
      const user =req.body;
      const id = req.params.id as unknown as number;

      console.log("parametres ",user,id , req.body)
    try {
        const updatedUser = await userDao.updateById(user,id);
        console.log (updatedUser )
        res.json(updatedUser);
    } catch (error){
        res.json(error);
    }
    
}

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id as unknown as number;
  try {
    const result = userDao.deleteUser(id);
    res.json(result)
  } catch (error) {
    res.json(error)
  }
  
}


export { getAllUsers, getUserById, addUser, countUsers,getListTasks, updateUser, deleteUser} 