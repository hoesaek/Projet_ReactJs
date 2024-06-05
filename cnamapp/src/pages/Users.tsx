import React, { useEffect, useState } from 'react';
import Table from '../components/Table'
import Modal from '../components/Modal';
import { fetchUsers,fetchUserTasks, addUser, IUser, editUser, deleteUser, ITask} from '../services/api'

const UsersPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [newUser, setNewUser] = useState <Omit<IUser, "id">>({
    first_name: '',
    last_name: '',
    email: ''
  });
  const [updatedUser, setUpdatedUser] = useState <IUser>({
    id : 0,
    first_name: '',
    last_name: '',
    email: ''
  });
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);
  const [selectedUserTasks, setSelectedUserTasks] = useState<ITask[]>([]);
  const columns = ['Prénom', 'Nom', 'Mail','Action']  ;

  
  useEffect(() => {
    const getUsers= async() => {
        try {
            const data = await fetchUsers();
            console.log(data)
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
    getUsers();
    
  });

  const addUserHandler = async () => {
    const newUserData = await addUser(newUser);
    setUsers([...users, newUserData]);
    setNewUser({first_name: '', last_name: '', email: '' });
    setIsModalCreateOpen(false);
  };
  const updateUserHandler = async () => {
    console.log("UPDATE    ",updatedUser)
    const updatedUserData = await editUser(updatedUser);
    setUsers([...users, updatedUserData]); 
  
    setIsModalUpdateOpen(false); 
  };

  const updateUser = (user: IUser) => {
    setUpdatedUser(user);
    setIsModalUpdateOpen(true);

  };

  const removeUser = async (userId: number) => {
    console.log(userId)
    const del = await deleteUser(userId)
    console.log(del);
  };

  const showUserTasks = async (userId: number) => {
    try {
      const tasks = await fetchUserTasks(userId);
      setSelectedUserTasks(tasks);
      setIsTasksModalOpen(true);
    } catch (error) {
      console.error('Error fetching user tasks:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
        <button
          onClick={() => setIsModalCreateOpen(true)}
          className="px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-600"
        >
          Ajouter utilisateur
        </button>
      </div>
    <Table<IUser> data={users} columns={columns} deleteRow={removeUser} update={updateUser} onRowClick={(user) => showUserTasks(user.id)} />
      
      <Modal isOpen={isModalCreateOpen} onClose={() => setIsModalCreateOpen(false)}>
        <div>
          <h2 className="text-xl font-semibold mb-2 ">Add User</h2>
          <input
            type="text"
            placeholder="Prenom"
            value={newUser.first_name}
            onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-2 w-full"
          />
           <input
            type="text"
            placeholder="Nom"
            value={newUser.last_name}
            onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-4 w-full"
          />
          <div className="flex justify-end">
            <button
              onClick={addUserHandler}
              className="px-4 py-2 bg-orange-500 rounded hover:bg-orange-600"
            >
              Ajouter
            </button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isModalUpdateOpen} onClose={() => setIsModalUpdateOpen(false)}>
        <div>
          <h2 className="text-xl font-semibold mb-2">Add User</h2>
          <input
            type="text"
            placeholder="Prenom"
            value={updatedUser?.first_name}
            onChange={(e) => setUpdatedUser({ ...updatedUser, first_name: e.target.value })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-2 w-full"
          />
           <input
            type="text"
            placeholder="Nom"
            value={updatedUser.last_name}
            onChange={(e) => setUpdatedUser({ ...updatedUser, last_name: e.target.value })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Email"
            value={updatedUser.email}
            onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded mb-4 w-full"
          />
          <div className="flex justify-end">
            <button
              onClick={updateUserHandler}
              className="px-4 py-2 bg-orang-500 text-black  rounded hover:bg-orange-600"
            >
              Modifier
            </button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isTasksModalOpen} onClose={() => setIsTasksModalOpen(false)}>
        <div>
          <h2 className="text-xl font-semibold mb-2">Tâches de l'utilisateur</h2>
          {selectedUserTasks.length > 0 ? (
            <ul>
              {selectedUserTasks.map((task, index) => (
                <li key={index} className="px-4 py-2 cursor-pointer bg-orange-500 text-white rounded hover:bg-orange-600">{task.task_name}</li>
              ))}
            </ul>
          ) : (
            <p>Pas encore de tâches</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UsersPage;
