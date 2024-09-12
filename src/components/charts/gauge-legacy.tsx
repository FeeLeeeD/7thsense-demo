import React, { useEffect, useRef } from "react";
import { IGraphicsSettings } from "@amcharts/amcharts5/.internal/core/render/Graphics";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import { useColorMode, Box, BoxProps } from "@chakra-ui/react";

export type AxisRange = {
  min: number;
  max: number;
  color: string;
};

type GaugeGraphProps = {
  handPosition: number | undefined;
  ranges: AxisRange[];
  xAxisSettings?: Omit<
    am5xy.IValueAxisSettings<am5xy.AxisRenderer>,
    "renderer"
  >;
  axisRendererSettings?: am5radar.IAxisRendererCircularSettings;
} & BoxProps;

const GaugeGraph = ({
  handPosition = 0,
  ranges,
  xAxisSettings,
  axisRendererSettings,
  ...boxProps
}: GaugeGraphProps) => {
  const { colorMode } = useColorMode();
  const graphRef = useRef<HTMLDivElement>(null);
  const handDataItem = useRef<am5.DataItem<am5xy.IValueAxisDataItem>>();

  useEffect(() => {
    const root = am5.Root.new(graphRef.current ?? "gauge");
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      startAngle: -180,
      endAngle: 0,
    });
    root.container.children.push(chart);

    const axisRenderer = am5radar.AxisRendererCircular.new(root, {
      radius: am5.percent(100),
      minGridDistance: 35,
      dy: 5,
      ...axisRendererSettings,
    });

    axisRenderer.labels.template.setAll({
      fill: am5.Color.fromString(colorMode === "light" ? "#000" : "#fff"),
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
        max: 100,
        strictMinMax: true,
        renderer: axisRenderer,
        ...xAxisSettings,
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
      } as IGraphicsSettings & { innerRadius: number });
    });

    handDataItem.current = xAxis.makeDataItem({
      value: handPosition,
    });

    const hand = handDataItem.current.set(
      "bullet",
      am5xy.AxisBullet.new(root, {
        sprite: am5radar.ClockHand.new(root, {
          radius: am5.percent(100),
          bottomWidth: 20,
        }),
      })
    );

    type HandGetSpriteType = am5.Sprite &
      Record<string, { setAll: (value: Record<string, unknown>) => void }>;

    (hand.get("sprite") as HandGetSpriteType)?.pin.setAll({
      fill: am5.color(colorMode === "light" ? "#000" : "#fff"),
    });

    (hand.get("sprite") as HandGetSpriteType)?.hand.setAll({
      fill: am5.color(colorMode === "light" ? "#000" : "#fff"),
      fillOpacity: 0.5,
    });

    xAxis.createAxisRange(handDataItem.current);

    return () => {
      root.dispose();
    };
  }, [colorMode, ranges, xAxisSettings, axisRendererSettings]);

  useEffect(() => {
    if (handDataItem.current) {
      handDataItem.current.animate({
        key: "value",
        to: handPosition,
        duration: 800,
        easing: am5.ease.out(am5.ease.cubic),
      });
    }
  }, [handPosition]);

  return <Box ref={graphRef} w="100%" h="200px" {...boxProps} />;
};

export default GaugeGraph;
