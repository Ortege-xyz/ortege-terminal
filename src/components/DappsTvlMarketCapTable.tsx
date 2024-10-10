// src/components/DappsTvlMarketCapTable.tsx
import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCube } from "../CubeProvider";
import { BinaryOperator } from "../types/cubejs";
import { DappsTvlMarketCap } from "../types/DappsTvlMarketCap";

const DappsTvlMarketCapTable: React.FC = () => {
  const cubejsApi = useCube();
  const [rows, setRows] = useState<DappsTvlMarketCap[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "snapshot_date", headerName: "Snapshot Date", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "avg_tvl", headerName: "Avg TVL", width: 150 },
    { field: "avg_mcap", headerName: "Avg Market Cap", width: 150 },
  ];

  const getDappsTvlMarketCapQuery = () => ({
    measures: ["dapps_dl.avg_tvl", "dapps_dl.avg_mcap"], // Adjust as per your cube
    dimensions: ["dapps_dl.snapshot_date", "dapps_dl.name", "dapps_dl.category"],
    filters: [
      {
        dimension: "dapps_dl.category",
        operator: "equals" as BinaryOperator,
        values: ["DeFi"], // Example filter value
      },
    ],
  });

  useEffect(() => {
    setLoading(true);
    setError("");
    cubejsApi
      .load(getDappsTvlMarketCapQuery())
      .then((resultSet: any) => { // Replace 'any' with proper Cube.js types if available
        const data: DappsTvlMarketCap[] = resultSet.tablePivot().map((row: any, index: number) => ({
          id: index,
          snapshot_date: row["dapps_dl.snapshot_date"] as string,
          name: row["dapps_dl.name"] as string,
          category: row["dapps_dl.category"] as string,
          avg_tvl: Number(row["dapps_dl.avg_tvl"]),
          avg_mcap: Number(row["dapps_dl.avg_mcap"]),
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
      <h2>Stacks DApps TVL and Market Cap</h2>
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

export default DappsTvlMarketCapTable;
