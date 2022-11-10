import React, { useEffect, useState } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";
import classnames from "classnames";
import ArrowButton from "../ArrowButton";

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

  const changeTab = (direction: "prev" | "next") => () => {
    const currentIndex = tabs.findIndex((item) => item.id === active);
    let nextIndex = currentIndex + (direction === "prev" ? -1 : 1);

    if (nextIndex + 1 > tabs.length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = tabs.length - 1;
    }

    if (tabs[nextIndex]) {
      props.router.replace({
        query: { ...props.router.query, tab: tabs[nextIndex].id },
      });
    }
  };

  const activeComponent = tabs.find((tab) => tab.id === active)?.component;

  return (
    <>
      <div className="bg-gray-50 flex flex h-16 text-slate-600 justify-evenly items-center">
        <ArrowButton direction="left" onClick={changeTab("prev")} />
        {tabs.map((tab) => (
          // @todo move to separate comp
          <div
            key={tab.id}
            className={classnames("flex items-center", {
              underline: tab.id === active,
            })}
          >
            <Link href={{ query: { tab: tab.id } }}>{tab.name}</Link>
          </div>
        ))}
        <ArrowButton direction="right" onClick={changeTab("next")} />
      </div>
      {activeComponent}
    </>
  );
};

export default withRouter(Tabs);
