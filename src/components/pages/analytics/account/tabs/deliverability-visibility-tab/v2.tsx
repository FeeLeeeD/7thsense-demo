import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  CircularProgressLabel,
  Grid,
  HStack,
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
import { OpenRateChart } from "./charts/trending-charts/open-rate";
import { ClickRateChart } from "./charts/trending-charts/click-rate";
import { ClickThroughRateChart } from "./charts/trending-charts/click-through-rate";
import { BounceRateChart } from "./charts/trending-charts/bounce-rate";
import { UnsubscribeRateChart } from "./charts/trending-charts/unsubscribe-rate";
import { AudienceReachByOpenChart } from "./charts/audience-reach-by-open";
import { AudienceReachByClickChart } from "./charts/audience-reach-by-click";

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
          title="Daily send volume & delivery rate"
          description="The number of emails sent to each inbox provider and the associated delivery rate"
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

      <AudienceReachCharts />
    </Stack>
  );
};

/* Trending charts */

const trending_options = [
  {
    value: "send-volume" as const,
    label: "Send volume",
    description:
      "Send volume by inbox provider - zoom in to get daily statistics",
  },
  {
    value: "delivery-rate" as const,
    label: "Delivery rate",
    description:
      "Delivery rate by inbox provider - zoom in to get daily statistics",
  },
  {
    value: "open-rate" as const,
    label: "Open rate",
    description:
      "Open rate by inbox provider - zoom in to get daily statistics",
  },
  {
    value: "click-rate" as const,
    label: "Click rate",
    description:
      "Click rate by inbox provider - zoom in to get daily statistics",
  },
  {
    value: "click-through-rate" as const,
    label: "Click through rate",
    description:
      "Click through rate by inbox provider - zoom in to get daily statistics",
  },
];

const TrendingCharts = () => {
  const [option, setOption] =
    useState<(typeof trending_options)[number]["value"]>("send-volume");

  return (
    <ChartWrapperWithDropdown
      title="Email metrics by inbox provider"
      options={trending_options}
      optionValue={option}
      onOptionValueChange={(o) =>
        setOption(o as (typeof trending_options)[number]["value"])
      }
      selectProps={{ w: "200px" }}
    >
      {option === "send-volume" && <SendVolumeChart />}
      {option === "delivery-rate" && <DeliveryRateChart />}
      {option === "open-rate" && <OpenRateChart />}
      {option === "click-rate" && <ClickRateChart />}
      {option == "click-through-rate" && <ClickThroughRateChart />}
    </ChartWrapperWithDropdown>
  );
};

/* Bounce/unsubscribe charts */

const bounce_options = [
  {
    value: "bounce-rate" as const,
    label: "Bounce rate",
    description:
      "Bounce rate by inbox provider - zoom in to get daily statistics",
  },
  {
    value: "unsubscribe-rate" as const,
    label: "Unsubscribe rate",
    description:
      "Unsubscribe rate by Inbox provider - zoom in to get daily statistics",
  },
];

const BounceUnsubscribeRateBlock = () => {
  const [option, setOption] =
    useState<(typeof bounce_options)[number]["value"]>("bounce-rate");

  return (
    <ChartWrapperWithDropdown
      title="Negative email metrics by inbox provider"
      options={bounce_options}
      optionValue={option}
      onOptionValueChange={(o) =>
        setOption(o as (typeof bounce_options)[number]["value"])
      }
      selectProps={{ w: "200px" }}
    >
      {option === "bounce-rate" && <BounceRateChart />}
      {option === "unsubscribe-rate" && <UnsubscribeRateChart />}
    </ChartWrapperWithDropdown>
  );
};

/* Audience reach */

const audience_options = [
  {
    value: "audience-reach-by-open" as const,
    label: "By open",
    description:
      "The percentage of your audience that were sent at least one email during the specified time frame that have opened at least one email",
  },
  {
    value: "audience-reach-by-click" as const,
    label: "By click",
    description:
      "The percentage of your audience that were sent at least one email during the specified time frame that have clicked on at least one link",
  },
];

const AudienceReachCharts = () => {
  const [option, setOption] = useState<
    (typeof audience_options)[number]["value"]
  >("audience-reach-by-open");

  return (
    <ChartWrapperWithDropdown
      title="Audience reach by inbox provider"
      options={audience_options}
      optionValue={option}
      onOptionValueChange={(o) =>
        setOption(o as (typeof audience_options)[number]["value"])
      }
      selectProps={{ w: "160px" }}
    >
      {option === "audience-reach-by-open" && <AudienceReachByOpenChart />}
      {option === "audience-reach-by-click" && <AudienceReachByClickChart />}
    </ChartWrapperWithDropdown>
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
