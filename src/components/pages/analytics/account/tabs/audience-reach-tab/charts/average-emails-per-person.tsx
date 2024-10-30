import React, { useLayoutEffect } from "react";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import { Box } from "@chakra-ui/react";
import { data } from "~data/charts/average-emails-per-person";
import { chartColor } from "~data/shared";

const chartId = "average-emails-per-person";

export const AverageEmailsPerPerson = () => {
  useLayoutEffect(() => {
    const root = am5.Root.new(chartId);
    root.setThemes([
      am5themes_Responsive.new(root),
      am5themes_Animated.new(root),
    ]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        layout: root.verticalLayout,
        paddingLeft: 0,
        panX: false,
        panY: false,
        wheelY: "none",
      })
    );

    const xAxisRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 60,
      minorGridEnabled: true,
    });

    xAxisRenderer.labels.template.setAll({
      fontSize: 12,
    });

    var xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "month", count: 1 },
        periodChangeDateFormats: {
          month: "MMMM YYYY",
        },
        dateFormats: {
          month: "MMMM",
        },
        tooltipDateFormat: "MMMM YYYY",
        renderer: xAxisRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    /* Provider */

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "emails",
        xAxis: xAxis,
        yAxis: yAxis,
        stacked: true,
        valueYField: "avg_emails",
        valueXField: "date",
        stroke: undefined,
        tooltip: am5.Tooltip.new(root, {
          labelText: `{valueY} emails`,
        }),
      })
    );

    series.columns.template.setAll({
      fill: am5.color(chartColor.default),
    });

    series.columns.template.setAll({
      cornerRadiusTL: 8,
      cornerRadiusTR: 8,
    });

    series.data.processor = am5.DataProcessor.new(root, {
      dateFields: ["date"],
      dateFormat: "yyyy-MM-dd",
    });

    /* Cursor */

    chart.set("cursor", am5xy.XYCursor.new(root, {}));
    chart.get("cursor")?.lineY.set("visible", false);

    series.data.setAll(data);
    series.appear(1000);

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <Box id={chartId} w="full" h="300px" />;
};
