import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCube } from "../CubeProvider"; // Correct import
import { BinaryOperator } from "../types/cubejs"; // Ensure you have this type defined
import { ContractCall } from "../types/ContractCall"; // Ensure you have this interface defined

// Moved the query function into the same file
const getContractCallsQuery = (contractId: string) => ({
  measures: ["stacks_contract_calls.asset_amount"],
  timeDimensions: [
    {
      dimension: "stacks_contract_calls.tx_date",
      dateRange: "last 3 months", // Filter to include only the last week of transactions
    },
  ],
  dimensions: [
    "stacks_contract_calls.function_name",
    "stacks_contract_calls.event_type",
    "stacks_contract_calls.sender_address", // New field for sender address
    "stacks_contract_calls.asset_event_type", // New field for asset event type
    "stacks_contract_calls.asset_id", // New field for asset id
    "stacks_contract_calls.asset_recipient", // New field for asset recipient
  ],
  filters: [
    {
      dimension: "stacks_contract_calls.contract_id",
      operator: "equals" as BinaryOperator,
      values: [contractId],
    },
  ],
});

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

  // Define columns with proper types and the new fields
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "function_name", headerName: "Function Name", width: 150 },
    { field: "event_type", headerName: "Event Type", width: 150 },
    { field: "asset_amount", headerName: "Asset Amount", width: 150 },
    { field: "sender_address", headerName: "Sender Address", width: 200 },
    { field: "asset_event_type", headerName: "Asset Event Type", width: 150 },
    { field: "asset_id", headerName: "Asset ID", width: 150 },
    { field: "asset_recipient", headerName: "Asset Recipient", width: 200 },
  ];

  useEffect(() => {
    if (contractId) {
      setLoading(true);
      setError("");
      cubejsApi
        .load(getContractCallsQuery(contractId))
        .then((resultSet: any) => { // Replace 'any' with proper Cube.js types if available
          const data: ContractCall[] = resultSet.tablePivot().map((row: any, index: number) => ({
            id: index,
            function_name: row["stacks_contract_calls.function_name"] as string,
            event_type: row["stacks_contract_calls.event_type"] as string,
            asset_amount: Number(row["stacks_contract_calls.asset_amount"]),
            sender_address: row["stacks_contract_calls.sender_address"] as string,
            asset_event_type: row["stacks_contract_calls.asset_event_type"] as string,
            asset_id: row["stacks_contract_calls.asset_id"] as string,
            asset_recipient: row["stacks_contract_calls.asset_recipient"] as string,
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
      <h2>Contract Call Events</h2>
      <input
        type="text"
        value={contractId}
        onChange={handleContractIdChange}
        placeholder="Enter Contract ID"
      />
      <p>
        To test out this table, please enter one of the popular contracts on Stacks (Please note if your smart contract doesn't have events then nothing will appear here):
      </p>
      <ul>
        <li>SP000000000000000000002Q6VF78.bns</li>
        <li>SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-swap-v2-1</li>
        <li>SP1BMZTS416A3VTMN0SYTRMEJSCHW75RRAKXWF4DZ.inscription</li>
        <li>SP1Y5YSTAHZ88XYK1VPDH24GY0HPX5J4JECTMY4A1.univ2-router</li>
        <li>SP102V8P0F7JX67ARQ77WEA3D3CFB5XW39REDT0AM.amm-pool-v2-01</li>
        <li>SPQC38PW542EQJ5M11CR25P7BS1CA6QT4TBXGB3M.stableswap-stx-ststx-v-1-2</li>
        <li>SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stacking-dao-core-v1</li>
        <li>SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.send-many-memo</li>
        <li>SP1Z92MPDQEWZXW36VX71Q25HKF5K2EPCJ304F275.stackswap-swap-v5k</li>
        <li>SP8A9HZ3PKST0S42VM9523Z9NV42SZ026V4K39WH.ccd006-citycoin-mining-v2</li>
        <li>SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.marketplace-v4</li>
        <li>SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.stacks-art-market-v2</li>
      </ul>
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
