// src/components/ContractCallsTable.js

import React, { useEffect, useState } from "react";
import { useCube } from "../CubeProvider";
import { getContractCallsQuery } from "../queries";
import { DataGrid } from "@mui/x-data-grid";

const ContractCallsTable = () => {
  const cubejsApi = useCube();
  const [rows, setRows] = useState([]);
  const [contractId, setContractId] = useState(""); // Start with an empty contract ID
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleContractIdChange = (e) => {
    setContractId(e.target.value);
  };

  useEffect(() => {
    if (!contractId) {
      setRows([]);
      return;
    }

    setLoading(true);
    setError("");
    cubejsApi
      .load(getContractCallsQuery(contractId))
      .then((resultSet) => {
        const data = resultSet.tablePivot().map((row, index) => ({
          id: index,
          function_name: row["stacks_contract_calls.function_name"],
          event_type: row["stacks_contract_calls.event_type"],
          asset_amount: row["stacks_contract_calls.asset_amount"],
        }));
        setRows(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setError("Failed to load data for the specified contract ID.");
        setLoading(false);
      });
  }, [cubejsApi, contractId]);

  const columns = [
    { field: "function_name", headerName: "Function Name", width: 200 },
    { field: "event_type", headerName: "Event Type", width: 200 },
    { field: "asset_amount", headerName: "Asset Amount", width: 200 },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <h2>Stacks Contract Calls</h2>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="contractId">Contract ID: </label>
        <input
          id="contractId"
          type="text"
          value={contractId}
          onChange={handleContractIdChange}
          placeholder="Enter Contract ID"
          style={{ width: "400px" }}
        />
      </div>
      {loading && <div>Loading data...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!loading && !error && rows.length > 0 && (
        <DataGrid rows={rows} columns={columns} pageSize={10} />
      )}
      {!loading && !error && rows.length === 0 && contractId && (
        <div>No data available for the specified contract ID.</div>
      )}
    </div>
  );
};

export default ContractCallsTable;
