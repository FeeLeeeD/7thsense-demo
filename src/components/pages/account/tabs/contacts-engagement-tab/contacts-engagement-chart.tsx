import React from "react";
import { BoxProps } from "@chakra-ui/react";
import { data } from "./data";
import XY from "../../../../charts/xy-legacy";

type AllContactEngagementChartProps = {
  title?: React.ReactNode;
} & BoxProps;

export const ContactsEngagementChart = ({
  title,
  ...boxProps
}: AllContactEngagementChartProps) => {
  return (
    <XY
      series={getSeries(data)}
      height={boxProps.h || boxProps.height ? "100%" : undefined}
      xAxisSettings={{
        dateFormats: { day: "EEE", week: "EEE" },
        renderer: { minGridDistance: 75 },
        tooltipDateFormat: "EEE, h a",
      }}
      showLegend
    />
  );
};

function getSeries(
  points: {
    x: {
      day: number;
      hour: number;
      __typename: string;
    };
    y: number;
    __typename: string;
  }[]
) {
  const xyData = points.reduce((points, newPoint) => {
    if (newPoint.x.__typename !== "ChartHourlyPeriod") return points;

    return [
      ...points,
      {
        value: newPoint.y,
        date: new Date(2024, 8, 15 + newPoint.x.day, 0 + newPoint.x.hour),
      },
    ];
  }, [] as { value: number; date: Date }[]);

  const xyRange = {
    label: "Engagement score",
    color: "#4785FF",
    data: xyData,
  };

  return [xyRange];
}
