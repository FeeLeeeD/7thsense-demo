import React, { useEffect, useState, useTransition } from "react";
import { getCurrentVersion } from "~utils/conditional-rendering";

type ConditionalComponentsArgs = {
  v1: React.ReactNode;
  v2: React.ReactNode;
  fallback: React.ReactNode;
};

export const ConditionalComponent = ({
  v1,
  v2,
  fallback,
}: ConditionalComponentsArgs) => {
  const [version, setVersion] = useState<string>();

  useEffect(() => {
    const version = getCurrentVersion();
    setVersion(version);
  }, []);

  const versions = new Map([
    ["v1", v1],
    ["v2", v2],
  ]);

  return <>{version ? versions.get(version) : fallback}</>;
};
