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
