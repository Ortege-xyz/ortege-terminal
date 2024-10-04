// Query for stacked STX by cycle and type
export const stackedStxByCycleAndType = {
    measures: ["stacks_stacked_stx.stacked_amount"],
    timeDimensions: [],
    dimensions: [
      "stacks_stacked_stx.cycle",
      "stacks_stacked_stx.pox_version",
      "stacks_stacked_stx.stacking_tx_type",
    ],
    filters: [
      {
        dimension: "stacks_stacked_stx.cycle",
        operator: "gte",
        values: ["80"],
      },
    ],
  };
  
  // Query for Stacks contract calls filtered by the Zest protocol contract address
  export const stacksContractCallsFilteredByZestProtocol = {
    measures: ["stacks_contract_calls.asset_amount"],
    timeDimensions: [],
    dimensions: [
      "stacks_contract_calls.function_name",
      "stacks_contract_calls.event_type",
    ],
    filters: [
      {
        dimension: "stacks_contract_calls.contract_id",
        operator: "equals",
        values: ["SP2VCQJGH7PHP2DJK7Z0V48AGBHQAW3R3ZW1QF4N.borrow-helper-v1-3"],
      },
    ],
  };
  
  // Query for Stacks DApps TVL and market cap
  export const stacksDappsTvlAndMarketCap = {
    measures: ["dapps_dl.avg_tvl", "dapps_dl.avg_mcap"],
    timeDimensions: [
      {
        dimension: "dapps_dl.snapshot_timedate",
        granularity: "day",
      },
    ],
    dimensions: ["dapps_dl.name", "dapps_dl.category"],
    filters: [
      {
        dimension: "dapps_dl.chain",
        operator: "equals",
        values: ["Stacks"],
      },
    ],
  };
  