import React from "react";
import { Route } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import Signup from "../views/Signup";
import NotFound from "../views/404";

export default [
  <Route exact key="home" path="/" component={Home} />,
  <Route exact key="login" path="/login" component={Login} />,
  <Route exact key="signup" path="/signup" component={Signup} />,
  <Route key="404" path="*" component={NotFound} />,
];