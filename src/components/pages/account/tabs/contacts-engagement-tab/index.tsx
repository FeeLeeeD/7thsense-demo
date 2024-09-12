import React from "react";
import { WorldMap } from "../../../../charts/world-map";
import { ChartWrapper } from "../../../../charts/chart-wrapper";
import { Stack } from "@chakra-ui/react";
import { ContactsEngagementChart } from "./contacts-engagement-chart";

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
    </Stack>
  );
};
