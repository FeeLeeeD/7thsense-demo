import React, { useState } from "react";
import { Grid, Skeleton, Stack, Text } from "@chakra-ui/react";
import {
  ChartWrapper,
  ChartWrapperWithDropdown,
} from "~components/charts/chart-wrapper";
import { AudienceReachChart } from "./charts/audience-reach-chart";
import { ConditionalComponent } from "~components/conditional-component";
import { AudienceReachByEngagementChart_v1 } from "./charts/audience-reach-by-engagement_v1";
import { AudienceReachByEngagementNumbers } from "./charts/audience-reach-by-engagement-numbers";
import { AudienceReachByEngagementPercentages } from "./charts/audience-reach-by-engagement-percentages";
import { AverageEmailsPerPerson } from "./charts/average-emails-per-person";
import { EmailsReceivedNumbers } from "./charts/emails-received-numbers";
import { EmailsReceivedPercentages } from "./charts/emails-received-percentages";

export const AudienceReachTab = () => {
  return (
    <Stack spacing="xxlarge">
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

      {ConditionalComponent({
        v1: (
          <ChartWrapper title="Audience reach by engagement type">
            <AudienceReachByEngagementChart_v1 />
          </ChartWrapper>
        ),
        v2: <AudienceReachByEngagementType />,
        fallback: <Skeleton w="full" h="492px" borderRadius="24px" />,
      })}

      {ConditionalComponent({
        v1: <></>,
        v2: (
          <ChartWrapper
            title="Average number of emails received per person"
            description="Description?"
          >
            <AverageEmailsPerPerson />
          </ChartWrapper>
        ),
        fallback: <Skeleton w="full" h="420px" borderRadius="24px" />,
      })}

      {ConditionalComponent({
        v1: <></>,
        v2: <EmailsReceivedCharts />,
        fallback: <Skeleton w="full" h="520px" borderRadius="24px" />,
      })}
    </Stack>
  );
};

/* Audience reach by engagement type */

const audienceReach_options = [
  {
    value: "audience-reach-by-engagement-type-numbers" as const,
    label: "By counts",
    description: "Description (counts)?",
  },
  {
    value: "audience-reach-by-engagement-type-percentages" as const,
    label: "By percentages",
    description: "Description (percentages)?",
  },
];

const AudienceReachByEngagementType = () => {
  const [option, setOption] = useState<
    (typeof audienceReach_options)[number]["value"]
  >("audience-reach-by-engagement-type-numbers");

  return (
    <ChartWrapperWithDropdown
      title="Audience reach by engagement type"
      options={audienceReach_options}
      optionValue={option}
      selectProps={{ w: "200px" }}
      onOptionValueChange={(o) =>
        setOption(o as (typeof audienceReach_options)[number]["value"])
      }
    >
      {option === "audience-reach-by-engagement-type-numbers" && (
        <AudienceReachByEngagementNumbers />
      )}
      {option === "audience-reach-by-engagement-type-percentages" && (
        <AudienceReachByEngagementPercentages />
      )}
    </ChartWrapperWithDropdown>
  );
};

/* Audience reach by engagement type */

const emailsReceived_options = [
  {
    value: "emails-received-counts" as const,
    label: "By counts",
    description: "Description (counts)?",
  },
  {
    value: "emails-received-percentages" as const,
    label: "By percentages",
    description: "Description (percentages)?",
  },
];

const EmailsReceivedCharts = () => {
  const [option, setOption] = useState<
    (typeof emailsReceived_options)[number]["value"]
  >("emails-received-counts");

  return (
    <ChartWrapperWithDropdown
      title="Number of people received x emails"
      options={emailsReceived_options}
      optionValue={option}
      selectProps={{ w: "200px" }}
      onOptionValueChange={(o) =>
        setOption(o as (typeof emailsReceived_options)[number]["value"])
      }
    >
      {option === "emails-received-counts" && (
        <EmailsReceivedNumbers />
      )}
      {option === "emails-received-percentages" && (
        <EmailsReceivedPercentages />
      )}
    </ChartWrapperWithDropdown>
  );
};
