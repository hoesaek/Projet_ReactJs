const BASE_URL = "http://localhost:8090";

export enum TaskStatus {
  WAIT = "WAIT",
  IN_PROGRESS = "IN_PROGRESS",
  TERMINATED = "TERMINATED",
}

interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}
interface ITask {
  id: number;
  task_name: string;
  description: string;
  user?: number;
  status: TaskStatus;
  isArchived: boolean;
}


const fetchUsers = async (): Promise<IUser[]> => {
  const response = await fetch(`${BASE_URL}/users`);
  const data = await response.json();
  return data as IUser[];
};

const getUser = async (id: number): Promise<IUser> => {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  const data = await response.json();
  return data as IUser;
};

const addUser = async (user: Omit<IUser, "id">): Promise<IUser> => {
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
  console.log(user, "to update");
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
  console.log("userId", userId);
  await fetch(`${BASE_URL}/users/${userId}`, {
    method: "DELETE",
  });
};

const getUserTasks = async (userId: number): Promise<void> => {
  console.log("userId", userId);
  await fetch(`${BASE_URL}/users/${userId}/tasks`, {
    method: "GET",
  });
};

// api.ts
const fetchTasks = async (): Promise<ITask[]> => {
  const response = await fetch(`${BASE_URL}/tasks`);
  const data = await response.json();
  return data;
};

const fetchUserTasks = async (userId: number): Promise<ITask[]> => {
  const response = await fetch(`${BASE_URL}/users/${userId}/tasks`);
  const data = await response.json();
  return data as ITask[];
};

const addTask = async (task: Omit<ITask, 'id'>): Promise<ITask> => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  return data;
};

const editTask = async (task: ITask): Promise<ITask> => {
  const response = await fetch(`${BASE_URL}/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  return data;
};

const deleteTask = async (taskId: number): Promise<void> => {
  await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE',
  });
};

const getTask = async (id: number): Promise<ITask> => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`);
  const data = await response.json();
  return data as ITask;
};

export {
  fetchUsers,
  fetchUserTasks,
  getUser,
  addUser,
  editUser,
  deleteUser,
  getUserTasks,
  fetchTasks,
  addTask,
  editTask,
  deleteTask,
  getTask
};
export type { IUser, ITask };
