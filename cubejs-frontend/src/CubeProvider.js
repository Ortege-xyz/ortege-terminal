// src/CubeProvider.js

import React, { createContext, useContext } from "react";
import cubejs from "@cubejs-client/core";
import WebSocketTransport from "@cubejs-client/ws-transport";

// Replace with your actual Cube.js API URL and token
const CUBE_API_URL = "ws://api-staging.ortege.ai/cubejs-api/v1"; // Ensure the path is correct
const CUBE_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Img4clpoR3VHSDVRZ3MwemRpUWpBNyJ9.eyJpc3MiOiJodHRwczovL2Rldi16NGNrYWFkNzZlaWlmczNkLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJmUjBwT1NHNG5vcjlub3M5Q2hmajRhajg1MmVyOXBtREBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hcGktc3RhZ2luZy5vcnRlZ2UuYWkiLCJpYXQiOjE3MjcyMzMzODUsImV4cCI6MTcyOTgyNTM4NSwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiZlIwcE9TRzRub3I5bm9zOUNoZmo0YWo4NTJlcjlwbUQifQ.Wr9CWf_Phi4uUcdgEvmpqXilkb_DCW-XGXdePuMJWpgB6kB_tqvHU3phkO5qZ0AVfiCzN5yFExEbEYrTkG1OcRtIQMxsXyfXbmVhdbsHFc7WiZnyeI1SgPUpdTJPmQI78MINdioh9DgsB9mi4s42mbuCicQ59dDCcV2iDobrnVJrtTF1vt_IraDQ35dN8M4HwMZiMRW_WQoK4t-PPPPBaceBeQe3lYruG9tpEMBmayv-BAK4OypYwddcCUzqFBu4GAkN1rmMmp6ySwHqJfhQvUxMk-4HulRCWXXa9a9QWdyWm4Z5w1AKU9JoGyfKfwzMUrFBFlZFefG1EhyiX9-Y2A"; // Replace with your actual secret or token

const cubejsApi = cubejs(
  CUBE_TOKEN,
  {
    transport: new WebSocketTransport({
      apiUrl: CUBE_API_URL,
      headers: {
        Authorization: `Bearer ${CUBE_TOKEN}`,
      },
    }),
  }
);

const CubeContext = createContext(cubejsApi);

export const useCube = () => useContext(CubeContext);

export const CubeProvider = ({ children }) => {
  return (
    <CubeContext.Provider value={cubejsApi}>
      {children}
    </CubeContext.Provider>
  );
};
