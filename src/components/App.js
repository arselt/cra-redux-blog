import React from "react";
import { BrowserRouter, Route} from "react-router-dom";
import Entries from "./Entries";
import Menu from "./Menu";
import Users from "./Users/index";

const App = (props) => (
  <BrowserRouter>
    <Menu />
    <div className="margin">
      <Route exact path='/' component={ Users } />
      <Route exact path='/entries/:key' component={ Entries } />
    </div>
  </BrowserRouter>
);

export default App;