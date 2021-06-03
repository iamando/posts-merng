import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Semantic UI
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";

// Screens
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PostScreen from "./screens/PostScreen";

// Components
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/posts/:postId" component={PostScreen} />
          <AuthRoute exact path="/login" component={LoginScreen} />
          <AuthRoute exact path="/register" component={RegisterScreen} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
