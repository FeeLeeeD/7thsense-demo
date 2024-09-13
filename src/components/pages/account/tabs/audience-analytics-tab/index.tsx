import React from "react";
import { Grid, Stack } from "@chakra-ui/react";
import { ChartWrapper } from "~components/charts/chart-wrapper";
import { InitiationRatesChart } from "./charts/initiation-rates";
import { PredictedEnrollmentRateChart } from "./charts/predicted-enrollment-rate";
import { EngagementSegmentsChart } from "./charts/engagement-segments";

export const AudienceAnalyticsTab = () => {
  return (
    <Stack spacing="xxlarge">
      <ChartWrapper
        title="Initiation rates"
        description="How likely is a recipient to open an email after receiving nth emails"
      >
        <InitiationRatesChart />
      </ChartWrapper>

      <Grid gridTemplateColumns="1fr 1fr" gridGap="xxlarge">
        <ChartWrapper title="Predicted enrollment rate with recycling">
          <PredictedEnrollmentRateChart />
        </ChartWrapper>
     
        <ChartWrapper title="Engagements segments chart">
          <EngagementSegmentsChart />
        </ChartWrapper>
      </Grid>
    </Stack>
  );
};
