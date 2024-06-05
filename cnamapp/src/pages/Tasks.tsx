import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { fetchUsers, fetchTasks, addTask, ITask, editTask, deleteTask, TaskStatus, IUser } from '../services/api'

const TasksPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [newTask, setNewTask] = useState<Omit<ITask, 'id'>>({
    task_name: '',
    description: '',
    user: 0,
    status: TaskStatus.WAIT,
    isArchived: false
  });
  const [updatedTask, setUpdatedTask] = useState<ITask>({
    id: 0,
    task_name: '',
    description: '',
    user: 0,
    status: TaskStatus.WAIT,
    isArchived: false
  });
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const columns = ['Title', 'Description', 'User', 'Status', 'Archived', 'Actions'];

  useEffect(() => {
    const getTasks = async () => {
      try {
        const taskbar = await fetchTasks();
        setTasks(taskbar);
        const useradd = await fetchUsers();
        setUsers(useradd);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    getTasks();
  }, []);

  const addTaskHandler = async () => {
    const newTaskData = await addTask(newTask);
    setTasks([...tasks, newTaskData]);
    setNewTask({ task_name: '', description: '', user: undefined, status: TaskStatus.WAIT, isArchived: false });
    setIsModalCreateOpen(false);
  };

  const updateTaskHandler = async () => {
    const updatedTaskData = await editTask(updatedTask);
    setTasks(tasks.map(task => (task.id === updatedTaskData.id ? updatedTaskData : task)));
    setIsModalUpdateOpen(false);
  };

  const updateTask = (task: ITask) => {
    setUpdatedTask(task);
    setIsModalUpdateOpen(true);
  };

  const removeTask = async (taskId: number) => {
    await deleteTask(taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const getUserName = (userId: number | undefined): string => {
    const user = users.find(user => user.id === userId);
    return user ? user.first_name : '';
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <button
          onClick={() => setIsModalCreateOpen(true)}
          className="px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-600"
        >
          Add Task
        </button>
      </div>
      <Table<ITask> data={tasks} columns={columns} deleteRow={removeTask} update={updateTask} transformUserIdToName={getUserName} />

      <Modal isOpen={isModalCreateOpen} onClose={() => setIsModalCreateOpen(false)}>
        <div>
          <h2 className="text-xl font-semibold mb-2">Add Task</h2>
          <input
            type="text"
            placeholder="Title"
            value={newTask.task_name}
            onChange={(e) => setNewTask({ ...newTask, task_name: e.target.value })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-2 w-full"
          />
          <select
            value={newTask.user}
            onChange={(e) => setNewTask({ ...newTask, user: Number(e.target.value) })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-4 w-full"
          >
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.first_name}</option>
            ))}
          </select>
          <select
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value as TaskStatus })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-2 w-full"
          >
            <option value={TaskStatus.WAIT}>{TaskStatus.WAIT}</option>
            <option value={TaskStatus.IN_PROGRESS}>{TaskStatus.IN_PROGRESS}</option>
            <option value={TaskStatus.TERMINATED}>{TaskStatus.TERMINATED}</option>
          </select>
          <div className="flex justify-end">
            <button
              onClick={addTaskHandler}
              className="px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-600"
            >
              Add
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isModalUpdateOpen} onClose={() => setIsModalUpdateOpen(false)}>
        <div>
          <h2 className="text-xl font-semibold mb-2">Update Task</h2>
          <input
            type="text"
            placeholder="Title"
            value={updatedTask.task_name}
            onChange={(e) => setUpdatedTask({ ...updatedTask, task_name: e.target.value })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Description"
            value={updatedTask.description}
            onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-2 w-full"
          />
          <select
            value={updatedTask.user}
            onChange={(e) => setUpdatedTask({ ...updatedTask, user: Number(e.target.value) })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-4 w-full"
          >
            
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.first_name}</option>
            ))}
          </select>
          <select
            value={updatedTask.status}
            onChange={(e) => setUpdatedTask({ ...updatedTask, status: e.target.value as TaskStatus })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-2 w-full"
          >
            <option value={TaskStatus.WAIT}>{TaskStatus.WAIT}</option>
            <option value={TaskStatus.IN_PROGRESS}>{TaskStatus.IN_PROGRESS}</option>
            <option value={TaskStatus.TERMINATED}>{TaskStatus.TERMINATED}</option>
          </select>
          <input
            id="isArchived"
            type="checkbox"
            placeholder="Archived"
            checked={updatedTask.isArchived}
            onChange={(e) => setUpdatedTask({ ...updatedTask, isArchived: Boolean(e.target.checked) })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-4 w-full"
          />
          <label htmlFor="isArchived"> Archived</label> 
          <div className="flex justify-end">
            <button
              onClick={updateTaskHandler}
              className="px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-600"
            >
              Update
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TasksPage;
