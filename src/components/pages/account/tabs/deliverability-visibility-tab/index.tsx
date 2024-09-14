import React, { useState } from "react";
import { Grid, Select, Stack } from "@chakra-ui/react";
import { ChartWrapper } from "~components/charts/chart-wrapper";
import { DeliverabilityScoreChart } from "./charts/deliverability-score";
import { OpenClickRateChart } from "./charts/open-click-rate";
import { BounceRateChart } from "./charts/bounce-rate";

export const DeliverabilityVisibilityTab = () => {
  return (
    <Stack spacing="xxlarge">
      <Grid gridTemplateColumns="1fr 1fr" gridGap="xxlarge">
        <ChartWrapper
          title="Deliverability rate"
          description="Here can be a short description?"
        >
          <DeliverabilityScoreChart />
        </ChartWrapper>

        <ChartWrapper
          title="Deliverability rate"
          description="Based on last month of data"
        >
          Score
        </ChartWrapper>
      </Grid>

      <OpenClickRateBlock />

      <BounceUnsubscribeRateBlock />
    </Stack>
  );
};

const OpenClickRateBlock = () => {
  const [chart, setChart] = useState<"Open" | "Click">("Open");

  return (
    <ChartWrapper
      title={`${chart} rate per Inbox provider`}
      description="Here can be a short description?"
      pos="relative"
    >
      <Select
        pos="absolute"
        top="24px"
        right="xxlarge"
        w="200px"
        value={chart}
        onChange={(e) => setChart(e.currentTarget.value as typeof chart)}
      >
        <option value="Open">Open rate</option>
        <option value="Click">Click rate</option>
      </Select>

      <OpenClickRateChart />
    </ChartWrapper>
  );
};

const BounceUnsubscribeRateBlock = () => {
  const [chart, setChart] = useState<"Bounce" | "Unsubscribe">("Bounce");

  return (
    <ChartWrapper
      title={`${chart} rate`}
      description="Here can be a short description?"
      pos="relative"
    >
      <Select
        pos="absolute"
        top="24px"
        right="xxlarge"
        w="200px"
        value={chart}
        onChange={(e) => setChart(e.currentTarget.value as typeof chart)}
      >
        <option value="Bounce">Bounce rate</option>
        <option value="Unsubscribe">Unsubscribe rate</option>
      </Select>

      <BounceRateChart />
    </ChartWrapper>
  );
};
