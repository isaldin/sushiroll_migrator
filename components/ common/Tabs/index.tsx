import React, { useEffect, useState } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";
import classnames from "classnames";

type TabsProps = {
  tabs: Array<{
    id: string;
    name: string;
    component: React.ReactNode;
  }>;
} & WithRouterProps;

const Tabs: React.FC<TabsProps> = (props) => {
  const [active, setActive] = useState("string");

  const {
    tabs = [],
    router: {
      query: { tab: queryTab },
    },
  } = props;

  useEffect(() => {
    if (
      tabs.length === 0 ||
      typeof queryTab !== "string" ||
      !tabs.map((item) => item.id).includes(queryTab)
    ) {
      setActive(tabs[0].id);
      return;
    }
    setActive(queryTab);
  }, [tabs, queryTab]);

  const activeComponent = tabs.find((tab) => tab.id === active)?.component;

  return (
    <>
      <div className="bg-gray-50 flex flex h-16 text-slate-600 justify-evenly items-center">
        {tabs.map((tab) => (
          // @todo move to separate comp
          <div
            key={tab.id}
            className={classnames("flex items-center", {
              underline: tab.id === active,
            })}
          >
            <Link href={{ pathname: "/", query: { tab: tab.id } }}>
              {tab.name}
            </Link>
          </div>
        ))}
      </div>
      {activeComponent}
    </>
  );
};

export default withRouter(Tabs);
