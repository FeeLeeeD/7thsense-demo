import React from "react";
import { Grid, Stack, Text } from "@chakra-ui/react";
import { ChartWrapper } from "~components/charts/chart-wrapper";
import { AudienceReachChart } from "./charts/audience-reach-chart";
import { AudienceReachByEngagementChart } from "./charts/audience-reach-by-engagement";

export const AudienceReachTab = () => {
  return (
    <Stack spacing="xxlarge">
      <Grid gridTemplateColumns="1fr 1fr" gridGap="xxlarge">
        <ChartWrapper title="Audience reach by open" description="This month">
          <AudienceReachChart
            value={43}
            ranges={[
              { min: 0, max: 14, color: "#F93232" },
              { min: 15, max: 24, color: "#FFB82E" },
              { min: 25, max: 100, color: "#25B160" },
            ]}
          />
        </ChartWrapper>

        <ChartWrapper title="Audience reach by open" description="Last month">
          <AudienceReachChart
            value={11}
            ranges={[
              { min: 0, max: 14, color: "#F93232" },
              { min: 15, max: 24, color: "#FFB82E" },
              { min: 25, max: 100, color: "#25B160" },
            ]}
          />
        </ChartWrapper>

        <ChartWrapper title="Audience reach by click" description="This month">
          <AudienceReachChart
            isClickReact
            value={12}
            ranges={[
              { min: 0, max: 1, color: "#F93232" },
              { min: 2, max: 4, color: "#FFB82E" },
              { min: 5, max: 100, color: "#25B160" },
            ]}
          />
        </ChartWrapper>

        <ChartWrapper title="Audience reach by click" description="Last month">
          <AudienceReachChart
            isClickReact
            value={3}
            ranges={[
              { min: 0, max: 1, color: "#F93232" },
              { min: 2, max: 4, color: "#FFB82E" },
              { min: 5, max: 100, color: "#25B160" },
            ]}
          />
        </ChartWrapper>
      </Grid>

      <ChartWrapper title="Audience reach by engagement type">
        <AudienceReachByEngagementChart />
      </ChartWrapper>
    </Stack>
  );
};
