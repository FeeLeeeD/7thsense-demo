import React, { useLayoutEffect } from "react";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import { Box, Select } from "@chakra-ui/react";
import { sendVolumeData } from "./data/send-volume";

const chartId = "send-volume";

export const SendVolumeChart = () => {
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
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minGridDistance: 40,
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

    /* Cursor */

    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "zoomX" })
    );
    cursor.lineY.set("visible", false);

    /* X Axis */

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
          month: "MMM",
        },
        tooltipDateFormats: {
          day: "d MMMM yyyy",
          month: "MMMM yyyy",
        },
        tooltip: am5.Tooltip.new(root, {}),
        paddingBottom: 16,
        minZoomCount: 31,
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      fontSize: 12,
    });

    /* Y Axis */

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        strictMinMax: true,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    /* Series */

    setSeries();
    function setSeries() {
      sendVolumeData.forEach((seriesData) => {
        const series = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: seriesData.name,
            xAxis,
            yAxis,
            stacked: true,
            valueYField: "sendVolume",
            valueXField: "date",
            valueYGrouped: "sum",
            tooltip: am5.Tooltip.new(root, {
              labelText:
                "[fontSize: 14px]{name}: [bold, fontSize: 14px]{valueY}",
            }),
          })
        );

        series.setAll({
          stroke: am5.color(seriesData.color),
          fill: am5.color(seriesData.color),
        });

        series.columns.template.setAll({
          cornerRadiusTL: 2,
          cornerRadiusTR: 2,
        });

        series.data.processor = am5.DataProcessor.new(root, {
          dateFields: ["date"],
          dateFormat: "yyyy-MM-dd",
        });

        series.data.setAll(seriesData.data);
        sbseries.data.setAll(seriesData.data);
        series.appear(1000);
      });
    }

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

  return <Box id={chartId} pos="relative" w="full" h="440px" />;
};
