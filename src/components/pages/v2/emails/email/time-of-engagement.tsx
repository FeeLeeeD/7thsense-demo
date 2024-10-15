import React from "react";
import { BoxProps } from "@chakra-ui/react";
import XY from "~components/charts/xy-legacy";

type AllContactEngagementChartProps = {
  title?: React.ReactNode;
} & BoxProps;

export const TimeOfEngagementChart = ({
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
    color: "#6699FF",
    data: xyData,
  };

  return [xyRange];
}

export const data = [
  {
    x: {
      day: 1,
      hour: 0,
      __typename: "ChartHourlyPeriod",
    },
    y: 108,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 1,
      __typename: "ChartHourlyPeriod",
    },
    y: 78,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 2,
      __typename: "ChartHourlyPeriod",
    },
    y: 91,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 3,
      __typename: "ChartHourlyPeriod",
    },
    y: 91,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 4,
      __typename: "ChartHourlyPeriod",
    },
    y: 62,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 5,
      __typename: "ChartHourlyPeriod",
    },
    y: 134,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 6,
      __typename: "ChartHourlyPeriod",
    },
    y: 155,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 7,
      __typename: "ChartHourlyPeriod",
    },
    y: 177,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 8,
      __typename: "ChartHourlyPeriod",
    },
    y: 116,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 9,
      __typename: "ChartHourlyPeriod",
    },
    y: 139,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 10,
      __typename: "ChartHourlyPeriod",
    },
    y: 183,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 11,
      __typename: "ChartHourlyPeriod",
    },
    y: 124,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 12,
      __typename: "ChartHourlyPeriod",
    },
    y: 193,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 13,
      __typename: "ChartHourlyPeriod",
    },
    y: 254,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 14,
      __typename: "ChartHourlyPeriod",
    },
    y: 245,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 15,
      __typename: "ChartHourlyPeriod",
    },
    y: 334,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 16,
      __typename: "ChartHourlyPeriod",
    },
    y: 280,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 17,
      __typename: "ChartHourlyPeriod",
    },
    y: 212,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 18,
      __typename: "ChartHourlyPeriod",
    },
    y: 236,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 19,
      __typename: "ChartHourlyPeriod",
    },
    y: 237,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 20,
      __typename: "ChartHourlyPeriod",
    },
    y: 193,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 21,
      __typename: "ChartHourlyPeriod",
    },
    y: 134,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 22,
      __typename: "ChartHourlyPeriod",
    },
    y: 129,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 1,
      hour: 23,
      __typename: "ChartHourlyPeriod",
    },
    y: 123,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 0,
      __typename: "ChartHourlyPeriod",
    },
    y: 112,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 1,
      __typename: "ChartHourlyPeriod",
    },
    y: 105,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 2,
      __typename: "ChartHourlyPeriod",
    },
    y: 108,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 3,
      __typename: "ChartHourlyPeriod",
    },
    y: 94,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 4,
      __typename: "ChartHourlyPeriod",
    },
    y: 139,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 5,
      __typename: "ChartHourlyPeriod",
    },
    y: 88,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 6,
      __typename: "ChartHourlyPeriod",
    },
    y: 126,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 7,
      __typename: "ChartHourlyPeriod",
    },
    y: 128,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 8,
      __typename: "ChartHourlyPeriod",
    },
    y: 164,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 9,
      __typename: "ChartHourlyPeriod",
    },
    y: 154,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 10,
      __typename: "ChartHourlyPeriod",
    },
    y: 160,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 11,
      __typename: "ChartHourlyPeriod",
    },
    y: 144,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 12,
      __typename: "ChartHourlyPeriod",
    },
    y: 154,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 13,
      __typename: "ChartHourlyPeriod",
    },
    y: 198,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 14,
      __typename: "ChartHourlyPeriod",
    },
    y: 190,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 15,
      __typename: "ChartHourlyPeriod",
    },
    y: 231,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 16,
      __typename: "ChartHourlyPeriod",
    },
    y: 233,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 17,
      __typename: "ChartHourlyPeriod",
    },
    y: 193,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 18,
      __typename: "ChartHourlyPeriod",
    },
    y: 192,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 19,
      __typename: "ChartHourlyPeriod",
    },
    y: 125,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 20,
      __typename: "ChartHourlyPeriod",
    },
    y: 134,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 21,
      __typename: "ChartHourlyPeriod",
    },
    y: 139,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 22,
      __typename: "ChartHourlyPeriod",
    },
    y: 139,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 2,
      hour: 23,
      __typename: "ChartHourlyPeriod",
    },
    y: 107,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 0,
      __typename: "ChartHourlyPeriod",
    },
    y: 50,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 1,
      __typename: "ChartHourlyPeriod",
    },
    y: 70,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 2,
      __typename: "ChartHourlyPeriod",
    },
    y: 85,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 3,
      __typename: "ChartHourlyPeriod",
    },
    y: 86,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 4,
      __typename: "ChartHourlyPeriod",
    },
    y: 53,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 5,
      __typename: "ChartHourlyPeriod",
    },
    y: 89,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 6,
      __typename: "ChartHourlyPeriod",
    },
    y: 68,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 7,
      __typename: "ChartHourlyPeriod",
    },
    y: 115,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 8,
      __typename: "ChartHourlyPeriod",
    },
    y: 92,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 9,
      __typename: "ChartHourlyPeriod",
    },
    y: 111,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 10,
      __typename: "ChartHourlyPeriod",
    },
    y: 112,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 11,
      __typename: "ChartHourlyPeriod",
    },
    y: 167,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 12,
      __typename: "ChartHourlyPeriod",
    },
    y: 170,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 13,
      __typename: "ChartHourlyPeriod",
    },
    y: 176,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 14,
      __typename: "ChartHourlyPeriod",
    },
    y: 223,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 15,
      __typename: "ChartHourlyPeriod",
    },
    y: 211,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 16,
      __typename: "ChartHourlyPeriod",
    },
    y: 228,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 17,
      __typename: "ChartHourlyPeriod",
    },
    y: 158,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 18,
      __typename: "ChartHourlyPeriod",
    },
    y: 150,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 19,
      __typename: "ChartHourlyPeriod",
    },
    y: 216,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 20,
      __typename: "ChartHourlyPeriod",
    },
    y: 218,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 21,
      __typename: "ChartHourlyPeriod",
    },
    y: 142,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 22,
      __typename: "ChartHourlyPeriod",
    },
    y: 149,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 3,
      hour: 23,
      __typename: "ChartHourlyPeriod",
    },
    y: 175,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 0,
      __typename: "ChartHourlyPeriod",
    },
    y: 102,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 1,
      __typename: "ChartHourlyPeriod",
    },
    y: 85,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 2,
      __typename: "ChartHourlyPeriod",
    },
    y: 106,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 3,
      __typename: "ChartHourlyPeriod",
    },
    y: 166,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 4,
      __typename: "ChartHourlyPeriod",
    },
    y: 167,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 5,
      __typename: "ChartHourlyPeriod",
    },
    y: 133,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 6,
      __typename: "ChartHourlyPeriod",
    },
    y: 159,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 7,
      __typename: "ChartHourlyPeriod",
    },
    y: 140,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 8,
      __typename: "ChartHourlyPeriod",
    },
    y: 192,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 9,
      __typename: "ChartHourlyPeriod",
    },
    y: 190,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 10,
      __typename: "ChartHourlyPeriod",
    },
    y: 161,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 11,
      __typename: "ChartHourlyPeriod",
    },
    y: 189,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 12,
      __typename: "ChartHourlyPeriod",
    },
    y: 153,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 13,
      __typename: "ChartHourlyPeriod",
    },
    y: 361,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 14,
      __typename: "ChartHourlyPeriod",
    },
    y: 291,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 15,
      __typename: "ChartHourlyPeriod",
    },
    y: 333,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 16,
      __typename: "ChartHourlyPeriod",
    },
    y: 315,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 17,
      __typename: "ChartHourlyPeriod",
    },
    y: 230,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 18,
      __typename: "ChartHourlyPeriod",
    },
    y: 227,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 19,
      __typename: "ChartHourlyPeriod",
    },
    y: 204,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 20,
      __typename: "ChartHourlyPeriod",
    },
    y: 200,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 21,
      __typename: "ChartHourlyPeriod",
    },
    y: 198,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 22,
      __typename: "ChartHourlyPeriod",
    },
    y: 170,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 4,
      hour: 23,
      __typename: "ChartHourlyPeriod",
    },
    y: 113,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 0,
      __typename: "ChartHourlyPeriod",
    },
    y: 88,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 1,
      __typename: "ChartHourlyPeriod",
    },
    y: 112,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 2,
      __typename: "ChartHourlyPeriod",
    },
    y: 108,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 3,
      __typename: "ChartHourlyPeriod",
    },
    y: 119,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 4,
      __typename: "ChartHourlyPeriod",
    },
    y: 101,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 5,
      __typename: "ChartHourlyPeriod",
    },
    y: 107,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 6,
      __typename: "ChartHourlyPeriod",
    },
    y: 134,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 7,
      __typename: "ChartHourlyPeriod",
    },
    y: 121,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 8,
      __typename: "ChartHourlyPeriod",
    },
    y: 161,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 9,
      __typename: "ChartHourlyPeriod",
    },
    y: 133,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 10,
      __typename: "ChartHourlyPeriod",
    },
    y: 172,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 11,
      __typename: "ChartHourlyPeriod",
    },
    y: 208,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 12,
      __typename: "ChartHourlyPeriod",
    },
    y: 190,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 13,
      __typename: "ChartHourlyPeriod",
    },
    y: 208,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 14,
      __typename: "ChartHourlyPeriod",
    },
    y: 280,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 15,
      __typename: "ChartHourlyPeriod",
    },
    y: 282,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 16,
      __typename: "ChartHourlyPeriod",
    },
    y: 195,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 17,
      __typename: "ChartHourlyPeriod",
    },
    y: 216,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 18,
      __typename: "ChartHourlyPeriod",
    },
    y: 207,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 19,
      __typename: "ChartHourlyPeriod",
    },
    y: 151,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 20,
      __typename: "ChartHourlyPeriod",
    },
    y: 186,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 21,
      __typename: "ChartHourlyPeriod",
    },
    y: 142,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 22,
      __typename: "ChartHourlyPeriod",
    },
    y: 109,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 5,
      hour: 23,
      __typename: "ChartHourlyPeriod",
    },
    y: 128,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 0,
      __typename: "ChartHourlyPeriod",
    },
    y: 104,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 1,
      __typename: "ChartHourlyPeriod",
    },
    y: 94,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 2,
      __typename: "ChartHourlyPeriod",
    },
    y: 107,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 3,
      __typename: "ChartHourlyPeriod",
    },
    y: 113,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 4,
      __typename: "ChartHourlyPeriod",
    },
    y: 89,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 5,
      __typename: "ChartHourlyPeriod",
    },
    y: 141,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 6,
      __typename: "ChartHourlyPeriod",
    },
    y: 83,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 7,
      __typename: "ChartHourlyPeriod",
    },
    y: 100,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 8,
      __typename: "ChartHourlyPeriod",
    },
    y: 95,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 9,
      __typename: "ChartHourlyPeriod",
    },
    y: 97,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 10,
      __typename: "ChartHourlyPeriod",
    },
    y: 104,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 11,
      __typename: "ChartHourlyPeriod",
    },
    y: 151,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 12,
      __typename: "ChartHourlyPeriod",
    },
    y: 111,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 13,
      __typename: "ChartHourlyPeriod",
    },
    y: 80,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 14,
      __typename: "ChartHourlyPeriod",
    },
    y: 89,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 15,
      __typename: "ChartHourlyPeriod",
    },
    y: 80,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 16,
      __typename: "ChartHourlyPeriod",
    },
    y: 104,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 17,
      __typename: "ChartHourlyPeriod",
    },
    y: 91,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 18,
      __typename: "ChartHourlyPeriod",
    },
    y: 70,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 19,
      __typename: "ChartHourlyPeriod",
    },
    y: 119,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 20,
      __typename: "ChartHourlyPeriod",
    },
    y: 105,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 21,
      __typename: "ChartHourlyPeriod",
    },
    y: 124,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 22,
      __typename: "ChartHourlyPeriod",
    },
    y: 106,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 6,
      hour: 23,
      __typename: "ChartHourlyPeriod",
    },
    y: 103,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 0,
      __typename: "ChartHourlyPeriod",
    },
    y: 113,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 1,
      __typename: "ChartHourlyPeriod",
    },
    y: 87,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 2,
      __typename: "ChartHourlyPeriod",
    },
    y: 122,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 3,
      __typename: "ChartHourlyPeriod",
    },
    y: 133,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 4,
      __typename: "ChartHourlyPeriod",
    },
    y: 82,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 5,
      __typename: "ChartHourlyPeriod",
    },
    y: 102,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 6,
      __typename: "ChartHourlyPeriod",
    },
    y: 78,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 7,
      __typename: "ChartHourlyPeriod",
    },
    y: 90,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 8,
      __typename: "ChartHourlyPeriod",
    },
    y: 107,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 9,
      __typename: "ChartHourlyPeriod",
    },
    y: 151,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 10,
      __typename: "ChartHourlyPeriod",
    },
    y: 106,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 11,
      __typename: "ChartHourlyPeriod",
    },
    y: 124,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 12,
      __typename: "ChartHourlyPeriod",
    },
    y: 74,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 13,
      __typename: "ChartHourlyPeriod",
    },
    y: 107,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 14,
      __typename: "ChartHourlyPeriod",
    },
    y: 127,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 15,
      __typename: "ChartHourlyPeriod",
    },
    y: 118,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 16,
      __typename: "ChartHourlyPeriod",
    },
    y: 150,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 17,
      __typename: "ChartHourlyPeriod",
    },
    y: 156,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 18,
      __typename: "ChartHourlyPeriod",
    },
    y: 112,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 19,
      __typename: "ChartHourlyPeriod",
    },
    y: 129,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 20,
      __typename: "ChartHourlyPeriod",
    },
    y: 123,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 21,
      __typename: "ChartHourlyPeriod",
    },
    y: 104,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 22,
      __typename: "ChartHourlyPeriod",
    },
    y: 119,
    __typename: "ChartPoint",
  },
  {
    x: {
      day: 7,
      hour: 23,
      __typename: "ChartHourlyPeriod",
    },
    y: 91,
    __typename: "ChartPoint",
  },
];
