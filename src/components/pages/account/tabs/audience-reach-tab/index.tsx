import React, { useEffect, useState } from "react";
import { Grid, Stack, Text } from "@chakra-ui/react";
import { ChartWrapper } from "~components/charts/chart-wrapper";
import { AudienceReachChart } from "./audience-reach-chart";

export const AudienceReachTab = () => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setValue(64);
    }, 250);
  }, []);

  return (
    <Stack spacing="xxlarge">
      <Text>In progress...</Text>

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
    </Stack>
  );
};
