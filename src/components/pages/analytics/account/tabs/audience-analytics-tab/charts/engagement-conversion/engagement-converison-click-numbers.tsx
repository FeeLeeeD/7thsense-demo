import React, { useLayoutEffect } from "react";
import { data } from "~data/charts/engagement-conversion-click-numbers";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import { Box } from "@chakra-ui/react";

const chartId = "engagement-conversion-click-numbers";

const emails = Object.keys(data[0]).filter((k) => k !== "date");

export const EngagementConversionClickNumbersChart = () => {
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
        pinchZoomX: true,
        paddingLeft: 0,
        layout: root.verticalLayout,
      })
    );

    /* Cursor */

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    /* X Axis */

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.01,
        markUnitChange: true,
        baseInterval: {
          timeUnit: "month",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 40,
        }),
        dateFormats: {
          month: "MMMM",
        },
        periodChangeDateFormats: {
          month: "MMM YYYY",
        },
        tooltipDateFormats: {
          month: "MMMM yyyy",
        },

        paddingBottom: 16,
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      fontSize: 12,
    });

    /* Y Axis */

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    /* Series */

    emails.forEach((email) => {
      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: email.split("-").join(" "),
          xAxis,
          yAxis,
          valueYField: email,
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "left",
            labelText: "[fontSize: 12px]{name}: [bold, fontSize: 12px]{valueY}",
          }),
        })
      );

      series.setAll({
        stroke: am5.color(
          {
            "1-email": "#8dc2f7",
            "2-emails": "#98b8f6",
            "3-emails": "#a5acf2",
            "4-emails": "#b4a0e9",
            "5-emails": "#c293db",
            "6-emails": "#ce86ca",
            "7-emails": "#d779b4",
            "8-emails": "#db6e9c",
            "9-emails": "#db6682",
            "10-emails": "#d66167",
          }[email] ?? ""
        ),
      });

      series.strokes.template.setAll({
        strokeWidth: 2,
      });

      series.bullets.push(function () {
        var bulletCircle = am5.Circle.new(root, {
          radius: 4,
          fill: series.get("fill"),
        });
        return am5.Bullet.new(root, {
          sprite: bulletCircle,
        });
      });

      series.data.processor = am5.DataProcessor.new(root, {
        dateFields: ["date"],
        dateFormat: "yyyy-MM-dd",
      });

      series.data.setAll(data);
      series.appear(1000);
    });

    /* Legend  */

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );
    legend.labels.template.setAll({ fontSize: 14 });
    legend.data.setAll(chart.series.values);

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <Box id={chartId} pos="relative" w="full" h="440px" />;
};
