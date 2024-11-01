import React from "react";
import { Skeleton } from "@chakra-ui/react";
import { ConditionalComponent } from "~components/conditional-component";
import { WorldMap_v1 } from "./v1";
import { WorldMap_v2 } from "./v2";

export const WorldMap_conditional = () => {
  return ConditionalComponent({
    v1: <WorldMap_v1 />,
    v2: <WorldMap_v2 />,
    fallback: <Skeleton w="full" h="400px" borderRadius="16px" />,
  });
};
