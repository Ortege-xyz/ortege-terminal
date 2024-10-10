// src/components/PricingTable.tsx

import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCube } from "../CubeProvider";
import { Box, Typography } from "@mui/material";

interface PricingData {
  id: number;
  timedate: string;
  symbol: string;
  avg_price: number;
}

const PricingTable: React.FC = () => {
  const cubejsApi = useCube();
  const [rows, setRows] = useState<PricingData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "timedate", headerName: "Time & Date", width: 200 },
    { field: "symbol", headerName: "Symbol", width: 150 },
    { field: "avg_price", headerName: "Average Price", width: 150, type: "number", align: 'right', headerAlign: 'right' },
  ];

  const pricingQuery = {
    measures: ["prices.avg_price"],
    timeDimensions: [
      {
        dimension: "prices.timedate",
        granularity: "hour",
        dateRange: "Last 1 hours",
      },
    ],
    dimensions: ["prices.timedate", "prices.symbol"],
    filters: [],
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const resultSet = await cubejsApi.load(pricingQuery);
        const data: PricingData[] = resultSet.tablePivot().map((row: any, index: number) => ({
          id: index + 1,
          timedate: row["prices.timedate"] as string,
          symbol: row["prices.symbol"] as string,
          avg_price: Number(row["prices.avg_price"]),
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
        Pricing Dashboard
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

export default PricingTable;
