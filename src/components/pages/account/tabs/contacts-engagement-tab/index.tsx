import React from "react";
import { WorldMap } from "../../../../charts/world-map";
import { ChartWrapper } from "../../../../charts/chart-wrapper";
import { Stack } from "@chakra-ui/react";
import { ContactsEngagementChart } from "./contacts-engagement-chart";
import { LatencyDeliveredOpenedChart } from "./charts/latency-delivered-opened";
import { LatencyFirstHour} from "./charts/latency-first-hour";

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

      <ChartWrapper
        title="Latency"
        description='"Delivered" to "Opened" latency change in comparison with average, %'
      >
        <LatencyDeliveredOpenedChart />
      </ChartWrapper>

      <ChartWrapper
        title="Latency"
        description='Improvement of number of contacts opened within the first hour, %'
      >
        <LatencyFirstHour />
      </ChartWrapper>
    </Stack>
  );
};
