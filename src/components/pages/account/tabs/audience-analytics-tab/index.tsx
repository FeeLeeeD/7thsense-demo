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
        description="The likelihood that a recipient will open an email, given that they have not opened any previous emails"
      >
        <InitiationRatesChart />
      </ChartWrapper>

      <Grid gridTemplateColumns="1fr 1fr" gridGap="xxlarge">
        <ChartWrapper
          title="Predicted enrollment rate with recycling"
          description="This chart shows the estimated number of contacts who will be enrolled in an email campaign when using an AI algorithm to recycle contacts by targeting more engaged recipients"
        >
          <PredictedEnrollmentRateChart />
        </ChartWrapper>

        <ChartWrapper
          title="Distribution by Engagement Segment"
          description="This pie chart illustrates the distribution of engagement levels within your audience"
        >
          <EngagementSegmentsChart />
        </ChartWrapper>
      </Grid>
    </Stack>
  );
};
