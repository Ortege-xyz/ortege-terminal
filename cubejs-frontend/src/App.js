// src/App.js

import React from "react";
import { CubeProvider } from "./CubeProvider";
import SubscriptionComponent from "./SubscriptionComponent";

function App() {
  return (
    <CubeProvider>
      <div className="App">
        <h1>Cube.js API Showcase</h1>
        <SubscriptionComponent />
      </div>
    </CubeProvider>
  );
}

export default App;
