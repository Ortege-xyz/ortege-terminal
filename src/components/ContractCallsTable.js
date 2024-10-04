import React, { useEffect, useState } from "react";
import { useCube } from "../CubeProvider";
import { stacksContractCallsFilteredByZestProtocol } from "../queries";
import { DataGrid } from "@mui/x-data-grid";

const ContractCallsTable = () => {
  const cubejsApi = useCube();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    cubejsApi
      .load(stacksContractCallsFilteredByZestProtocol)
      .then((resultSet) => {
        const data = resultSet.tablePivot().map((row, index) => ({
          id: index,
          function_name: row["stacks_contract_calls.function_name"],
          event_type: row["stacks_contract_calls.event_type"],
          asset_amount: row["stacks_contract_calls.asset_amount"],
        }));
        setRows(data);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, [cubejsApi]);

  const columns = [
    { field: "function_name", headerName: "Function Name", width: 200 },
    { field: "event_type", headerName: "Event Type", width: 200 },
    { field: "asset_amount", headerName: "Asset Amount", width: 200 },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <h2>Stacks Contract Calls Filtered by Zest Protocol</h2>
      <DataGrid rows={rows} columns={columns} pageSize={10} />
    </div>
  );
};

export default ContractCallsTable;
