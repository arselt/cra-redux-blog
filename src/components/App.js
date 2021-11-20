import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Menu from "./menu";
import Users from "./users/index";

const Tareas = () => <div>hola</div>

const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="margin">
      <Routes>
        <Route path='/' element={ <Users /> } />
        <Route path='/tareas' element={ <Tareas/> } />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;