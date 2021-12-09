import React from "react";
import { BrowserRouter, Route} from "react-router-dom";
import Entries from "./Entries";
import Menu from "./Menu";
import Users from "./Users/index";
import Todos from "./Todos";
import AddTodo from "./Todos/Add";

const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="margin">
      <Route exact path='/' component={ Users } />
      <Route exact path='/entries/:key' component={ Entries } />
      <Route exact path='/todos' component={ Todos } />
      <Route exact path='/todos/add' component={ AddTodo } />
      <Route exact path='/todos/add/:user_id/:todo_id' component={ AddTodo } />
    </div>
  </BrowserRouter>
);

export default App;