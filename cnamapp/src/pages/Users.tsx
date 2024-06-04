import React, { useEffect, useState } from 'react';
import Table from '../components/Table'
import Modal from '../components/Modal';
import { fetchUsers, addUser, IUser, editUser, deleteUser} from '../services/api'

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

  const columns = ['Prenom', 'Nom', 'email','action']  ;

  
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

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
        <button
          onClick={() => setIsModalCreateOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ajouter utilisateur
        </button>
      </div>
    <Table<IUser> data={users} columns={columns} deleteRow={removeUser} update={updateUser} />
      
      <Modal isOpen={isModalCreateOpen} onClose={() => setIsModalCreateOpen(false)}>
        <div>
          <h2 className="text-xl font-semibold mb-2">Add User</h2>
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
              className="px-4 py-2 bg-blue-500 text-white  rounded hover:bg-blue-600"
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
              className="px-4 py-2 bg-blue-500 text-white  rounded hover:bg-blue-600"
            >
              Modifier
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UsersPage;
