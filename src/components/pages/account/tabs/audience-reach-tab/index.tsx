import React, { useEffect, useState } from "react";
import { Grid, Stack } from "@chakra-ui/react";
import { ChartWrapper } from "../../../../charts/chart-wrapper";
import { AudienceReachChart } from "./audience-reach-chart";
import { AudienceReachByEngagementChart } from "./audience-reach-by-engagement";

export const AudienceReachTab = () => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setValue(64);
    }, 250);
  }, []);

  return (
    <Stack spacing="xxlarge">
      <Grid gridTemplateColumns="1fr 1fr" gridGap="xxlarge">
        <ChartWrapper title="Audience reach by open" description="This month">
          <AudienceReachChart name="AudienceReach" value={value} />
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

      {/* <ChartWrapper title="Audience reach by engagement type">
        <AudienceReachByEngagementChart />
      </ChartWrapper> */}
    </Stack>
  );
};