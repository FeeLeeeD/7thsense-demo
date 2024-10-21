import React from "react";
import { getCurrentVersion } from "~utils/conditional-rendering";

type ConditionalComponentsArgs = {
  v1: React.ReactNode;
  v2: React.ReactNode;
};

export const ConditionalComponent = ({ v1, v2 }: ConditionalComponentsArgs) => {
  const version = getCurrentVersion();

  if (!version) return <></>;

  const versions = new Map([
    ["v1", v1],
    ["v2", v2],
  ]);

  return <>{versions.get(version)}</>;
};
