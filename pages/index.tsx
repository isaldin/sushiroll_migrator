import React from "react";
import Tabs from "../components/ common/Tabs";
import TokensList from "../components/TokensList";
import LPPositions from "../components/LPPositions";

type MainPageProps = {
  //
};

const MainPage: React.FC<MainPageProps> = () => (
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
          name: "LP Positions",
          component: <LPPositions />,
        },
      ]}
    ></Tabs>
  </div>
);

export default MainPage;
