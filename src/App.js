import React from "react";
import { CubeProvider } from "./CubeProvider";
import StackedStxTable from "./components/StackedStxTable";
import ContractCallsTable from "./components/ContractCallsTable";
import DappsTvlMarketCapTable from "./components/DappsTvlMarketCapTable";

function App() {
  return (
    <CubeProvider>
      <div className="App">
        <StackedStxTable />
        <ContractCallsTable />
        <DappsTvlMarketCapTable />
      </div>
    </CubeProvider>
  );
}

export default App;
