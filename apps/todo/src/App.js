import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Todos from './components/Todos';

import "./App.css";

function App() {
  return (
    <Router>
      <Todos></Todos>
    </Router>
  );
}

export default App;
