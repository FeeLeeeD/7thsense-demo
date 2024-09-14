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
      <ChartWrapper title="All contact engagement">
        <ContactsEngagementChart />
      </ChartWrapper>

      <ChartWrapper
        title="Contacts engagement by place"
        description="Here can be a short description?"
      >
        <WorldMap />
      </ChartWrapper>

      <Grid gridTemplateColumns="1fr 1fr" gridGap="xxlarge">
        <ChartWrapper
          title="Latency"
          description='"Delivered" to "Opened" latency change in comparison with average, %'
        >
          <LatencyDeliveredOpenedChart />
        </ChartWrapper>

        <ChartWrapper
          title="Latency"
          description="Improvement of number of contacts opened within the first hour, %"
        >
          <LatencyFirstHour />
        </ChartWrapper>
      </Grid>
    </Stack>
  );
};
