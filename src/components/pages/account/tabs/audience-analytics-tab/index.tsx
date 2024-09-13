import React from "react";
import { Stack } from "@chakra-ui/react";
import { ChartWrapper } from "~components/charts/chart-wrapper";
import { InitiationRatesChart } from "./charts/initiation-rates";

export const AudienceAnalyticsTab = () => {
  return (
    <Stack spacing="xxlarge">
      <ChartWrapper
        title="Initiation rates"
        description="How likely is a recipient to open an email after receiving nth emails"
      >
        <InitiationRatesChart />
      </ChartWrapper>
    </Stack>
  );
};
