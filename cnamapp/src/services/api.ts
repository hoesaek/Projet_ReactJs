const BASE_URL = "http://localhost:8090";

interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface ITask {
  id: number;
  taskName: string; 
  description: string;
  user: number;
  status: string;
  isArchived: boolean; 
}

const fetchUsers = async (): Promise<IUser[]> => {
  const response = await fetch(`${BASE_URL}/users`);
  const data = await response.json();
  return data as IUser[];
};

const getUser = async (id : number): Promise<IUser> => {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  const data = await response.json();
  return data as IUser;
}

const addUser = async (user: Omit <IUser, "id">): Promise<IUser> => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data as IUser;
};

const editUser = async (user: IUser): Promise<IUser> => {
  console.log(user , "to update")
  const response = await fetch(`${BASE_URL}/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

const deleteUser = async (userId: number): Promise<void> => {
  console.log("userId", userId)
  await fetch(`${BASE_URL}/users/${userId}`, {
    method: "DELETE",
  });
};
const getUserTasks = async (userId: number): Promise<void> => {
  console.log("userId", userId)
  await fetch(`${BASE_URL}/users/${userId}/tasks`, {
    method: "GET",
  });
}

const fetchTasks = async (userId?: number): Promise<ITask[]> => {
  let url = `${BASE_URL}/tasks`;
  if (userId !== undefined) {
    url += `?userId=${userId}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data as ITask[];
};

const getTask = async (taskId: number): Promise<ITask> => {
  const response = await fetch(`${BASE_URL}/tasks/${taskId}`);
  const data = await response.json();
  return data as ITask;
};

const addTask = async (task: Omit<ITask, "id">): Promise<ITask> => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  return data as ITask;
};

const editTask = async (task: ITask): Promise<ITask> => {
  const response = await fetch(`${BASE_URL}/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  return data as ITask;
};

const deleteTask = async (taskId: number): Promise<void> => {
  await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: "DELETE",
    
  });
};

export {  
  fetchUsers,
  getUser,
  addUser,
  editUser,
  deleteUser,

  getUserTasks,
  fetchTasks,
  getTask,
  addTask,
  editTask,
  deleteTask,
};


export type { IUser, ITask };
