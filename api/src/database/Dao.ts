import sqliteProWrapper, { Database } from "@triaxio/sqlite-pro-wrapper";
import IUser from "../types/IUser";
import ITask from '../types/ITask';

const sqlPath = __dirname + "/sql";

export interface UserDao {
  create<IUser>(data: Omit<IUser, "id">): Promise<IUser>;
  updateById<IUser>(
    updatedUser: Partial<IUser>,
    id: number
  ): Promise<IUser | undefined>;
  getAll<IUser>(): Promise<IUser | IUser[] | undefined>;
  getByParam<IUser>(
    paramName: string,
    paramValue: string | number
  ): Promise<IUser | IUser[] | undefined>;
  count(): Promise<number>;
  getTasks(id : number):Promise<ITask | ITask[] | undefined >
  deleteUser (id : number):Promise<any>
  
  
  
}
export interface TaskDao {
  create<ITask>(data: Omit<ITask, "id">): Promise<ITask>;
  updateById<ITask>(
    updatedTask: Partial<ITask>,
    id: number
  ): Promise<ITask | undefined>;
  getAll<ITask>(): Promise<ITask | ITask[] | undefined>;
  getByParam<ITask>(
    paramName: string,
    paramValue: string | number
  ): Promise<ITask | ITask[] | undefined>;
  count(): Promise<number>;
  getUser(id : number):Promise<IUser | undefined >
  deleteTask (id : number):Promise<any>
  
}

const dbPath = process.env.DATABASE_NAME
  ? process.env.DATABASE_NAME
  : "test.db";
let db: Database;

const initDB = async () => {
  console.log("initDB", dbPath, process.env.DATABASE_NAME);
  try {
    const result = await sqliteProWrapper.connect(dbPath, sqlPath);
    db = result;
    return result;
  } catch (error) {
    throw error;
  }
};

const userDao: UserDao = {
  async create<IUser>(data: Omit<IUser, "id">): Promise<IUser> {
    try {
      
      const result = await sqliteProWrapper.create<IUser>("users", data, db);
      return result;
    } catch (error) {
      throw error;
    }
  },

  async updateById<IUser>(
    updatedUser: Partial<IUser>,
    id: number
  ): Promise<IUser | undefined> {
    try {
      
      const result = await sqliteProWrapper.update<IUser>(
        "users",
        updatedUser,
        "id",
        id,
        db
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  async getAll<IUser>(): Promise<IUser | IUser[] | undefined> {
    try {
      const result = await sqliteProWrapper.getAll<IUser>("users", db);
      return result;
    } catch (e) {
      throw e;
    }
  },
  async count(): Promise<number> {
    try {
      
      const count = await db.get<number>(`SELECT count(*) from Users`);
      const value = Object.values(count);
      
      return value[0] as number;
    } catch (e) {
      throw e;
    }
    
  },

  async getByParam<IUser>(
    paramName: string,
    paramValue: string | number
  ): Promise<IUser | IUser[] | undefined> {
    try {
      
      const result = await sqliteProWrapper.get<IUser>("users", db, paramName,paramValue);
      return result;
    } catch (e) {
      throw e;
    }
  },
  async getTasks(id : number):Promise<ITask[]>{
    try {
      const result = await db.all<ITask>(`SELECT * FROM tasks WHERE user = ${id} LIMIT 100`)
    
    return result;
    } catch (e) {
      throw e;
    }
    
  },

  async deleteUser (id : number):Promise<any>{
    try {
      const result = await db.run(`DELETE FROM users WHERE id = ${id}`)
      console.log(result);
      return result;
    } catch (e) {
      throw e;
    }

  }
  
};

const taskDao : TaskDao = {
  async create<ITask>(data:Omit<ITask, "id">): Promise<ITask> {
    try {
      
      const result = await sqliteProWrapper.create<ITask>("tasks", data, db);
      return result;
    } catch (error) {
      throw error;
    }
    
  },
  async updateById<ITask>(
    updatedTask: Partial<ITask>,
    id: number
  ): Promise<ITask | undefined> {
    try {
      
      const result = await sqliteProWrapper.update<ITask>(
        "tasks",
        updatedTask,
        "id",
        id,
        db
      );

      return result;
    } catch (error) {
      throw error;
    }
  },
  async getAll<ITask>(): Promise<ITask | ITask[] | undefined> {
    try {
      
      const result = await sqliteProWrapper.getAll<ITask>("tasks", db);
      return result;
    } catch (e) {
      throw e;
    }
  },
  async count(): Promise<number> {
    try {
      
      const count = await db.get<number>(`SELECT count(*) from Users`);
      const value = Object.values(count);
      
      return value[0] as number;
    } catch (e) {
      throw e;
    }
    
  },

  async getByParam<ITask>(
    paramName: string,
    paramValue: string | number
  ): Promise<ITask | ITask[] | undefined> {
    try {
      
      const result = await sqliteProWrapper.get<ITask>("tasks", db, paramName,paramValue);
      return result;
    } catch (e) {
      throw e;
    }
  },
  async getUser(id : number):Promise<IUser>{
    try {
      const task =  await sqliteProWrapper.get<ITask>("tasks", db, 'id',id) as ITask;
      const result  = await db.get<IUser>(`SELECT * FROM users WHERE id = ${task.user}`)
      return result;
    } catch (e) {
      throw e;
    }
    
  },

  async deleteTask (id : number):Promise<any>{
    try {
      const result = await db.run(`DELETE FROM tasks WHERE id = ${id}`)
      console.log("test delete tasks",result);
      return result;
    } catch (e) {
      throw e;
    }

  }
}
export { userDao, initDB, taskDao };
