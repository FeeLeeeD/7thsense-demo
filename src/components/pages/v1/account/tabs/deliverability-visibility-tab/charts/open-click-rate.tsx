import React, { useLayoutEffect, useRef, useState } from "react";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import { Box, Select } from "@chakra-ui/react";
import { chartColor } from "~components/charts/shared";

const chartId = "open-click-rate";
export const OpenClickRateChart = () => {
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

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    /* Series */
    setSeries();
    function setSeries() {
      [
        {
          name: "GSuite",
          color: chartColor.provider.gSuite,
          data: [
            { date: new Date(2024, 1, 0, 0, 0, 0, 0).getTime(), openRate: 8 },
            { date: new Date(2024, 2, 0, 0, 0, 0, 0).getTime(), openRate: 14 },
            { date: new Date(2024, 3, 0, 0, 0, 0, 0).getTime(), openRate: 16 },
            { date: new Date(2024, 4, 0, 0, 0, 0, 0).getTime(), openRate: 20 },
            { date: new Date(2024, 5, 0, 0, 0, 0, 0).getTime(), openRate: 32 },
            { date: new Date(2024, 6, 0, 0, 0, 0, 0).getTime(), openRate: 44 },
            { date: new Date(2024, 7, 0, 0, 0, 0, 0).getTime(), openRate: 38 },
            { date: new Date(2024, 8, 0, 0, 0, 0, 0).getTime(), openRate: 49 },
          ],
        },
        {
          name: "Microsoft 365",
          color: chartColor.provider.microsoft365,
          data: [
            { date: new Date(2024, 1, 0, 0, 0, 0, 0).getTime(), openRate: 12 },
            { date: new Date(2024, 2, 0, 0, 0, 0, 0).getTime(), openRate: 16 },
            { date: new Date(2024, 3, 0, 0, 0, 0, 0).getTime(), openRate: 20 },
            { date: new Date(2024, 4, 0, 0, 0, 0, 0).getTime(), openRate: 29 },
            { date: new Date(2024, 5, 0, 0, 0, 0, 0).getTime(), openRate: 40 },
            { date: new Date(2024, 6, 0, 0, 0, 0, 0).getTime(), openRate: 38 },
            { date: new Date(2024, 7, 0, 0, 0, 0, 0).getTime(), openRate: 44 },
            { date: new Date(2024, 8, 0, 0, 0, 0, 0).getTime(), openRate: 54 },
          ],
        },
        {
          name: "Gmail",
          color: chartColor.provider.gmail,
          data: [
            { date: new Date(2024, 1, 0, 0, 0, 0, 0).getTime(), openRate: 15 },
            { date: new Date(2024, 2, 0, 0, 0, 0, 0).getTime(), openRate: 26 },
            { date: new Date(2024, 3, 0, 0, 0, 0, 0).getTime(), openRate: 32 },
            { date: new Date(2024, 4, 0, 0, 0, 0, 0).getTime(), openRate: 40 },
            { date: new Date(2024, 5, 0, 0, 0, 0, 0).getTime(), openRate: 44 },
            { date: new Date(2024, 6, 0, 0, 0, 0, 0).getTime(), openRate: 40 },
            { date: new Date(2024, 7, 0, 0, 0, 0, 0).getTime(), openRate: 56 },
            { date: new Date(2024, 8, 0, 0, 0, 0, 0).getTime(), openRate: 60 },
          ],
        },
        {
          name: "Overall",
          color: "#000",
          data: [
            { date: new Date(2024, 1, 0, 0, 0, 0, 0).getTime(), openRate: 12 },
            { date: new Date(2024, 2, 0, 0, 0, 0, 0).getTime(), openRate: 19 },
            { date: new Date(2024, 3, 0, 0, 0, 0, 0).getTime(), openRate: 23 },
            { date: new Date(2024, 4, 0, 0, 0, 0, 0).getTime(), openRate: 30 },
            { date: new Date(2024, 5, 0, 0, 0, 0, 0).getTime(), openRate: 39 },
            { date: new Date(2024, 6, 0, 0, 0, 0, 0).getTime(), openRate: 41 },
            { date: new Date(2024, 7, 0, 0, 0, 0, 0).getTime(), openRate: 46 },
            { date: new Date(2024, 8, 0, 0, 0, 0, 0).getTime(), openRate: 54 },
          ],
        },
      ].forEach((seriesData) => {
        const series = chart.series.push(
          am5xy.LineSeries.new(root, {
            name: seriesData.name,
            xAxis,
            yAxis,
            valueYField: "openRate",
            valueXField: "date",
            tooltip: am5.Tooltip.new(root, {
              labelText:
                "[fontSize: 14px]{name}: [bold, fontSize: 14px]{valueY}%",
            }),
          })
        );

        series.setAll({
          stroke: am5.color(seriesData.color),
          fill: am5.color(seriesData.color),
        });

        if (seriesData.name === "Overall") {
          series.strokes.template.setAll({ strokeWidth: 4 });
        } else {
          series.strokes.template.setAll({ strokeWidth: 2 });
        }

        series.bullets.push(function () {
          var bulletCircle = am5.Circle.new(root, {
            radius: 4,
            fill: series.get("fill"),
          });
          return am5.Bullet.new(root, {
            sprite: bulletCircle,
          });
        });

        series.data.setAll(seriesData.data);
        series.appear(1000);
      });
    }

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        y: 272,
      })
    );
    legend.labels.template.setAll({ fontSize: 14 });
    legend.data.setAll(chart.series.values);

    chart.appear(1000, 100);

    createRange(0, 14, "#F93232", true);
    createRange(14, 24, "#FFB82E", true);

    function createRange(
      lower: number,
      upper: number,
      color: string,
      dashed?: boolean
    ) {
      var rangeDataItem = yAxis.makeDataItem({
        value: lower,
        endValue: upper,
      });

      var range = yAxis.createAxisRange(rangeDataItem);

      if (upper) {
        range.get("axisFill")?.setAll({
          fill: am5.color(color),
          fillOpacity: 0.1,
          visible: true,
        });
      } else {
        range.get("grid")?.setAll({
          stroke: am5.color(color),
          strokeOpacity: 1,
          strokeWidth: 2,
          location: 1,
        });

        if (dashed) {
          range.get("grid")?.set("strokeDasharray", [5, 3]);
        }
      }
    }

    return () => {
      root.dispose();
    };
  }, []);

  return <Box id={chartId} pos="relative" w="full" h="300px" />;
};
