import React from "react";
import { Grid, Stack } from "@chakra-ui/react";
import { ChartWrapper } from "../../../../charts/chart-wrapper";
import { DeliverabilityScoreChart } from "./charts/deliverability-score";

export const DeliverabilityVisibility = () => {
  return (
    <Stack spacing="xxlarge">
      <ChartWrapper
        title="Deliverability score"
        description="Here can be a short description?"
      >
        <DeliverabilityScoreChart />
      </ChartWrapper>
      <Grid gridTemplateColumns="1fr 1fr" gap="xxlarge"></Grid>
    </Stack>
  );
};
