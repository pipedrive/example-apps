import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Todos from './components/Todos';
import { GlobalContextProvider } from './context/GlobalContext';

import "./App.css";

function App() {
  return (
    <Router>
      <GlobalContextProvider>
        <Todos></Todos>
      </GlobalContextProvider>
    </Router>
  );
}

export default App;
