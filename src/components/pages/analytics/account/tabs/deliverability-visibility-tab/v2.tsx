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
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  ChartWrapper,
  ChartWrapperWithDropdown,
} from "~components/charts/chart-wrapper";
import { InboxProvidersChart } from "./charts/inbox-providers";
import { SendVolumeDeliveryRateChart } from "./charts/send-volume-delivery-rate";
import { DeliverabilityScoreChart } from "./charts/deliverability-score";
import { SendVolumeChart } from "./charts/trending-charts/send-volume";
import { DeliveryRateChart } from "./charts/trending-charts/delivery-rate";
import { BounceRateChart } from "./charts/bounce-rate";

export const DeliverabilityInsightsTab_v2 = () => {
  return (
    <Stack spacing="xxlarge">
      <Grid gridTemplateColumns={{ lg: "340px auto" }} gridGap="xxlarge">
        <ChartWrapper
          title="Inbox providers"
          description="Breakdown of the major inbox providers that the people in your database use"
        >
          <InboxProvidersChart />
        </ChartWrapper>

        <ChartWrapper
          title="Daily send volume & Delivery rate"
          description="Do we need description?"
        >
          <SendVolumeDeliveryRateChart />
        </ChartWrapper>
      </Grid>

      <Grid
        gridTemplateColumns={{ lg: "auto 280px", xl: "auto 440px" }}
        gridGap="xxlarge"
      >
        <ChartWrapper
          title="Delivery rate by email provider"
          description="This chart shows the percentage of successfully delivered emails for each provider, calculated as (Delivered Emails / Sent Emails) × 100"
        >
          <DeliverabilityScoreChart />
        </ChartWrapper>

        <ChartWrapper
          title="Overall delivery rate"
          description="Displays the overall delivery rate, calculated by dividing the total number of delivered emails by the total number of sent emails, multiplied by 100"
        >
          <Score />
        </ChartWrapper>
      </Grid>

      <TrendingCharts />

      <BounceUnsubscribeRateBlock />
    </Stack>
  );
};

const options = [
  {
    value: "send-volume" as const,
    label: "Send volume",
    title: "Send volume",
    description: "Description for send volume?",
  },
  {
    value: "delivery-rate" as const,
    label: "Delivery rate",
    title: "Delivery rate",
    description: "Description for Delivery rate?",
  },
  {
    value: "open-rate" as const,
    label: "Open rate",
    title: "Open rate",
    description: "Description for Open rate?",
  },
  {
    value: "click-rate" as const,
    label: "Click rate",
    title: "Click rate",
    description: "Description for Click rate?",
  },
  {
    value: "click-through-rate" as const,
    label: "Click through rate",
    title: "Click through rate",
    description: "Description for Click through rate?",
  },
];

const TrendingCharts = () => {
  const [option, setOption] =
    useState<(typeof options)[number]["value"]>("send-volume");

  return (
    <ChartWrapperWithDropdown
      options={options}
      optionValue={option}
      onOptionValueChange={(o) =>
        setOption(o as (typeof options)[number]["value"])
      }
      selectProps={{ w: "200px" }}
    >
      {option === "send-volume" && <SendVolumeChart />}
      {option === "delivery-rate" && <DeliveryRateChart />}
    </ChartWrapperWithDropdown>
  );
};

const BounceUnsubscribeRateBlock = () => {
  const [chart, setChart] = useState<"Bounce" | "Unsubscribe">("Bounce");

  return (
    <ChartWrapper
      title={`${chart} by Inbox provider`}
      description={`A line chart tracking the percentage of ${
        chart === "Bounce" ? "bounced emails" : "unsubscribes"
      } per provider each month`}
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
    <HStack
      flex={1}
      justify="center"
      flexDir={{ lg: "column-reverse", xl: "row" }}
    >
      <CircularProgress
        size={{ base: "180px", lg: "140px", xl: "180px" } as unknown as string}
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
        <Wrap>
          <WrapItem>
            <Text textStyle="l">Your rate is</Text>
          </WrapItem>
          <WrapItem>
            <Tag size="lg" colorScheme="green" borderRadius="full">
              Great
            </Tag>
          </WrapItem>
        </Wrap>

        <Text textStyle="m" color="#707880">
          Over the previous 6 months
        </Text>
      </Stack>
    </HStack>
  );
};
