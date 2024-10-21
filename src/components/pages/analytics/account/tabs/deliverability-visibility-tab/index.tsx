import React from "react";
import { ConditionalComponent } from "~components/conditional-component";
import { DeliverabilityVisibilityTab_v1 } from "./v1";
import { DeliverabilityInsightsTab_v2 } from "./v2";

export const DeliverabilityVisibilityTab_conditional = () =>
  ConditionalComponent({
    v1: <DeliverabilityVisibilityTab_v1 />,
    v2: <DeliverabilityInsightsTab_v2 />,
  });
