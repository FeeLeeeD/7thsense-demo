import React, { useId, useLayoutEffect, useRef, useState } from "react";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import { Box } from "@chakra-ui/react";

const chartId = "latency-first-hour";

export const LatencyFirstHour = () => {
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
          month: "MMMM",
        },
        tooltip: am5.Tooltip.new(root, {}),
        paddingBottom: 32,
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      fontSize: 12,
    });

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    var series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Latency",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}%",
        }),
      })
    );

    series.columns.template.setAll({
      fill: am5.color("#6699FF"),
      strokeOpacity: 0,
      cornerRadiusTL: 8,
      cornerRadiusTR: 8,
    });

    var data = [
      { date: new Date(2024, 1, 0, 0, 0, 0, 0).getTime(), value: -2 },
      { date: new Date(2024, 2, 0, 0, 0, 0, 0).getTime(), value: -11 },
      { date: new Date(2024, 3, 0, 0, 0, 0, 0).getTime(), value: -8 },
      { date: new Date(2024, 4, 0, 0, 0, 0, 0).getTime(), value: -4 },
      { date: new Date(2024, 5, 0, 0, 0, 0, 0).getTime(), value: 2 },
      { date: new Date(2024, 6, 0, 0, 0, 0, 0).getTime(), value: 7 },
      { date: new Date(2024, 7, 0, 0, 0, 0, 0).getTime(), value: 14 },
      { date: new Date(2024, 8, 0, 0, 0, 0, 0).getTime(), value: 21 },
    ];
    series.data.setAll(data);

    series.columns.template.adapters.add("fill", (_, target) => {
      return (target.dataItem?.dataContext as { value: number }).value > 0
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
