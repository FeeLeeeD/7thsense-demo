import React, { useLayoutEffect } from "react";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import { data } from "~data/charts/audience-reach-by-engagement-type-numbers";
import { Box } from "@chakra-ui/react";

const chartId = "audience-reach-by-engagement-numbers";

const types = Object.keys(data[0]).filter((k) => k !== "date");

const color = new Map([
  ["total", "#8bc1f7"],
  ["people", "#bde2b9"],
  ["opened", "#87ccb1"],
  ["clicked", "#508589"],
]);

const label = new Map([
  ["total", "Total sent"],
  ["people", "Unique contacts sent"],
  ["opened", "Unique contacts opened"],
  ["clicked", "Unique contacts clicked"],
]);

export const AudienceReachByEngagementNumbers = () => {
  useLayoutEffect(() => {
    const root = am5.Root.new(chartId);
    root.setThemes([
      am5themes_Responsive.new(root),
      am5themes_Animated.new(root),
    ]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        wheelX: "panX",
        wheelY: "none",
        paddingLeft: 0,
        paddingTop: 0,
        layout: root.verticalLayout,
      })
    );

    /* Scrollbar */

    const scrollbar = am5xy.XYChartScrollbar.new(root, {
      orientation: "horizontal",
      height: 20,
      marginBottom: 16,
    });

    chart.set("scrollbarX", scrollbar);

    var sbxAxis = scrollbar.chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        groupData: true,
        groupIntervals: [{ timeUnit: "month", count: 1 }],
        baseInterval: { timeUnit: "day", count: 1 },
        dateFormats: {
          month: "MMM",
        },
        periodChangeDateFormats: {
          month: "MMM YYYY",
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minGridDistance: 60,
          opposite: false,
        }),
      })
    );

    var sbyAxis = scrollbar.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    var sbseries = scrollbar.chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: sbxAxis,
        yAxis: sbyAxis,
        valueXField: "date",
      })
    );

    sbseries.data.processor = am5.DataProcessor.new(root, {
      dateFields: ["date"],
      dateFormat: "yyyy-MM-dd",
    });

    sbseries.data.setAll(data);

    /* Cursor */

    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "zoomX" })
    );
    cursor.lineY.set("visible", false);

    const legend = chart.children.push(
      am5.Legend.new(root, {
        x: am5.p50,
        centerX: am5.p50,
      })
    );

    legend.setAll({ paddingLeft: 20, paddingBottom: 16 });
    legend.labels.template.setAll({
      fontSize: 12,
    });

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.01,
        markUnitChange: true,
        groupData: true,
        groupCount: 61,
        groupIntervals: [
          {
            timeUnit: "day",
            count: 1,
          },
          {
            timeUnit: "month",
            count: 1,
          },
        ],
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          cellStartLocation: 0.1,
          cellEndLocation: 0.9,
          minorGridEnabled: true,
          minGridDistance: 50,
        }),
        dateFormats: {
          day: "d MMM",
          week: "d",
          month: "MMMM",
        },
        periodChangeDateFormats: {
          day: "MMM",
          week: "MMM",
          month: "MMM YYYY",
        },
        tooltipDateFormats: {
          day: "d MMMM yyyy",
          month: "MMMM yyyy",
        },
        tooltip: am5.Tooltip.new(root, {}),
        paddingTop: 4,
        paddingBottom: 16,
        minZoomCount: 20,
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      fontSize: 12,
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    /* Series */
    types.forEach((type) => {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: label.get(type),
          xAxis,
          yAxis,
          valueYField: type,
          valueXField: "date",
          valueYGrouped: "sum",
          tooltip: am5.Tooltip.new(root, {
            labelText: "[fontSize: 14px]{name}: [bold, fontSize: 14px]{valueY}",
          }),
        })
      );

      series.columns.template.setAll({
        cornerRadiusTL: 4,
        cornerRadiusTR: 4,
      });

      series.setAll({
        stroke: am5.color(color.get(type) ?? "#000"),
        fill: am5.color(color.get(type) ?? "#000"),
      });

      series.data.processor = am5.DataProcessor.new(root, {
        dateFields: ["date"],
        dateFormat: "yyyy-MM-dd",
      });

      series.data.setAll(data);

      series.appear(1000);
    });

    legend.data.setAll(chart.series.values);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <Box id={chartId} pos="relative" w="full" h="400px" />;
};
