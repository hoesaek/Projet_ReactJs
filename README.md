```markdown
# Présentation de React.js

## Introduction
React.js est une bibliothèque JavaScript open-source développée par Facebook pour créer des interfaces utilisateur. Elle est principalement utilisée pour construire des applications web à une seule page, où les données changent fréquemment au fil du temps.

## Caractéristiques principales
- **Component-Based** : React permet de créer des composants réutilisables qui gèrent leur propre état.
- **Virtual DOM** : Utilise un DOM virtuel pour améliorer les performances en minimisant les mises à jour du DOM réel.
- **Unidirectional Data Flow** : Les données circulent dans une seule direction, ce qui facilite la compréhension et le débogage de l'application.

## Installation
Pour installer React, vous pouvez utiliser `create-react-app`, un utilitaire fourni par Facebook pour configurer rapidement une application React.

```bash
npx create-react-app my-app
cd my-app
npm start
```

## Exemple de Composant React

```jsx
import React from 'react';

function HelloWorld() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}

export default HelloWorld;
```

## Récapitulatif côté Client

### Avantages
- **Interactivité** : Les applications React sont hautement interactives et réactives.
- **Performances** : Le Virtual DOM améliore les performances en réduisant les opérations DOM coûteuses.
- **Modularité** : Les composants réutilisables facilitent le développement et la maintenance de l'application.

### Inconvénients
- **Courbe d'apprentissage** : La courbe d'apprentissage peut être abrupte pour les débutants.
- **Complexité** : Les grandes applications peuvent devenir complexes et difficiles à gérer sans une architecture bien pensée.

## Récapitulatif côté Serveur

### Rendu côté Serveur (Server-Side Rendering - SSR)
React peut être utilisé pour le rendu côté serveur (SSR) en utilisant des frameworks comme Next.js. Le SSR améliore les performances de chargement initial et le SEO.

#### Avantages
- **SEO amélioré** : Les pages pré-rendues par le serveur sont mieux indexées par les moteurs de recherche.
- **Performance initiale** : Le temps de chargement initial est réduit car le contenu est rendu avant d'être envoyé au client.

#### Inconvénients
- **Complexité accrue** : La configuration du rendu côté serveur peut être plus complexe.
- **Temps de réponse** : Peut augmenter le temps de réponse du serveur en raison du rendu de chaque requête.

### Exemple de SSR avec Next.js

```bash
npx create-next-app my-next-app
cd my-next-app
npm run dev
```

```jsx
// pages/index.js
import React from 'react';

const Home = () => (
  <div>
    <h1>Welcome to Next.js!</h1>
  </div>
);

export default Home;
```

## Projet de Gestion de Tâches avec React et une API

### Objectif
Créer une application de gestion de tâches où l'utilisateur peut ajouter, supprimer et visualiser des tâches en utilisant une API pour la gestion des données.

### Prérequis
- Node.js et npm installés.
- Une API de gestion des tâches (vous pouvez utiliser JSONPlaceholder pour les tests).

### Installation

1. **Créer un nouveau projet React**

```bash
`npx create-react-app task-manager`
`cd task-manager`
```

2. **Installer Axios pour les requêtes HTTP**

```bash
`npm install axios` //pour les dependences npm install suifie, suivie de `npm init`
```

### Composants (Resumé)

1. **Composant Task.tsx**

```jsx
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

```

### Intégration des Composants

```jsx
// src/App.js
import { useState } from "react";
import logo from './assets/logo.png';
import control from './assets/control.png';
import user from './assets/user.png';
import setting from './assets/Setting.png'             
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from "./pages/Users";
import Tasks from "./pages/Tasks";


const App = () => {
  const [open, setOpen] = useState(true);
  

  return (
    <Router>
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)} alt=""
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={logo} alt='logo'
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]" 
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            CNAM
          </h1>
        </div>
        <ul className="pt-6">
          
            <li
              key='1'
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              "mt-2"} `}
            >
              <img src={user} alt='-'/> 
              
              <Link to="/utilisateur" className="ml-2">
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  Utilisateur
                </span>
              </Link>
            </li>
            <li
              key='2'
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              "mt-2"} `}
            >
              <img src={setting} alt='-'/> 
              <Link to="/taches" className="ml-2">
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  Taches
                </span>
              </Link>
            </li>
         
        </ul>
      </div>
      
      <div className="h-screen flex-1 p-7">
          <Routes>
            <Route path="/" element={<h1 className="text-2xl font-semibold ">Accueil</h1>} />
            <Route path="/utilisateur" element={<Users />} />
            <Route path="/taches" element={<Tasks />} />
          </Routes>
        </div>
    </div>
    </Router>
  );
};
export default App;

```

### Point d'entrée

```jsx
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/global.css'; 
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

## Conclusion
React.js est une bibliothèque puissante pour la création d'interfaces utilisateur dynamiques et réactives. Avec des outils comme Next.js, il est également possible d'implémenter le rendu côté serveur pour améliorer les performances et le SEO. Bien que React puisse présenter une courbe d'apprentissage, ses avantages en termes de modularité et de performance en font un choix populaire pour le développement d'applications web modernes.

```
