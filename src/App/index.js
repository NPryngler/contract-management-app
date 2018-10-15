import React, { Component } from "react";
import "./style.css";
import Login from "../Login";
import Register from '../Register';
import PrivateRoute from "../PrivateRoute";
import UserContracts from "../UserContracts";
import UserContract from "../UserContract";
import ContractsMenu from "../ContractsMenu";
import ContractForm from "../ContractForm";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <div className="header-container">
              <h1 className='welcome-screen-title'>Contract Management App</h1>
              <nav className="nav-links">
                <div className="link-wrapper">
                  <Link
                    className="link"
                    to='/my-contracts'>My Contracts </Link>
                  &nbsp;
                  &nbsp;
              </div>
                <div className="link-wrapper">
                  <Link
                    className="link"
                    to='/register'>Register </Link>
                  &nbsp;
                  &nbsp;
              </div>
                <div className="link-wrapper">
                  <Link
                    className="link"
                    to='/' onClick={this.logOut}>Log out/ Log in </Link>
                </div>
              </nav>
            </div>
            <div className="body-container">
              <Route exact path='/' component={Login} />
              <Route exact path='/register' component={Register} />
              <PrivateRoute exact path='/my-contracts' component={UserContracts} />
              <PrivateRoute exact path='/contracts-menu' component={ContractsMenu} />
              <PrivateRoute exact path='/contract-form' component={ContractForm} />
            </div>
          </div>
        </Router >
      </div>
    );
  }
}

export default App;
