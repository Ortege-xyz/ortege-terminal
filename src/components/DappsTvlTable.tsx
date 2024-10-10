// src/components/DappsTvlTable.tsx

import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCube } from "../CubeProvider";
import { Box, Typography } from "@mui/material";
import { BinaryOperator } from "@cubejs-client/core"; // Ensure this import path is correct based on your Cube.js setup

// Define the structure for each row in the table
interface DappsTvlData {
  id: number;
  snapshot_timedate: string;
  name: string;
  category: string;
  avg_tvl: number;
  avg_mcap: number;
  chain: string; // Added the chain field
}

const DappsTvlTable: React.FC = () => {
  const cubejsApi = useCube();
  const [rows, setRows] = useState<DappsTvlData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "snapshot_timedate", headerName: "Snapshot Time & Date", width: 200 },
    { field: "name", headerName: "DApp Name", width: 200 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "avg_tvl", headerName: "Average TVL", width: 150, type: "number", align: 'right', headerAlign: 'right' },
    { field: "avg_mcap", headerName: "Average Market Cap", width: 180, type: "number", align: 'right', headerAlign: 'right' },
    { field: "chain", headerName: "Chain", width: 120 }, // New chain column
  ];

  const dappsTvlQuery = {
    measures: ["dapps_dl.avg_tvl", "dapps_dl.avg_mcap"],
    timeDimensions: [
      {
        dimension: "dapps_dl.snapshot_timedate",
        granularity: "day",
      },
    ],
    dimensions: ["dapps_dl.name", "dapps_dl.category", "dapps_dl.chain"], // Added chain to the dimensions
    filters: [
      {
        dimension: "dapps_dl.chain",
        operator: "equals" as BinaryOperator,
        values: ["Stacks", "Bitcoin", "Stellar", "Aptos", "Sui"],
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const resultSet = await cubejsApi.load(dappsTvlQuery);
        const data: DappsTvlData[] = resultSet.tablePivot().map((row: any, index: number) => ({
          id: index + 1,
          snapshot_timedate: row["dapps_dl.snapshot_timedate"] as string,
          name: row["dapps_dl.name"] as string,
          category: row["dapps_dl.category"] as string,
          avg_tvl: Number(row["dapps_dl.avg_tvl"]),
          avg_mcap: Number(row["dapps_dl.avg_mcap"]),
          chain: row["dapps_dl.chain"] as string, // Extracting chain field
        }));
        setRows(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cubejsApi]);

  return (
    <Box sx={{ height: 600, width: "100%", padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        DApps TVL and Market Cap
      </Typography>
      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 25, 50]}
        pagination
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DappsTvlTable;
