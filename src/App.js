// src/App.js
import React from "react";
import Auth from "./Auth";
import Dashboard from "./Dashboard";

const App = () => {
  return (
    <Auth>
      <Dashboard />
    </Auth>
  );
};

export default App;
