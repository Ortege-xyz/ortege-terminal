// src/components/ZestSupplyTable.tsx

import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCube } from "../CubeProvider";
import { ZestSupply } from "../types/ZestSupply";
import { BinaryOperator } from "../types/cubejs"; // Ensure this type is defined
import { Box, Typography } from "@mui/material";

const ZestSupplyTable: React.FC = () => {
  const cubejsApi = useCube();
  const [rows, setRows] = useState<ZestSupply[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Define columns with proper typing
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "sender_address", headerName: "Sender Address", width: 200 },
    { field: "asset_id", headerName: "Asset ID", width: 150 },
    { field: "total_supplied", headerName: "Total Supplied", width: 150, type: "number" },
    { field: "total_borrowed", headerName: "Total Borrowed", width: 150, type: "number" },
    { field: "total_repaid", headerName: "Total Repaid", width: 150, type: "number" },
    { field: "total_withdrawn", headerName: "Total Withdrawn", width: 150, type: "number" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const resultSet = await cubejsApi.load(zestSupplyQuery);
        const data: ZestSupply[] = resultSet.tablePivot().map((row: any, index: number) => ({
          id: index + 1, // Ensure unique ID
          sender_address: row["stacks_lending_zest.sender_address"] as string,
          asset_id: row["stacks_lending_zest.asset_id"] as string,
          total_supplied: Number(row["stacks_lending_zest.total_supplied"]),
          total_borrowed: Number(row["stacks_lending_zest.total_borrowed"]),
          total_repaid: Number(row["stacks_lending_zest.total_repaid"]),
          total_withdrawn: Number(row["stacks_lending_zest.total_withdrawn"]),
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

  // Define the zestSupply query
  const zestSupplyQuery = {
    measures: [
      "stacks_lending_zest.total_supplied",
      "stacks_lending_zest.total_borrowed",
      "stacks_lending_zest.total_repaid",
      "stacks_lending_zest.total_withdrawn",
    ],
    dimensions: [
      "stacks_lending_zest.sender_address",
      "stacks_lending_zest.asset_id",
    ],
    filters: [
    ],
  };

  return (
    <Box sx={{ height: 600, width: "100%", padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Zest Positions
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

export default ZestSupplyTable;
