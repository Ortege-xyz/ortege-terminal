import React, { useEffect, useState } from "react";
import { useCube } from "../CubeProvider";
import { stackedStxByCycleAndType } from "../queries";
import { DataGrid } from "@mui/x-data-grid";

const StackedStxTable = () => {
  const cubejsApi = useCube();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    cubejsApi
      .load(stackedStxByCycleAndType)
      .then((resultSet) => {
        const data = resultSet.tablePivot().map((row, index) => ({
          id: index,
          cycle: row["stacks_stacked_stx.cycle"],
          pox_version: row["stacks_stacked_stx.pox_version"],
          stacking_tx_type: row["stacks_stacked_stx.stacking_tx_type"],
          stacked_amount: row["stacks_stacked_stx.stacked_amount"],
        }));
        setRows(data);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, [cubejsApi]);

  const columns = [
    { field: "cycle", headerName: "Cycle", width: 100 },
    { field: "pox_version", headerName: "Pox Version", width: 150 },
    { field: "stacking_tx_type", headerName: "Stacking Tx Type", width: 200 },
    { field: "stacked_amount", headerName: "Stacked Amount", width: 200 },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <h2>Stacked STX by Cycle and Type</h2>
      <DataGrid rows={rows} columns={columns} pageSize={10} />
    </div>
  );
};

export default StackedStxTable;
