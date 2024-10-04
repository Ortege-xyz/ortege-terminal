import React, { useEffect, useState } from "react";
import { useCube } from "../CubeProvider";
import { stacksDappsTvlAndMarketCap } from "../queries";
import { DataGrid } from "@mui/x-data-grid";

const DappsTvlMarketCapTable = () => {
  const cubejsApi = useCube();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    cubejsApi
      .load(stacksDappsTvlAndMarketCap)
      .then((resultSet) => {
        const data = resultSet.tablePivot().map((row, index) => ({
          id: index,
          snapshot_date: row["dapps_dl.snapshot_timedate.day"],
          name: row["dapps_dl.name"],
          category: row["dapps_dl.category"],
          avg_tvl: row["dapps_dl.avg_tvl"],
          avg_mcap: row["dapps_dl.avg_mcap"],
        }));
        setRows(data);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, [cubejsApi]);

  const columns = [
    { field: "snapshot_date", headerName: "Snapshot Date", width: 150 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "category", headerName: "Category", width: 200 },
    { field: "avg_tvl", headerName: "Average TVL", width: 150 },
    { field: "avg_mcap", headerName: "Average Market Cap", width: 150 },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <h2>Stacks DApps TVL and Market Cap</h2>
      <DataGrid rows={rows} columns={columns} pageSize={10} />
    </div>
  );
};

export default DappsTvlMarketCapTable;
