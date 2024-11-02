import React from "react";
import { Grid, Skeleton, Stack } from "@chakra-ui/react";
import { ConditionalComponent } from "~components/conditional-component";
import { AudienceAnalyticsTab_v1 } from "./v1";
import { AudienceAnalyticsTab_v2 } from "./v2";

export const AudienceAnalyticsTab_conditional = () => {
  return ConditionalComponent({
    v1: <AudienceAnalyticsTab_v1 />,
    v2: <AudienceAnalyticsTab_v2 />,
    fallback: (
      <Stack spacing="xxlarge">
        <Skeleton w="full" h="420px" borderRadius="24px" />

        <Grid gridTemplateColumns={{ lg: "1fr 1fr" }} gridGap="xxlarge">
          <Skeleton w="full" h="460" borderRadius="24px" />
          <Skeleton w="full" h="460" borderRadius="24px" />
        </Grid>
      </Stack>
    ),
  });
};
