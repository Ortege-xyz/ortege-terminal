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
