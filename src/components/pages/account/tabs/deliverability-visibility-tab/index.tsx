import React from "react";
import { Stack } from "@chakra-ui/react";
import { ChartWrapper } from "../../../../charts/chart-wrapper";
import { DeliverabilityScoreChart } from "./charts/deliverability-score";
import { OpenClickRateChart } from "./charts/open-click-rate";
import { BounceRateChart } from "./charts/bounce-rate";

export const DeliverabilityVisibility = () => {
  return (
    <Stack spacing="xxlarge">
      <ChartWrapper
        title="Deliverability score"
        description="Here can be a short description?"
      >
        <DeliverabilityScoreChart />
      </ChartWrapper>

      <ChartWrapper
        title="Open / Click rate per Inbox provider"
        description="Here can be a short description?"
      >
        <OpenClickRateChart />
      </ChartWrapper>

      <ChartWrapper
        title="Bounce rate"
        description="Here can be a short description?"
      >
        <BounceRateChart />
      </ChartWrapper>
    </Stack>
  );
};
