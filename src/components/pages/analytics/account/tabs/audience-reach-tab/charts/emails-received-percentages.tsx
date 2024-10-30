import React, { useLayoutEffect } from "react";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import { data } from "~data/charts/emails-received-percentages";
import { Box } from "@chakra-ui/react";

const chartId = "emails-received-percentages";

const emails = Object.keys(data[0]).filter((k) => k !== "date");

const color = new Map([
  ["1-email", "#8BC1F7"],
  ["2-emails", "#98B1DF"],
  ["3-emails", "#A4A1C7"],
  ["4-emails", "#B192AF"],
  ["5-emails", "#BE8297"],
  ["6-emails", "#CA727F"],
  ["7-emails", "#D76267"],
]);

export const EmailsReceivedPercentages = () => {
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
        layout: root.verticalLayout,
      })
    );

    /* Cursor */

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
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
        baseInterval: {
          timeUnit: "month",
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
        paddingBottom: 16,
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      fontSize: 12,
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        max: 100,
        numberFormat: `0 '%'`,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    /* Series */
    emails.forEach((email) => {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: email.split("-").join(" "),
          xAxis,
          yAxis,
          stacked: true,
          valueYField: email,
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
            labelText:
              "[fontSize: 14px]{name}: [bold, fontSize: 14px]{valueY}%",
          }),
        })
      );

      series.columns.template.setAll({
        width: am5.percent(90),
      });

      series.setAll({
        stroke: am5.color(color.get(email) ?? "#000"),
        fill: am5.color(color.get(email) ?? "#000"),
      });

      series.data.processor = am5.DataProcessor.new(root, {
        dateFields: ["date"],
        dateFormat: "yyyy-MM-dd",
      });

      series.data.setAll(data);

      series.appear(0);
    });

    legend.data.setAll(chart.series.values);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <Box id={chartId} pos="relative" w="full" h="400px" />;
};
