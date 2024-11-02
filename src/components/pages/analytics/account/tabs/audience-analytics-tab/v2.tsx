import React, { useState } from "react";
import { Grid, Stack } from "@chakra-ui/react";
import {
  ChartWrapper,
  ChartWrapperWithDropdown,
} from "~components/charts/chart-wrapper";
import { PredictedEnrollmentRateChart } from "./charts/predicted-enrollment-rate";
import { ContactEngagementProbabilityChart } from "./charts/contact-engagement-probability";
import { EngagementConversionOpenNumbersChart } from "./charts/engagement-conversion/engagement-converison-open-numbers";
import { EngagementConversionOpenPercentagesChart } from "./charts/engagement-conversion/engagement-converison-open-percentages";
import { EngagementConversionClickNumbersChart } from "./charts/engagement-conversion/engagement-converison-click-numbers";
import { EngagementConversionClickPercentagesChart } from "./charts/engagement-conversion/engagement-converison-click-percentages";
import { EmailsSinceLastEngagementOpenChart } from "./charts/emails-since-last-engagement-open";
import { EmailsSinceLastEngagementClickChart } from "./charts/emails-since-last-engagement-click";

export const AudienceAnalyticsTab_v2 = () => {
  return (
    <Stack spacing="xxlarge">
      <EngagementConversionByOpenChart />

      <EngagementConversionByClickChart />

      <Grid gridTemplateColumns={{ lg: "1fr 1fr" }} gridGap="xxlarge">
        <ChartWrapper
          title="Predicted enrollment rate with recycling"
          description="This chart shows the estimated number of contacts who will be enrolled in an email campaign when using an AI algorithm to recycle contacts by targeting more engaged recipients"
        >
          <PredictedEnrollmentRateChart />
        </ChartWrapper>

        <ChartWrapper
          title="Contact engagement probability"
          description="Description?"
        >
          <ContactEngagementProbabilityChart />
        </ChartWrapper>
      </Grid>

      <EmailsSinceLastEngagement />
    </Stack>
  );
};

/*  Engagement conversion charts */

const open_options = [
  {
    value: "engagement-conversion-open-numbers" as const,
    label: "By counts",
    description: "Description?",
  },
  {
    value: "engagement-conversion-open-percentages" as const,
    label: "By percentages",
    description: "Description?",
  },
];

const EngagementConversionByOpenChart = () => {
  const [option, setOption] = useState<(typeof open_options)[number]["value"]>(
    "engagement-conversion-open-numbers"
  );

  return (
    <ChartWrapperWithDropdown
      title="Initial engagement conversion by open"
      options={open_options}
      optionValue={option}
      onOptionValueChange={(o) =>
        setOption(o as (typeof open_options)[number]["value"])
      }
      selectProps={{ w: "200px" }}
    >
      {option === "engagement-conversion-open-numbers" && (
        <EngagementConversionOpenNumbersChart />
      )}
      {option === "engagement-conversion-open-percentages" && (
        <EngagementConversionOpenPercentagesChart />
      )}
    </ChartWrapperWithDropdown>
  );
};

const click_options = [
  {
    value: "engagement-conversion-click-numbers" as const,
    label: "By counts",
    description: "Description?",
  },
  {
    value: "engagement-conversion-click-percentages" as const,
    label: "By percentages",
    description: "Description?",
  },
];

const EngagementConversionByClickChart = () => {
  const [option, setOption] = useState<(typeof click_options)[number]["value"]>(
    "engagement-conversion-click-numbers"
  );

  return (
    <ChartWrapperWithDropdown
      title="Initial engagement conversion by click"
      options={click_options}
      optionValue={option}
      onOptionValueChange={(o) =>
        setOption(o as (typeof click_options)[number]["value"])
      }
      selectProps={{ w: "200px" }}
    >
      {option === "engagement-conversion-click-numbers" && (
        <EngagementConversionClickNumbersChart />
      )}
      {option === "engagement-conversion-click-percentages" && (
        <EngagementConversionClickPercentagesChart />
      )}
    </ChartWrapperWithDropdown>
  );
};

/* EmailsSinceLastEngagementChart */

const emailsSinceLast_options = [
  {
    value: "emails-since-last-engagement-open" as const,
    label: "By open",
    description: "Description?",
  },
  {
    value: "emails-since-last-engagement-click" as const,
    label: "By click",
    description: "Description?",
  },
];

const EmailsSinceLastEngagement = () => {
  const [option, setOption] = useState<
    (typeof emailsSinceLast_options)[number]["value"]
  >("emails-since-last-engagement-open");

  return (
    <ChartWrapperWithDropdown
      title="Emails delivered since last engagement"
      options={emailsSinceLast_options}
      optionValue={option}
      onOptionValueChange={(o) =>
        setOption(o as (typeof emailsSinceLast_options)[number]["value"])
      }
      selectProps={{ w: "200px" }}
    >
      {option === "emails-since-last-engagement-open" && (
        <EmailsSinceLastEngagementOpenChart />
      )}
      {option === "emails-since-last-engagement-click" && (
        <EmailsSinceLastEngagementClickChart />
      )}
    </ChartWrapperWithDropdown>
  );
};
