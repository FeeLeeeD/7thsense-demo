import React from "react";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import { Box, BoxProps, Text } from "@chakra-ui/react";
import GaugeGraph, { AxisRange } from "~components/charts/gauge-legacy";

const CHART: Record<
  "AudienceReach" | "ClickReach",
  {
    ranges: AxisRange[];
    getXAxisSettings?: (
      value: number | undefined
    ) => Omit<am5xy.IValueAxisSettings<am5xy.AxisRenderer>, "renderer">;
    getAxisRendererSettings?: (
      value: number | undefined
    ) => am5radar.IAxisRendererCircularSettings;
  }
> = {
  AudienceReach: {
    ranges: [
      { min: 0, max: 14, color: "#F93232" },
      { min: 15, max: 24, color: "#FFB82E" },
      { min: 25, max: 100, color: "#25B160" },
    ],
    getAxisRendererSettings: () => ({ minGridDistance: 35 }),
  },
  ClickReach: {
    ranges: [
      { min: 0, max: 1, color: "#F93232" },
      { min: 2, max: 4, color: "#FFB82E" },
      { min: 5, max: 100, color: "#25B160" },
    ],
    getAxisRendererSettings: (value) => ({
      minGridDistance: (value ?? 0) > 24 ? 35 : 30,
    }),
    getXAxisSettings: (value) => ({ max: (value ?? 0) > 24 ? 100 : 25 }),
  },
};

type AudienceReachChartProps = {
  name: "AudienceReach" | "ClickReach";
  value: number;
  title?: React.ReactNode;
  description?: React.ReactNode;
} & BoxProps;

export const AudienceReachChart = ({
  name,
  value,
  title,
  description,
  ...boxProps
}: AudienceReachChartProps) => {
  const getXAxisSettings = CHART[name].getXAxisSettings;
  const getAxisRendererSettings = CHART[name].getAxisRendererSettings;

  return (
    <Box pos="relative">
      <GaugeGraph
        height={boxProps.h || boxProps.height ? "100%" : undefined}
        handPosition={value}
        ranges={CHART[name].ranges}
        xAxisSettings={getXAxisSettings ? getXAxisSettings(value) : undefined}
        axisRendererSettings={
          getAxisRendererSettings ? getAxisRendererSettings(value) : undefined
        }
      />

      <Text
        pos="absolute"
        left="0"
        top="0"
        fontWeight="semibold"
        opacity={0.8}
      >
        {value}%
      </Text>
    </Box>
  );
};
