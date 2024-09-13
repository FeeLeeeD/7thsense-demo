import React, { useCallback, useEffect, useRef } from "react";
import { AxisRenderer } from "@amcharts/amcharts5/.internal/charts/xy/axes/AxisRenderer";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import { useColorMode, Box, BoxProps } from "@chakra-ui/react";

export type XYRange = {
  label: string;
  color: string;
  data: Array<{ date: Date; value: number | undefined }>;
};

export type XYProps = {
  stacked?: boolean;
  series: Array<XYRange>;
  showLegend?: boolean;
  showHorizontalScrollBar?: boolean;
  notAnimated?: boolean;
  hideYAxisLabels?: boolean;
  xAxisSettings?: Omit<
    am5xy.IDateAxisSettings<AxisRenderer>,
    "baseInterval" | "renderer"
  > & {
    baseInterval?: {
      timeUnit?: am5.time.TimeUnit;
      count?: number;
    };
    renderer?: am5xy.IAxisRendererXSettings;
  };
  columnSeries?: Omit<am5xy.IColumnSeriesSettings, "xAxis" | "yAxis">;
  scrollBarSettings?: Omit<am5.IScrollbarSettings, "orientation">;
} & BoxProps;

const XY = ({
  stacked,
  series,
  showLegend,
  showHorizontalScrollBar,
  notAnimated,
  hideYAxisLabels,
  xAxisSettings: xAxisCustomSettings,
  columnSeries,
  scrollBarSettings,
  ...boxProps
}: XYProps) => {
  const { colorMode } = useColorMode();
  const graphRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<am5.Root>();
  const chartRef = useRef<am5xy.XYChart>();
  const xAxisRef = useRef<am5xy.DateAxis<AxisRenderer>>();
  const yAxisRef = useRef<am5xy.ValueAxis<AxisRenderer>>();
  const scrollBarRef = useRef<am5.Scrollbar>();
  const legendRef = useRef<am5.Legend>();

  useEffect(() => {
    const root = am5.Root.new(graphRef.current ?? "chartdiv");
    rootRef.current = root;

    // Setting theme
    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Responsive.new(root),
    ]);

    // Creating chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        layout: root.verticalLayout,
        panX: false,
        panY: false,
        paddingLeft: 0,
        // wheelX: "panX"
        // wheelY: "zoomX"
      })
    );
    chartRef.current = chart;

    // Addding cursor
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomX",
      })
    );
    cursor.lineY.set("visible", false);

    // Creating axes
    let xAxisSettings: Omit<
      am5xy.IDateAxisSettings<AxisRenderer>,
      "renderer"
    > = {
      maxDeviation: 0,
      baseInterval: {
        timeUnit: "hour",
        count: 1,
      },
      markUnitChange: false,
      dateFormats: {
        hour: "EEE h a",
        day: "MMM d, yyyy",
        month: "MMM yyyy",
        year: "yyyy",
      },
      tooltip: am5.Tooltip.new(root, {}),
      marginBottom: 12,
    };
    let rendererSettings: am5xy.IAxisRendererXSettings = {};
    if (xAxisCustomSettings) {
      const {
        renderer: customRenderer,
        baseInterval: customBaseInterval,
        dateFormats: customDateFormats,
        ...settings
      } = xAxisCustomSettings;
      rendererSettings = { ...customRenderer };
      xAxisSettings = {
        ...xAxisSettings,
        ...settings,
        dateFormats: { ...xAxisSettings.dateFormats, ...customDateFormats },
        baseInterval: { ...xAxisSettings.baseInterval, ...customBaseInterval },
      };
    }

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        ...xAxisSettings,
        renderer: am5xy.AxisRendererX.new(root, rendererSettings),
      })
    );
    xAxisRef.current = xAxis;

    const yRenderer = am5xy.AxisRendererY.new(root, {});
    if (hideYAxisLabels) yRenderer.labels.template.set("visible", false);
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: yRenderer,
      })
    );
    yAxisRef.current = yAxis;

    setAxisStyles();

    // Adding scrollbar
    if (showHorizontalScrollBar) {
      const scrollbarX = chart.set(
        "scrollbarX",
        am5.Scrollbar.new(root, {
          orientation: "horizontal",
          marginBottom: 40,
          ...scrollBarSettings,
        })
      );
      scrollBarRef.current = scrollbarX;
      setScrollBarStyles();
    }

    // Adding legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        x: am5.p50,
        centerX: am5.p50,
      })
    );
    legendRef.current = legend;
    setLegendStyles();
    legend.data.setAll(chart.series.values);

    chart.appear(notAnimated ? 0 : 1000, 100);

    return () => {
      root.dispose();
    };
  }, [JSON.stringify(xAxisCustomSettings)]);

  const seriesRef = useRef<{ label: string; series: am5xy.ColumnSeries }[]>([]);
  useEffect(() => {
    // Setting series
    series.forEach((range) => {
      const foundRange = seriesRef.current.find(
        (series) => series.label === range.label
      );

      if (!foundRange) {
        makeSeriesFrom(range, columnSeries);
      } else {
        foundRange.series.data.setAll(range.data);
      }
    });

    const rangesToRemove = seriesRef.current.filter(
      (range) => !series.some((r) => r.label === range.label)
    );
    rangesToRemove.forEach((range) => {
      const seriesIndex = chartRef.current?.series.indexOf(range.series);
      if (seriesIndex !== undefined && seriesIndex >= 0)
        chartRef.current?.series.removeIndex(seriesIndex);
      const legendIndex = legendRef.current?.data.indexOf(range.series);
      if (legendIndex !== undefined && legendIndex >= 0)
        legendRef.current?.data.removeIndex(legendIndex);
      const rangeToRemoveIndex = seriesRef.current.findIndex(
        (r) => r.label === range.label
      );
      if (rangeToRemoveIndex >= 0)
        seriesRef.current.splice(rangeToRemoveIndex, 1);
    });
  }, [JSON.stringify(series)]);

  useEffect(() => {
    setAxisStyles();
    setScrollBarStyles();
    setLegendStyles();
  }, [colorMode]);

  const makeSeriesFrom = useCallback(
    (
      range: XYRange,
      columnSeries?: Omit<am5xy.IColumnSeriesSettings, "xAxis" | "yAxis">
    ) => {
      if (
        !chartRef.current ||
        !rootRef.current ||
        !xAxisRef.current ||
        !yAxisRef.current ||
        !legendRef.current
      )
        return;

      const series = chartRef.current.series.push(
        am5xy.ColumnSeries.new(rootRef.current, {
          name: range.label,
          stacked: stacked,
          xAxis: xAxisRef.current,
          yAxis: yAxisRef.current,
          valueYField: "value",
          valueXField: "date",
          fill: am5.Color.fromAny(range.color),
          tooltip: am5.Tooltip.new(rootRef.current, {
            pointerOrientation: "right",
            labelText: "{name}:[/] [bold]{valueY.formatNumber('#')}",
            getStrokeFromSprite: true,
          }),
          ...columnSeries,
        })
      );

      series.columns.template.setAll({
        cornerRadiusTL: 2,
        cornerRadiusTR: 2,
      });

      seriesRef.current.push({ label: range.label, series });

      series.data.processor = am5.DataProcessor.new(rootRef.current, {
        dateFields: ["date"],
      });

      series.data.setAll(range.data);

      // Make stuff animate on load
      series.appear(notAnimated ? 0 : 500);
      if (showLegend) legendRef.current.data.push(series);
    },
    []
  );

  const setAxisStyles = useCallback(() => {
    if (xAxisRef.current && yAxisRef.current) {
      [xAxisRef.current, yAxisRef.current].forEach((axis, i) => {
        const isYAxis = i === 1;
        (axis as am5xy.ValueAxis<AxisRenderer>)
          .get("renderer")
          .labels.template.setAll({
            fill: am5.color(colorMode === "light" ? "#000" : "#fff"),
            fontSize: "12px",
            paddingTop: !isYAxis ? 12 : 0,
            paddingRight: isYAxis ? 12 : 0,
          });
        (axis as am5xy.ValueAxis<AxisRenderer>)
          .get("renderer")
          .grid.template.setAll({
            stroke: am5.color("#5C5C66"),
          });
      });
    }
  }, [colorMode]);

  const setScrollBarStyles = useCallback(() => {
    if (scrollBarRef.current && rootRef.current) {
      scrollBarRef.current.get("background")?.setAll({
        fill: am5.Color.fromAny(colorMode === "light" ? "#EBEDEF" : "#35353B"),
      });
      scrollBarRef.current.thumb.setAll({
        fill: am5.Color.fromAny(colorMode === "light" ? "#D3D7DB" : "#414148"),
      });
      [scrollBarRef.current.startGrip, scrollBarRef.current.endGrip].forEach(
        (grip) => {
          grip.setAll({
            background: am5.Circle.new(rootRef.current as am5.Root, {
              radius: 20,
              fill: am5.Color.fromAny(
                colorMode === "light" ? "#D3D7DB" : "#4D4D55"
              ),
              centerY: -14,
              centerX: -14,
            }),
          });
        }
      );
    }
  }, [colorMode]);

  const setLegendStyles = useCallback(() => {
    if (legendRef.current) {
      legendRef.current.labels.template.setAll({
        fill: am5.Color.fromAny(colorMode === "light" ? "#000" : "#fff"),
        fontSize: "12px",
      });
    }
  }, [colorMode]);

  return (
    <Box
      ref={graphRef}
      w="100%"
      h="400px"
      transition="height ease-in-out 0.5s"
      {...boxProps}
    />
  );
};

export default XY;
