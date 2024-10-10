// src/components/StellarTransactionsTable.tsx

import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCube } from "../CubeProvider";
import { Box, Typography } from "@mui/material";

// Define the structure for each row in the table
interface StellarTransactionData {
  id: number;
  account: string;
  block_height: number;
  timestamp: string;
  avg_fee: number;
}

const StellarTransactionsTable: React.FC = () => {
  const cubejsApi = useCube();
  const [rows, setRows] = useState<StellarTransactionData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Define the columns for the DataGrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "account", headerName: "Account", width: 200 },
    { field: "block_height", headerName: "Block Height", width: 150, type: "number" },
    { field: "timestamp", headerName: "Timestamp", width: 200 },
    { field: "avg_fee", headerName: "Average Fee", width: 150, type: "number", align: 'right', headerAlign: 'right' },
  ];

  // Query to get Stellar transactions based on your cube structure
  const stellarTransactionsQuery = {
    measures: ["stellar_tx.avg_fee"],
    timeDimensions: [
      {
        dimension: "stellar_tx.timestamp",
        granularity: "hour",
        dateRange: "Last 1 hours"
      }
    ],
    dimensions: [
      "stellar_tx.account",
      "stellar_tx.block_height"
    ],
    filters: [],
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const resultSet = await cubejsApi.load(stellarTransactionsQuery);
        const data: StellarTransactionData[] = resultSet.tablePivot().map((row: any, index: number) => ({
          id: index + 1,
          account: row["stellar_tx.account"] as string,
          block_height: Number(row["stellar_tx.block_height"]),
          timestamp: row["stellar_tx.timestamp"] as string,
          avg_fee: Number(row["stellar_tx.avg_fee"]),
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
        Stellar Transactions
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

export default StellarTransactionsTable;
