// src/components/ContractCallsTable.tsx
import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCube } from "../CubeProvider"; // Correct import
import { BinaryOperator } from "../types/cubejs"; // Ensure you have this type defined
import { ContractCall } from "../types/ContractCall"; // Ensure you have this interface defined

const ContractCallsTable: React.FC = () => {
  const cubejsApi = useCube(); // Use the hook to access cubejsApi
  const [contractId, setContractId] = useState<string>("");
  const [rows, setRows] = useState<ContractCall[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Handle input change with proper typing
  const handleContractIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContractId(e.target.value);
  };

  // Define columns with proper types
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "function_name", headerName: "Function Name", width: 150 },
    { field: "event_type", headerName: "Event Type", width: 150 },
    { field: "asset_amount", headerName: "Asset Amount", width: 150 },
  ];

  // Define the Cube.js query with proper types
  const getContractCallsQuery = (contractId: string) => ({
    measures: ["stacks_lending_zest.total_withdrawn"], // Adjust as per your cube
    dimensions: ["stacks_lending_zest.function_name", "stacks_lending_zest.event_type"],
    filters: [
      {
        dimension: "stacks_lending_zest.contract_id",
        operator: "equals" as BinaryOperator, // Use the BinaryOperator type
        values: [contractId],
      },
    ],
  });

  useEffect(() => {
    if (contractId) {
      setLoading(true);
      setError("");
      cubejsApi
        .load(getContractCallsQuery(contractId))
        .then((resultSet: any) => { // Replace 'any' with proper Cube.js types if available
          const data: ContractCall[] = resultSet.tablePivot().map((row: any, index: number) => ({
            id: index,
            function_name: row["stacks_lending_zest.function_name"] as string,
            event_type: row["stacks_lending_zest.event_type"] as string,
            asset_amount: Number(row["stacks_lending_zest.total_withdrawn"]),
          }));
          setRows(data);
          setLoading(false);
        })
        .catch((error: Error) => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      setRows([]);
    }
  }, [contractId, cubejsApi]);

  return (
    <div>
      <h2>Contract Calls</h2>
      <input
        type="text"
        value={contractId}
        onChange={handleContractIdChange}
        placeholder="Enter Contract ID"
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!loading && !error && rows.length > 0 && (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={rows} columns={columns}  />
        </div>
      )}
      {!loading && !error && rows.length === 0 && contractId && (
        <div>No data available for the specified contract ID.</div>
      )}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default ContractCallsTable;
