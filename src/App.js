import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Logout from "./components/Logout";
import Login from "./components/Login";
import Auth from "./components/Auth";
import Home from "./components/Home";
import News from "./components/News";
import Calendar from "./components/Calendar";
import "./stylesheet/custom.scss";
function App() {
  const domain = "https://faceworld-api.herokuapp.com";
  // const domain = "http://localhost:8000";
  const NavRoute = ({ exact, path, component: Component }) => (
    <Route
      exact={exact}
      path={path}
      render={(props) => (
        <div>
          <Component {...props} />
        </div>
      )}
    />
  );
  const AdminNavRoute = ({ exact, path, component: Component }) => (
    <Route
      exact={exact}
      path={path}
      render={(props) => (
        <div>
          <Component {...props} />
        </div>
      )}
    />
  );
  const auth = new Auth();

  function handleSucessfulAuth(data) {
    auth.setToken(data.token);
    auth.setUserId(data.id);
    auth.setPrivilledge(data.privilledge);
    auth.authenticate();
  }
  function handleLogOut() {
    auth.signout();
  }
  console.log(auth.getAuthAdmin());

  return (
    <Router>
      <Switch>
        <Route path="/" exact render={(props) => <Redirect to="/login" />} />
        <Route
          path="/login"
          exact
          render={(props) => (
            <Login
              {...props}
              domain={domain}
              loggedInStatus={auth.getAuthToString()}
              handleSucessfulAuth={handleSucessfulAuth}
            />
          )}
        />
        <Route
          path="/logout"
          exact
          render={(props) => (
            <Logout {...props} domain={domain} handleLogOut={handleLogOut} />
          )}
        />
         <NavRoute
          exact
          path="/home"
          component={(props) =>
            auth.getAuth() ? (
              <Home
                {...props}
                activeLink="home"
                user={auth.userId}
                domain={domain}
                handleLogOut={handleLogOut}
                token={auth.getAuthToken()}
              />
            ) : (
              <Redirect to={{ pathname: "/login" }} />
            )
          }
        />
        <NavRoute
          exact
          path="/news"
          component={(props) =>
            auth.getAuth() ? (
              <News
                {...props}
                activeLink="home"
                user={auth.userId}
                domain={domain}
                handleLogOut={handleLogOut}
                token={auth.getAuthToken()}
              />
            ) : (
              <Redirect to={{ pathname: "/login" }} />
            )
          }
        />
        <NavRoute
          exact
          path="/calendar"
          component={(props) =>
            auth.getAuth() ? (
              <Calendar
                {...props}
                activeLink="home"
                user={auth.userId}
                domain={domain}
                handleLogOut={handleLogOut}
                token={auth.getAuthToken()}
              />
            ) : (
              <Redirect to={{ pathname: "/login" }} />
            )
          }
        />
        
      </Switch>
    </Router>
  );
}

export default App;
