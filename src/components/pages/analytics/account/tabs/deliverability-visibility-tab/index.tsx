import React from "react";
import { ConditionalComponent } from "~components/conditional-component";
import { DeliverabilityVisibilityTab_v1 } from "./v1";
import { DeliverabilityInsightsTab_v2 } from "./v2";
import { Grid, Skeleton, Stack } from "@chakra-ui/react";

export const DeliverabilityVisibilityTab_conditional = () =>
  ConditionalComponent({
    v1: <DeliverabilityVisibilityTab_v1 />,
    v2: <DeliverabilityInsightsTab_v2 />,
    fallback: (
      <Stack spacing="xxlarge">
        <Grid
          h="540px"
          gridTemplateColumns={{ lg: "340px auto" }}
          gridGap="xxlarge"
        >
          <Skeleton w="full" h="full" borderRadius="24px" />
          <Skeleton w="full" h="full" borderRadius="24px" />
        </Grid>

        <Grid
          h="440px"
          gridTemplateColumns={{ lg: "auto 280px", xl: "auto 440px" }}
          gridGap="xxlarge"
        >
          <Skeleton w="full" h="full" borderRadius="24px" />
          <Skeleton w="full" h="full" borderRadius="24px" />
        </Grid>
      </Stack>
    ),
  });
