import React, { useState } from "react";
import { Box, BoxProps, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import XY from "../../../../charts/xy-legacy";
import { audienceReachByEngagementData } from "~data/charts/audience-reach-by-engagement";

type ChartRollupPeriod = "Monthly" | "Quarterly" | "Yearly";

type AudienceReachByEngagementProps = {
  title?: React.ReactNode;
} & BoxProps;

export const AudienceReachByEngagementChart = ({
  title,
  ...boxProps
}: AudienceReachByEngagementProps) => {
  const [period, setPeriod] = useState<ChartRollupPeriod>("Monthly");

  return (
    <Box>
      <RadioGroup
        my="8px"
        value={period}
        onChange={setPeriod as (period: ChartRollupPeriod) => void}
      >
        <HStack spacing="12px">
          <Radio value="Monthly">Monthly</Radio>
          <Radio value="Quarterly">Quarterly</Radio>
          <Radio value="Yearly">Yearly</Radio>
        </HStack>
      </RadioGroup>

      <XY
        series={getSeries(audienceReachByEngagementData, period)}
        height={boxProps.h || boxProps.height ? "100%" : undefined}
        xAxisSettings={{
          renderer: {
            minGridDistance: 75,
          },
          markUnitChange: period === "Quarterly" ? true : false,
          baseInterval:
            period === "Monthly"
              ? { timeUnit: "month" }
              : period === "Quarterly"
              ? { timeUnit: "month", count: 3 }
              : { timeUnit: "year" },
          ...(period === "Quarterly" && {
            dateFormats: { month: "'quarter' q" },
            tooltipDateFormat: "'quarter' q, yyyy",
          }),
        }}
        showLegend
      />
    </Box>
  );
};

function getSeries(
  data: typeof audienceReachByEngagementData,
  period: ChartRollupPeriod
) {
  const dataForPeriod = data[period];

  const colors = [
    "#3686F1", // "state.info"
    "#25B160", // "state.success"
    "#F6D051", // "state.warning"
    "#0032F5E5", // "chart.scheduled.90"
    "#0064F5E5", // "chart.sent.80"
    "#0096F5E5", // "chart.sent.70"
    "#AFAF4BE5", //"chart.paused.90"
  ];

  const quarterMonth = {
    1: 0,
    2: 3,
    3: 6,
    4: 9,
  };

  const ranges = dataForPeriod.map((chart, i) => ({
    label: chart.label,
    color: colors[i],
    data: [] as any[],
  }));

  const points = dataForPeriod.flatMap((chart) =>
    chart.points.flatMap((point) => {
      if (point.x.__typename === "ChartMonthlyPeriod") {
        return [
          {
            ...point,
            label: chart.label,
            date: new Date(point.x.year, point.x.month - 1, 0, 0, 0, 0, 0),
          },
        ];
      }

      if (point.x.__typename === "ChartQuarterlyPeriod") {
        return [
          {
            ...point,
            label: chart.label,
            date: new Date(
              point.x.year,
              quarterMonth[point.x.quarter],
              1,
              0,
              0,
              0,
              0
            ),
          },
        ];
      }

      if (point.x.__typename === "ChartYearlyPeriod") {
        return [
          {
            ...point,
            label: chart.label,
            date: new Date(point.x.year, 0, 0, 0, 0, 0, 0),
          },
        ];
      }

      return [];
    })
  );

  points.sort((a, b) => (a.date > b.date ? 1 : -1));

  const pointsGroupedByDate = points.reduce((groups, point) => {
    const groupIndex = groups.findIndex((g) => g.date === point.date);
    if (groupIndex > -1) {
      const updatedGroups = [...groups];
      updatedGroups[groupIndex].points.push(point);

      return updatedGroups;
    }

    return [...groups, { date: point.date, points: [point] }];
  }, [] as { date: Date; points: AverageActiveContactsPoint[] }[]);

  pointsGroupedByDate.forEach((group) => {
    ranges.forEach((range) => {
      const point = group.points.find((point) => point.label === range.label);
      if (point) range.data.push({ value: point.y, date: group.date });
      else range.data.push({ value: undefined, date: group.date });
    });
  });

  return ranges;
}

type AverageActiveContactsPoint = { date: Date; label: string; y: number };
