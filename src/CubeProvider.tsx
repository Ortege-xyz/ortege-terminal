// src/CubeProvider.tsx
import React, { createContext, useContext, ReactNode } from "react";
import cubejs, { CubeApi } from "@cubejs-client/core";

// Load environment variables
const CUBE_API_URL = process.env.REACT_APP_CUBE_API_URL;
const CUBE_TOKEN = process.env.REACT_APP_CUBE_TOKEN;

if (!CUBE_API_URL || !CUBE_TOKEN) {
  throw new Error("CUBE_API_URL and CUBE_TOKEN must be defined in environment variables");
}

// Initialize Cube.js client with REST API
const cubejsApi: CubeApi = cubejs(CUBE_TOKEN, {
  apiUrl: `${CUBE_API_URL}/cubejs-api/v1`,
  headers: {
    Authorization: `Bearer ${CUBE_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Define the context type
const CubeContext = createContext<CubeApi | undefined>(undefined);

// Custom hook to use the Cube.js API
export const useCube = (): CubeApi => {
  const context = useContext(CubeContext);
  if (!context) {
    throw new Error("useCube must be used within a CubeProvider");
  }
  return context;
};

// Define props for CubeProvider
interface CubeProviderProps {
  children: ReactNode;
}

// CubeProvider component
export const CubeProvider: React.FC<CubeProviderProps> = ({ children }) => {
  return <CubeContext.Provider value={cubejsApi}>{children}</CubeContext.Provider>;
};
