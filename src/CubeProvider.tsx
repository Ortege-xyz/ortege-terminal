// src/CubeProvider.tsx
import React, { createContext, useContext, ReactNode } from "react";
import cubejs, { CubeApi } from "@cubejs-client/core";

// Load environment variables
const CUBE_API_URL = "https://api-staging.ortege.ai";
const CUBE_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Img4clpoR3VHSDVRZ3MwemRpUWpBNyJ9.eyJpc3MiOiJodHRwczovL2Rldi16NGNrYWFkNzZlaWlmczNkLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJmUjBwT1NHNG5vcjlub3M5Q2hmajRhajg1MmVyOXBtREBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hcGktc3RhZ2luZy5vcnRlZ2UuYWkiLCJpYXQiOjE3MjcyMzMzODUsImV4cCI6MTcyOTgyNTM4NSwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiZlIwcE9TRzRub3I5bm9zOUNoZmo0YWo4NTJlcjlwbUQifQ.Wr9CWf_Phi4uUcdgEvmpqXilkb_DCW-XGXdePuMJWpgB6kB_tqvHU3phkO5qZ0AVfiCzN5yFExEbEYrTkG1OcRtIQMxsXyfXbmVhdbsHFc7WiZnyeI1SgPUpdTJPmQI78MINdioh9DgsB9mi4s42mbuCicQ59dDCcV2iDobrnVJrtTF1vt_IraDQ35dN8M4HwMZiMRW_WQoK4t-PPPPBaceBeQe3lYruG9tpEMBmayv-BAK4OypYwddcCUzqFBu4GAkN1rmMmp6ySwHqJfhQvUxMk-4HulRCWXXa9a9QWdyWm4Z5w1AKU9JoGyfKfwzMUrFBFlZFefG1EhyiX9-Y2A";

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
