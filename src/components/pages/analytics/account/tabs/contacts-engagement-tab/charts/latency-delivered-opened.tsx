import React, { useLayoutEffect, useRef } from "react";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import { Box } from "@chakra-ui/react";
import { chartColor } from "~data/shared";

const chartId = "latency-delivered-opened";

export const LatencyDeliveredOpenedChart = () => {
  const chartRef = useRef<am5xy.XYChart>();

  useLayoutEffect(() => {
    const root = am5.Root.new(chartId);
    root.setThemes([
      am5themes_Responsive.new(root),
      am5themes_Animated.new(root),
    ]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
      })
    );
    chartRef.current = chart;

    /* Labels */

    chart.plotContainer.children.push(
      am5.Label.new(root, {
        opacity: 0.8,
        text: "Before Seventh Sense",
        fontSize: 12,
        fill: am5.color(chartColor.dark),
        x: am5.p50,
        y: -26,
        centerX: am5.percent(101),
        centerY: am5.p0,
      })
    );

    chart.plotContainer.children.push(
      am5.Label.new(root, {
        text: "After Seventh Sense",
        fontSize: 12,
        fill: am5.color(chartColor.dark),
        x: am5.p50,
        y: -26,
        centerY: am5.p0,
      })
    );

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0,
        markUnitChange: false,
        baseInterval: {
          timeUnit: "month",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 10,
        }),
        dateFormats: {
          month: "MMM",
        },
        tooltip: am5.Tooltip.new(root, {}),
        paddingBottom: 12,
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      fontSize: 12,
    });

    const range = xAxis.createAxisRange(
      xAxis.makeDataItem({
        value: new Date("2024-05-01").getTime(),
      })
    );

    range.get("grid")?.setAll({
      stroke: am5.color("#000"),
      strokeWidth: 4,
      strokeDasharray: [4, 4],
    });

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 25,
        }),
      })
    );

    yAxis.get("renderer").labels.template.setAll({ fontSize: "12px" });

    yAxis.get("renderer").labels.template.adapters.add("text", (value) => {
      if (!value) return value;

      const numberValue = Number.parseInt(value);
      if (numberValue === 0) return `110 min`;

      return `${numberValue > 0 ? "+" : ""}${numberValue}%`;
    });

    yAxis
      .get("renderer")
      .labels.template.adapters.add("fontSize", (value, target) => {
        const text = target.text._getText();

        return text === "110 min" ? 16 : value;
      });
    yAxis
      .get("renderer")
      .labels.template.adapters.add("fontWeight", (value, target) => {
        const text = target.text._getText();

        return text === "110 min" ? "bold" : value;
      });

    var series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Latency",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "latency",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}%",
        }),
      })
    );

    series.columns.template.setAll({
      strokeOpacity: 0,
      cornerRadiusTL: 8,
      cornerRadiusTR: 8,
    });

    var data = [
      { date: "2023-11-01", latency: 17 },
      { date: "2023-12-01", latency: 6 },
      { date: "2024-01-01", latency: 14 },
      { date: "2024-02-01", latency: 18 },
      { date: "2024-03-01", latency: 4 },
      { date: "2024-04-01", latency: 9 },
      { date: "2024-05-01", latency: -3 },
      { date: "2024-06-01", latency: 2 },
      { date: "2024-07-01", latency: -5 },
      { date: "2024-08-01", latency: -9 },
      { date: "2024-09-01", latency: -14 },
      { date: "2024-10-01", latency: -10 },
    ];

    series.data.processor = am5.DataProcessor.new(root, {
      dateFields: ["date"],
      dateFormat: "yyyy-MM-dd",
    });

    series.data.setAll(data);

    series.columns.template.adapters.add("fill", (_, target) => {
      return (target.dataItem?.dataContext as { latency: number }).latency < 0
        ? am5.color("#9DDFA7")
        : am5.color("#FF9E99");
    });

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <Box id={chartId} w="full" h="300px" />;
};
