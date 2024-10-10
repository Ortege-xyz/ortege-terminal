// src/components/StackedStxTable.tsx
import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCube } from "../CubeProvider";
import { BinaryOperator } from "../types/cubejs";
import { StackedStx } from "../types/StackedStx";

const StackedStxTable: React.FC = () => {
  const cubejsApi = useCube();
  const [rows, setRows] = useState<StackedStx[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "cycle", headerName: "Cycle", width: 150 },
    { field: "pox_version", headerName: "POX Version", width: 150 },
    { field: "stacking_tx_type", headerName: "Stacking TX Type", width: 150 },
    { field: "stacked_amount", headerName: "Stacked Amount", width: 150 },
  ];

  const getStackedStxQuery = () => ({
    measures: ["stacks_stacked_stx.stacked_amount"], // Adjust as per your cube
    dimensions: ["stacks_stacked_stx.cycle", "stacks_stacked_stx.pox_version", "stacks_stacked_stx.stacking_tx_type"],
    filters: [
      {
        dimension: "stacks_stacked_stx.stacking_tx_type",
        operator: "equals" as BinaryOperator,
        values: ["regular"], // Example filter value
      },
    ],
  });

  useEffect(() => {
    setLoading(true);
    setError("");
    cubejsApi
      .load(getStackedStxQuery())
      .then((resultSet: any) => { // Replace 'any' with proper Cube.js types if available
        const data: StackedStx[] = resultSet.tablePivot().map((row: any, index: number) => ({
          id: index,
          cycle: row["stacks_stacked_stx.cycle"] as string,
          pox_version: row["stacks_stacked_stx.pox_version"] as string,
          stacking_tx_type: row["stacks_stacked_stx.stacking_tx_type"] as string,
          stacked_amount: Number(row["stacks_stacked_stx.stacked_amount"]),
        }));
        setRows(data);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [cubejsApi]);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <h2>Stacked STX by Cycle and Type</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!loading && !error && rows.length > 0 && (
        <DataGrid rows={rows} columns={columns}  />
      )}
      {!loading && !error && rows.length === 0 && (
        <div>No data available.</div>
      )}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default StackedStxTable;
