import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import {
  fetchUsers,
  fetchTasks,
  addTask,
  editTask,
  deleteTask
} from '../services/api'; 
import IUser from '../../../api/src/types/IUser'; 
import ITask from '../../../api/src/types/ITask'; 

const TasksPage: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<Omit<ITask, "id">>({
    taskName: '',
    description: '',
    user: 0,
    status: '',
    isArchived: false
  });
  const [updatedTask, setUpdatedTask] = useState<ITask>({
    id: 0,
    taskName: '',
    description: '',
    user: 0,
    status: '',
    isArchived: false
  });
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);

  const columns = ['Titre', 'Description', 'Status', 'Action'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUsers();
        setUsers(userData);
  
        const tasksData = await fetchTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const addTaskHandler = async () => {
    try {
      const newTaskData = await addTask(newTask);
      setTasks(prevTasks => [...prevTasks, newTaskData]);
      setNewTask({
        taskName: '',
        description: '',
        user: 0,
        status: '',
        isArchived: false
      });
      setIsModalCreateOpen(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTaskHandler = async () => {
    try {
      const updatedTaskData = await editTask(updatedTask);
      setTasks(prevTasks => prevTasks.map(task => task.id === updatedTaskData.id ? updatedTaskData : task));
      setIsModalUpdateOpen(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const removeTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateTask = (task: ITask) => {
    setUpdatedTask(task);
    setIsModalUpdateOpen(true);
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <button
          onClick={() => setIsModalCreateOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
      <Table<ITask>
        data={tasks}
        columns={columns}
        deleteRow={removeTask}
        update={updateTask}
      />

      <Modal isOpen={isModalCreateOpen} onClose={() => setIsModalCreateOpen(false)}>
        <div>
          <h2 className="text-xl font-semibold mb-2">Add Task</h2>
          <select
            value={newTask.user}
            onChange={(e) => setNewTask({ ...newTask, user: parseInt(e.target.value) })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-2 w-full"
          >
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {`${user.first_name} ${user.last_name}`}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Title"
            value={newTask.taskName}
            onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Status"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-2 w-full"
          />
          <label className="inline-flex items-center mt-2">
            <input
              type="checkbox"
              checked={newTask.isArchived}
              onChange={(e) => setNewTask({ ...newTask, isArchived: e.target.checked })}
              className="form-checkbox"
            />
            <span className="ml-2">Archived</span>
          </label>
          <div className="flex justify-end mt-4">
            <button
              onClick={addTaskHandler}
              className="px-4 py-2 bg-blue-500 text-white  rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isModalUpdateOpen} onClose={() => setIsModalUpdateOpen(false)}>
        <div>
          <h2 className="text-xl font-semibold mb-2">Edit Task</h2>
          <select
            value={updatedTask.user}
            onChange={(e) => setUpdatedTask({ ...updatedTask, user: parseInt(e.target.value) })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-2 w-full"
          >
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {`${user.first_name} ${user.last_name}`}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Title"
            value={updatedTask.taskName}
            onChange={(e) => setUpdatedTask({ ...updatedTask, taskName: e.target.value })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Description"
            value={updatedTask.description}
            onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Status"
            value={updatedTask.status}
            onChange={(e) => setUpdatedTask({ ...updatedTask, status: e.target.value })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-2 w-full"
          />
          <label className="inline-flex items-center mt-2">
            <input
              type="checkbox"
              checked={updatedTask.isArchived}
              onChange={(e) => setUpdatedTask({ ...updatedTask, isArchived: e.target.checked })}
              className="form-checkbox"
            />
            <span className="ml-2">Archived</span>
          </label>
          <div className="flex justify-end mt-4">
            <button
              onClick={updateTaskHandler}
              className="px-4 py-2 bg-blue-500 text-white  rounded hover:bg-blue-600"
            >
              Modify
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TasksPage;
