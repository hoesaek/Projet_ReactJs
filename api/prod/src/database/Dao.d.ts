import { Database } from "@triaxio/sqlite-pro-wrapper";
export interface UserDao {
    create<IUser>(data: Omit<IUser, "id">): Promise<IUser>;
    updateById<IUser>(updatedUser: Partial<IUser>, id: number): Promise<IUser | undefined>;
    getAll<IUser>(): Promise<IUser | IUser[] | undefined>;
    getByParam<IUser>(paramName: string, paramValue: string | number): Promise<IUser | IUser[] | undefined>;
}
declare const initDB: () => Promise<Database>;
declare const userDao: UserDao;
export { userDao, initDB };
