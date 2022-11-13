import React from "react";
import Tabs from "../components/ common/Tabs";
import TokensList from "../components/TokensList";
import LPPositions from "../components/LPPositions";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import LPPositionsV2 from "../components/LPPositionsV2";

type MainPageProps = {
  //
};

const MainPage: React.FC<MainPageProps> = () => {
  const { active, activate } = useWeb3React();

  if (!active) {
    const injectedConnector = new InjectedConnector({
      supportedChainIds: [1, 5],
    });
    activate(injectedConnector);
  }

  return (
    <div>
      <Tabs
        tabs={[
          {
            id: "tokens",
            name: "Tokens List",
            component: <TokensList />,
          },
          {
            id: "lp",
            name: "LP Positions V2",
            component: <LPPositionsV2 />,
          },
          {
            id: "lp2",
            name: "LP Positions V3",
            component: <LPPositions />,
          },
        ]}
      ></Tabs>
    </div>
  );
};

export default MainPage;
