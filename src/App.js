import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Orders from "./components/Orders/Orders";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";
import LoginContextProvider from "./context/LoginContextProvider";
import PrivateRoute from "./components/Private Route/PrivateRoute";
import CheckOut from "./components/CheckOut/CheckOut";

function App() {
  return (
    <div>
      <LoginContextProvider>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/products/:productId">
              <CheckOut></CheckOut>
            </PrivateRoute>
            <PrivateRoute path="/orders">
              <Orders></Orders>
            </PrivateRoute>
            <PrivateRoute path="/admin">
              <Admin></Admin>
            </PrivateRoute>
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </LoginContextProvider>
    </div>
  );
}

export default App;
