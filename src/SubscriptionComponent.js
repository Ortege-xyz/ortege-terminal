// src/SubscriptionComponent.js

import React, { useEffect, useState } from "react";
import { useCube } from "./CubeProvider";

const SubscriptionComponent = () => {
  const cubeApi = useCube();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const subscription = cubeApi.subscribe(
      {
        measures: ["stacks_contract_events.assetAmount"],
        timeDimensions: [
          {
            dimension: "stacks_contract_events.txDate",
            granularity: "hour",
            dateRange: "last 1440 minutes", // Equivalent to last 24 hours
          },
        ],
        dimensions: ["stacks_contract_events.contractId"],
      },
      {},
      (err, resultSet) => {
        if (err) {
          setError(err);
        } else if (resultSet) {
          setData(resultSet.chartPivot());
        }
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [cubeApi]);

  if (error) return <div>Error: {error.toString()}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>Asset Amount by Contract ID (Last 24 Hours)</h2>
      <table>
        <thead>
          <tr>
            <th>Contract ID</th>
            <th>Asset Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>{row["stacks_contract_events.contractId"]}</td>
              <td>{row["stacks_contract_events.assetAmount"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionComponent;
