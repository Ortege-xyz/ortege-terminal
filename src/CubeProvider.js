// src/CubeProvider.js
import React, { createContext, useContext } from "react";
import cubejs from "@cubejs-client/core";

// Load environment variables
const CUBE_API_URL = process.env.REACT_APP_CUBE_API_URL;
const CUBE_TOKEN = process.env.REACT_APP_CUBE_TOKEN;

// Initialize Cube.js client with REST API
const cubejsApi = cubejs(CUBE_TOKEN, {
  apiUrl: `${CUBE_API_URL}/cubejs-api/v1`,
  headers: {
    Authorization: `Bearer ${CUBE_TOKEN}`,
    "Content-Type": "application/json",
  },
});

const CubeContext = createContext(cubejsApi);

export const useCube = () => useContext(CubeContext);

export const CubeProvider = ({ children }) => {
  return (
    <CubeContext.Provider value={cubejsApi}>
      {children}
    </CubeContext.Provider>
  );
};
