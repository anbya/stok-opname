import React from 'react';
import './App.css';
import "./assets/font-awesome/css/font-awesome.min.css";
import 'react-data-table-component-extensions/dist/index.css';
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './route/PrivateRoute';
import Mainpage from "./pages/dashboardPage";
import Loginpage from "./pages/loginPage";
import userPage from "./pages/userPage";
import CreateSession from "./pages/createSession";
import DetailSesi from "./pages/detailSesi";
import Z10Page from "./pages/z10Page";


function App() {
  return (
    <div>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Loginpage />
          </Route>
          <Route exact path="/create">
            <CreateSession />
          </Route>
          <PrivateRoute component={Mainpage} path="/home" exact />
          <PrivateRoute component={userPage} path="/user" exact />
          <PrivateRoute component={Z10Page} path="/z10" exact />
          <PrivateRoute component={DetailSesi} path="/detail" exact />
        </Switch>
      </Router>
    </Provider>
    </div>
  );
}

export default App;
