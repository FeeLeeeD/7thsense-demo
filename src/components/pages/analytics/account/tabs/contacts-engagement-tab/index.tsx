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
        title="Based on Seventh Sense's engagement score, when do people engage in my emails?"
        description="This chart displays your email engagement scores, based on a proprietary scoring system, for every hour of the week. It highlights how likely your contacts are to engage with emails at different times"
      >
        <ContactsEngagementChart />
      </ChartWrapper>

      <ChartWrapper
        title="Where are people engaging with my emails?"
        description="This map highlights regions where recipients are clicking links and opening emails, providing a visual representation of engagement levels by location. Some email providers hide where their users are. We use the IP address location which may not be accurate"
      >
        <WorldMap />
      </ChartWrapper>

      <Grid
        gridTemplateColumns={{ base: "1fr", xl: "1fr 1fr" }}
        gridGap="xxlarge"
      >
        <ChartWrapper
          title="What is the time to emails first being opened"
          description="The longer your emails sit in people's inboxes, the less likely they are to be seen, let alone engage with. This displays the average amount of time your emails are sitting in inboxes before they are first opened compared to your average. Having a lower percentage is good and means your emails aren't sitting there getting piled on top of"
        >
          <LatencyDeliveredOpenedChart />
        </ChartWrapper>

        <ChartWrapper
          title="What percentage of people are opening my email within the first hour of being delivered?"
          description="The length of time your emails sit in inboxes can determine whether your emails are seen, lest alone engaged with. This compares time average time your emails are sitting in inboxes"
        >
          <LatencyFirstHour />
        </ChartWrapper>
      </Grid>
    </Stack>
  );
};
