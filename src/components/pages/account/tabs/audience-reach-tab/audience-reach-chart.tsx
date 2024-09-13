import React, { useLayoutEffect, useRef } from "react";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import { Box, Text } from "@chakra-ui/react";

type AudienceReachChartProps = {
  value: number;
  ranges: {
    min: number;
    max: number;
    color: string;
  }[];
  isClickReact?: boolean;
};

export const AudienceReachChart = ({
  value,
  ranges,
  isClickReact,
}: AudienceReachChartProps) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = am5.Root.new(boxRef.current ?? "gauge-chart");
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        startAngle: -180,
        endAngle: 0,
      })
    );

    const axisRenderer = am5radar.AxisRendererCircular.new(root, {
      radius: am5.percent(100),
      minGridDistance: isClickReact ? 30 : 35,
      dy: 5,
    });

    axisRenderer.labels.template.setAll({
      fill: am5.color("#000"),
      fontSize: "12px",
      textType: "adjusted",
    });

    axisRenderer.labels.template.adapters.add("text", (text) => {
      return text ? `${text}%` : text;
    });

    axisRenderer.grid.template.setAll({
      visible: false,
    });

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        max: isClickReact ? 25 : 100,
        strictMinMax: true,
        renderer: axisRenderer,
      })
    );

    ranges.forEach((range) => {
      const rangeDataItem = xAxis.makeDataItem({
        value: range.min,
        endValue: range.max,
      });

      xAxis.createAxisRange(rangeDataItem);

      rangeDataItem.get("axisFill")?.setAll({
        fill: am5.Color.fromAny(range.color),
        fillOpacity: 1,
        width: 40,
        height: 40,
        visible: true,
        innerRadius: -30,
        cornerRadius: 2.5,
      } as am5.IGraphicsSettings & { innerRadius: number });
    });

    const handDataItem = xAxis.makeDataItem({ value: 0 });

    const clockHand = am5radar.ClockHand.new(root, {
      radius: am5.percent(100),
      bottomWidth: 20,
    });

    clockHand.pin.setAll({
      fill: am5.color("#343A40"),
    });

    clockHand.hand.setAll({
      fill: am5.color("#343A40"),
    });

    handDataItem.set(
      "bullet",
      am5xy.AxisBullet.new(root, {
        sprite: clockHand,
      })
    );

    xAxis.createAxisRange(handDataItem);

    handDataItem.animate({
      key: "value",
      to: value,
      duration: 800,
      easing: am5.ease.out(am5.ease.cubic),
    });

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <Box pos="relative">
      <Box ref={boxRef} w="full" h="200px" />
      <Text pos="absolute" left="0" top="0" fontWeight="semibold" opacity={0.8}>
        {value}%
      </Text>
    </Box>
  );
};
