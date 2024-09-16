import React from "react";
import { WorldMap } from "~components/charts/world-map";
import { ChartWrapper } from "~components/charts/chart-wrapper";
import { Grid, Stack } from "@chakra-ui/react";
import { ContactsEngagementChart } from "./charts/contacts-engagement";
import { LatencyDeliveredOpenedChart } from "./charts/latency-delivered-opened";
import { LatencyFirstHour } from "./charts/latency-first-hour";

export const ContactsEngagementTab = () => {
  return (
    <Stack spacing="xxlarge">
      <ChartWrapper
        title="People engagement by time"
        description="This chart displays your email engagement scores, based on a proprietary scoring system, for every hour of the week. It highlights how likely your contacts are to engage with emails at different times"
      >
        <ContactsEngagementChart />
      </ChartWrapper>

      <ChartWrapper
        title="People engagement by place"
        description="This map highlights regions where recipients are clicking links and opening emails, providing a visual representation of engagement levels by location"
      >
        <WorldMap />
      </ChartWrapper>

      <Grid gridTemplateColumns="1fr 1fr" gridGap="xxlarge">
        <ChartWrapper
          title="Opened latency"
          description="This chart shows the monthly percentage change in the time it takes for recipients to open an email after it has been delivered, compared to the average latency"
        >
          <LatencyDeliveredOpenedChart />
        </ChartWrapper>

        <ChartWrapper
          title="First-hour email opens"
          description="This chart displays the percentage change in the number of contacts who opened an email within the first hour of delivery, compared to the average"
        >
          <LatencyFirstHour />
        </ChartWrapper>
      </Grid>
    </Stack>
  );
};
