import { Request, Response } from "express";
declare const getAllUsers: (req: Request, res: Response) => Promise<void>;
declare const getUserById: (req: Request, res: Response) => Promise<void>;
declare const addUser: (req: Request, res: Response) => Promise<void>;
export { getAllUsers, getUserById, addUser };
