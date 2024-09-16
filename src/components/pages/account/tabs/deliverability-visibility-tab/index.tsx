import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  CircularProgressLabel,
  Grid,
  HStack,
  Select,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { ChartWrapper } from "~components/charts/chart-wrapper";
import { DeliverabilityScoreChart } from "./charts/deliverability-score";
import { OpenClickRateChart } from "./charts/open-click-rate";
import { BounceRateChart } from "./charts/bounce-rate";

export const DeliverabilityVisibilityTab = () => {
  return (
    <Stack spacing="xxlarge">
      <Grid gridTemplateColumns="1fr 500px" gridGap="xxlarge">
        <ChartWrapper
          title="Deliverability rate by email provider"
          description=" This chart shows the percentage of successfully delivered emails for each provider, calculated as (Delivered Emails / Sent Emails) × 100"
        >
          <DeliverabilityScoreChart />
        </ChartWrapper>

        <ChartWrapper
          title="Overall deliverability rate"
          description="Displays the overall deliverability rate, calculated by dividing the total number of delivered emails by the total number of sent emails, multiplied by 100"
        >
          <Score />
        </ChartWrapper>
      </Grid>

      <OpenClickRateBlock />

      <BounceUnsubscribeRateBlock />
    </Stack>
  );
};

const OpenClickRateBlock = () => {
  const [chart, setChart] = useState<"Open" | "Click">("Open");

  return (
    <ChartWrapper
      title={`${chart} rate by Inbox provider`}
      description="A line chart showing the percentage of opened (clicked) emails per provider each month, calculated as (Opened (Clicked) Emails / Delivered Emails) × 100"
      descriptionProps={{ maxW: "60%" }}
      pos="relative"
    >
      <Select
        pos="absolute"
        top="24px"
        right="xxlarge"
        w="200px"
        value={chart}
        onChange={(e) => setChart(e.currentTarget.value as typeof chart)}
      >
        <option value="Open">Open rate</option>
        <option value="Click">Click rate</option>
      </Select>

      <OpenClickRateChart />
    </ChartWrapper>
  );
};

const BounceUnsubscribeRateBlock = () => {
  const [chart, setChart] = useState<"Bounce" | "Unsubscribe">("Bounce");

  return (
    <ChartWrapper
      title={`${chart} by Inbox provider`}
      description="A line chart tracking the percentage of bounced emails (unsubscribes) per provider each month"
      pos="relative"
    >
      <Select
        pos="absolute"
        top="24px"
        right="xxlarge"
        w="200px"
        value={chart}
        onChange={(e) => setChart(e.currentTarget.value as typeof chart)}
      >
        <option value="Bounce">Bounce rate</option>
        <option value="Unsubscribe">Unsubscribe rate</option>
      </Select>

      <BounceRateChart />
    </ChartWrapper>
  );
};

const Score = () => {
  const [score, setScore] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setScore(93);
    }, 250);
  }, []);

  return (
    <HStack flex={1} alignItems="center">
      <CircularProgress
        size="200px"
        value={score}
        color="#78D386"
        borderRadius="32px"
        sx={{
          circle: {
            strokeLinecap: "round",
          },
        }}
      >
        <CircularProgressLabel color="#343A40" fontFamily="monospace">
          94%
        </CircularProgressLabel>
      </CircularProgress>

      <Stack spacing="4px">
        <HStack>
          <Text textStyle="l">Your rate is</Text>
          <Tag size="lg" colorScheme="green" borderRadius="full">
            Great
          </Tag>
        </HStack>

        <Text textStyle="m" color="#707880">
          Over the previous 6 months
        </Text>
      </Stack>
    </HStack>
  );
};
