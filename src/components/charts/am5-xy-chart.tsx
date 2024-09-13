import React, { useEffect, useId, useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { Box, BoxProps, useColorMode } from "@chakra-ui/react";

type Am5xy = typeof am5xy;
type Am5 = typeof am5;
type AxisType = "CategoryAxis" | "CategoryDateAxis" | "DateAxis" | "ValueAxis";
type SeriesType =
  | "CandlestickSeries"
  | "OHLCSeries"
  | "ColumnSeries"
  | "LineSeries"
  | "SmoothedYLineSeries"
  | "SmoothedXLineSeries"
  | "SmoothedXYLineSeries"
  | "StepLineSeries";
type SettingsFunc<ReturnType = void, ExtraArgs = Record<string, unknown>> = (
  args: {
    root: am5.Root;
    am5: Am5;
    chart: am5xy.XYChart;
  } & ExtraArgs
) => ReturnType;

type Am5XYChartProps<
  TXAxisType extends AxisType,
  TYAxisType extends AxisType,
  TSeriesType extends SeriesType
> = {
  data: unknown[];
  chart?: {
    settings?: (args: { root: am5.Root }) => am5xy.IXYChartSettings;
    cursor?: {
      settings?: SettingsFunc<am5xy.IXYCursorSettings>;
      custom?: SettingsFunc<void, { cursor: am5xy.XYCursor }>;
    };
    legend?: {
      settings?: SettingsFunc<am5.ILegendSettings>;
      custom?: SettingsFunc<void, { legend: am5.Legend }>;
    };
  };
  xAxis: {
    type: TXAxisType;
    rendererSettings?: am5xy.IAxisRendererXSettings;
    settings?: SettingsFunc<
      Omit<InstanceType<Am5xy[TXAxisType]>["_settings"], "renderer">
    >;
  };
  yAxis: {
    type: TYAxisType;
    rendererSettings?: am5xy.IAxisRendererYSettings;
    settings?: SettingsFunc<
      Omit<InstanceType<Am5xy[TYAxisType]>["_settings"], "renderer">
    >;
  };
  series: {
    type: TSeriesType;
    settings: SettingsFunc<
      Omit<InstanceType<Am5xy[SeriesType]>["_settings"], "xAxis" | "yAxis">
    >;
  };
  customSettings?: (args: {
    am5: Am5;
    root: am5.Root;
    chart: am5xy.XYChart;
    series: InstanceType<Am5xy[TSeriesType]>;
    xAxis: InstanceType<Am5xy[TXAxisType]>;
    yAxis: InstanceType<Am5xy[TYAxisType]>;
  }) => void;
} & BoxProps;

export const Am5XYChart = <
  TXAxisType extends AxisType,
  TYAxisType extends AxisType,
  TSeriesType extends SeriesType
>({
  data,
  chart: getChart,
  xAxis: get_xAxis,
  yAxis: get_yAxis,
  series: getSeries,
  customSettings,
  ...boxProps
}: Am5XYChartProps<TXAxisType, TYAxisType, TSeriesType>) => {
  const chartId = useId();
  const { colorMode } = useColorMode();

  const chartRef = useRef<am5xy.XYChart>();
  const cursorRef = useRef<am5xy.XYCursor>();
  const legendRef = useRef<am5.Legend>();
  const xRendererRef = useRef<am5xy.AxisRendererX>();
  const yRendererRef = useRef<am5xy.AxisRendererY>();
  const xAxisRef = useRef<InstanceType<Am5xy[TXAxisType]>>();
  const yAxisRef = useRef<InstanceType<Am5xy[TYAxisType]>>();
  const seriesRef = useRef<InstanceType<Am5xy[TSeriesType]>>();

  useLayoutEffect(() => {
    /* Root element */
    const root = am5.Root.new(chartId);

    /* Themes */
    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Responsive.new(root),
    ]);

    /* Chart */
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        ...(getChart?.settings ? getChart?.settings({ root }) : {}),
      })
    );
    chartRef.current = chart;

    /* Axes */
    const xRenderer = am5xy.AxisRendererX.new(root, {
      ...get_xAxis.rendererSettings,
    });
    const xSettings = get_xAxis.settings
      ? get_xAxis.settings({ am5, root, chart })
      : {};
    const xAxis = chart.xAxes.push(
      am5xy[get_xAxis.type].new(root, {
        ...xSettings,
        renderer: xRenderer,
      })
    ) as InstanceType<Am5xy[TXAxisType]>;
    xRendererRef.current = xRenderer;
    xAxisRef.current = xAxis;

    const yRenderer = am5xy.AxisRendererY.new(root, {
      ...get_yAxis.rendererSettings,
    });
    const ySettings = get_yAxis.settings
      ? get_yAxis.settings({ am5, root, chart })
      : {};
    const yAxis = chart.yAxes.push(
      am5xy[get_yAxis.type].new(root, {
        ...ySettings,
        renderer: yRenderer,
      })
    ) as InstanceType<Am5xy[TYAxisType]>;
    yRendererRef.current = yRenderer;
    yAxisRef.current = yAxis;

    /* Series */
    const series = chart.series.push(
      am5xy[getSeries.type].new(root, {
        ...getSeries.settings({ root, am5, chart }),
        xAxis,
        yAxis,
      })
    ) as InstanceType<Am5xy[TSeriesType]>;
    seriesRef.current = series;

    /* Legend */
    if (getChart?.legend) {
      const legend = chart.children.push(
        am5.Legend.new(root, {
          ...(getChart.legend.settings
            ? getChart.legend.settings({ root, am5, chart })
            : {}),
        })
      );
      getChart.legend.custom &&
        getChart.legend.custom({ root, am5, chart, legend });
      legendRef.current = legend;
    }

    /* Cursor */
    if (getChart?.cursor) {
      const cursor = chart.set(
        "cursor",
        am5xy.XYCursor.new(root, {
          ...(getChart.cursor.settings
            ? getChart.cursor.settings({ root, am5, chart })
            : {}),
        })
      );
      getChart.cursor.custom &&
        getChart.cursor.custom({ root, am5, chart, cursor });
      cursorRef.current = cursor;
    }

    if (customSettings)
      customSettings({ am5, root, series, chart, xAxis, yAxis });

    /* Animation on load */
    chart.appear(250);

    return () => {
      root.dispose();
    };
  }, []);

  useEffect(() => {
    if (xAxisRef.current?.isType("CategoryAxis")) {
      xAxisRef.current?.data.setAll(data);
    }

    seriesRef.current?.data.setAll(data);
    seriesRef.current?.appear(500);
  }, [data]);

  useEffect(() => {
    xRendererRef.current?.labels.template.setAll({
      fill: am5.color(colorMode === "light" ? "#000" : "#fff"),
    });
    xRendererRef.current?.grid.template?.setAll({
      stroke: am5.color(colorMode === "light" ? "#000" : "#fff"),
    });

    yRendererRef.current?.labels.template.setAll({
      fill: am5.color(colorMode === "light" ? "#000" : "#fff"),
    });
    yRendererRef.current?.grid.template?.setAll({
      stroke: am5.color(colorMode === "light" ? "#000" : "#fff"),
    });

    legendRef.current?.labels.template.setAll({
      fill: am5.color(colorMode === "light" ? "#000" : "#fff"),
    });

    cursorRef.current?.lineX.setAll({
      stroke: am5.color(colorMode === "light" ? "#000" : "#fff"),
    });
    cursorRef.current?.lineY.setAll({
      stroke: am5.color(colorMode === "light" ? "#000" : "#fff"),
    });
  }, [colorMode]);

  return <Box id={chartId} w="100%" h="400px" {...boxProps} />;
};
