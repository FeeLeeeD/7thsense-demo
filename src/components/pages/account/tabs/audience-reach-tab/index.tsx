import React from "react";
import { Grid, Stack } from "@chakra-ui/react";
import { ChartWrapper } from "../../../../charts/chart-wrapper";
import { AudienceReachChart } from "./audience-reach-chart";

export const AudienceReachTab = () => {
  return (
    <Stack spacing="xxlarge">
      <Grid gridTemplateColumns="1fr 1fr" gridGap="xxlarge">
        <ChartWrapper title="Audience reach by open" description="This month">
          <AudienceReachChart name="AudienceReach" value={64} />
        </ChartWrapper>

        <ChartWrapper title="Audience reach by open" description="Last month">
          <AudienceReachChart name="AudienceReach" value={17} />
        </ChartWrapper>

        <ChartWrapper title="Audience reach by click" description="This month">
          <AudienceReachChart name="ClickReach" value={14} />
        </ChartWrapper>

        <ChartWrapper title="Audience reach by click" description="Last month">
          <AudienceReachChart name="ClickReach" value={2} />
        </ChartWrapper>
      </Grid>
    </Stack>
  );
};
