import "./App.css";
import React, { useState, useEffect } from "react";
import DoLogin from "./login.js";
import {
  Switch,
  Route,
  NavLink,
  useLocation,
  useHistory,
} from "react-router-dom";
import facade from "./apiFacade";
import AddContact from "./addContact.js";
// import ListOfAllContacts from "./listOfAllContacts.js";
import "bootstrap/dist/css/bootstrap.min.css";
import AllContacts from "./allContacts";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  let history = useHistory();
  const goHome = () => {
    history.push("/");
  };
  useEffect(() => {
    if (isLoggedIn) {
      setIsAdmin(facade.checkRole());
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Header
        loginMsg={isLoggedIn ? "Logout" : "Login"}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
      />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <DoLogin
            loggedIn={isLoggedIn}
            setLoggedIn={setLoggedIn}
            goHome={goHome}
          />
        </Route>
        {isLoggedIn && (
          <Route exact path="/addContact">
            <AddContact />
          </Route>
        )}
        {isLoggedIn && (
          <Route exact path="/allContacts">
            <AllContacts />
          </Route>
        )}
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

function Header({ isLoggedIn, loginMsg, isAdmin }) {
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      {isLoggedIn && !isAdmin && (
        <li>
          <NavLink activeClassName="active" to="/addContact">
            Profile
          </NavLink>
        </li>
      )}
      {isLoggedIn && !isAdmin && (
        <li>
          <NavLink activeClassName="active" to="/allContacts">
            All Contacts
          </NavLink>
        </li>
      )}
      <li>
        <NavLink activeClassName="active" to="/login">
          {loginMsg}{" "}
        </NavLink>
      </li>
    </ul>
  );
}

function Home() {
  return (
    <div>
      <br></br>
      <h1>Welcome to YOUR CRM Concern!</h1>
      <br></br>
      <br></br>
      <br></br>
      <div class="row">
        <div class="column">Welcome</div>

        <div class="column">
          <b>Hello and welcome!</b>
          <br></br>
          <br></br>This is the front-end for the final 3rd semester exam
          project. Created 18/1-2021
          <br></br>
          Rasmus Grønbek.
          <br></br>
          <br></br>
          <b>Student id: </b> cph-rg86
        </div>

        <div class="column">Welcome</div>
      </div>
    </div>
  );
}

function NoMatch() {
  let location = useLocation();
  return (
    <div>
      <h3>
        No match for
        <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default App;
