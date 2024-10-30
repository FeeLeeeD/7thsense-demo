import React, { useLayoutEffect } from "react";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import { Box, BoxProps } from "@chakra-ui/react";

const chartId = "audience-reach-by-engagement-v1";

export const AudienceReachByEngagementChart_v1 = () => {
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
        layout: root.verticalLayout,
      })
    );

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
        maxDeviation: 0,
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
        paddingTop: 4,
        paddingBottom: 16,
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      fontSize: 12,
    });

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
      [
        {
          name: "Total sent",
          color: "#D3D3D3",
          data: [
            { date: new Date(2023, 10, 0, 0, 0, 0, 0).getTime(), value: 689 },
            { date: new Date(2023, 11, 0, 0, 0, 0, 0).getTime(), value: 922 },
            { date: new Date(2024, 0, 0, 0, 0, 0, 0).getTime(), value: 940 },
            { date: new Date(2024, 1, 0, 0, 0, 0, 0).getTime(), value: 952 },
            { date: new Date(2024, 2, 0, 0, 0, 0, 0).getTime(), value: 744 },
            { date: new Date(2024, 3, 0, 0, 0, 0, 0).getTime(), value: 526 },
            { date: new Date(2024, 4, 0, 0, 0, 0, 0).getTime(), value: 919 },
            { date: new Date(2024, 5, 0, 0, 0, 0, 0).getTime(), value: 923 },
            { date: new Date(2024, 6, 0, 0, 0, 0, 0).getTime(), value: 944 },
            { date: new Date(2024, 7, 0, 0, 0, 0, 0).getTime(), value: 985 },
            { date: new Date(2024, 8, 0, 0, 0, 0, 0).getTime(), value: 1117 },
            { date: new Date(2024, 9, 0, 0, 0, 0, 0).getTime(), value: 1134 },
          ],
        },
        {
          name: "Unique contacts sent",
          color: "#6997F4",
          data: [
            { date: new Date(2023, 10, 0, 0, 0, 0, 0).getTime(), value: 599 },
            { date: new Date(2023, 11, 0, 0, 0, 0, 0).getTime(), value: 787 },
            { date: new Date(2024, 0, 0, 0, 0, 0, 0).getTime(), value: 842 },
            { date: new Date(2024, 1, 0, 0, 0, 0, 0).getTime(), value: 798 },
            { date: new Date(2024, 2, 0, 0, 0, 0, 0).getTime(), value: 642 },
            { date: new Date(2024, 3, 0, 0, 0, 0, 0).getTime(), value: 280 },
            { date: new Date(2024, 4, 0, 0, 0, 0, 0).getTime(), value: 830 },
            { date: new Date(2024, 5, 0, 0, 0, 0, 0).getTime(), value: 821 },
            { date: new Date(2024, 6, 0, 0, 0, 0, 0).getTime(), value: 888 },
            { date: new Date(2024, 7, 0, 0, 0, 0, 0).getTime(), value: 940 },
            { date: new Date(2024, 8, 0, 0, 0, 0, 0).getTime(), value: 981 },
            { date: new Date(2024, 9, 0, 0, 0, 0, 0).getTime(), value: 1054 },
          ],
        },
        {
          name: "Unique contacts opened",
          color: "#5ADA5A",
          data: [
            { date: new Date(2023, 10, 0, 0, 0, 0, 0).getTime(), value: 247 },
            { date: new Date(2023, 11, 0, 0, 0, 0, 0).getTime(), value: 346 },
            { date: new Date(2024, 0, 0, 0, 0, 0, 0).getTime(), value: 388 },
            { date: new Date(2024, 1, 0, 0, 0, 0, 0).getTime(), value: 396 },
            { date: new Date(2024, 2, 0, 0, 0, 0, 0).getTime(), value: 345 },
            { date: new Date(2024, 3, 0, 0, 0, 0, 0).getTime(), value: 147 },
            { date: new Date(2024, 4, 0, 0, 0, 0, 0).getTime(), value: 496 },
            { date: new Date(2024, 5, 0, 0, 0, 0, 0).getTime(), value: 401 },
            { date: new Date(2024, 6, 0, 0, 0, 0, 0).getTime(), value: 395 },
            { date: new Date(2024, 7, 0, 0, 0, 0, 0).getTime(), value: 479 },
            { date: new Date(2024, 8, 0, 0, 0, 0, 0).getTime(), value: 561 },
            { date: new Date(2024, 9, 0, 0, 0, 0, 0).getTime(), value: 607 },
          ],
        },
        {
          name: "Unique contacts clicked",
          color: "#008000",
          data: [
            { date: new Date(2023, 10, 0, 0, 0, 0, 0).getTime(), value: 41 },
            { date: new Date(2023, 11, 0, 0, 0, 0, 0).getTime(), value: 88 },
            { date: new Date(2024, 0, 0, 0, 0, 0, 0).getTime(), value: 91 },
            { date: new Date(2024, 1, 0, 0, 0, 0, 0).getTime(), value: 89 },
            { date: new Date(2024, 2, 0, 0, 0, 0, 0).getTime(), value: 75 },
            { date: new Date(2024, 3, 0, 0, 0, 0, 0).getTime(), value: 45 },
            { date: new Date(2024, 4, 0, 0, 0, 0, 0).getTime(), value: 134 },
            { date: new Date(2024, 5, 0, 0, 0, 0, 0).getTime(), value: 104 },
            { date: new Date(2024, 6, 0, 0, 0, 0, 0).getTime(), value: 95 },
            { date: new Date(2024, 7, 0, 0, 0, 0, 0).getTime(), value: 127 },
            { date: new Date(2024, 8, 0, 0, 0, 0, 0).getTime(), value: 149 },
            { date: new Date(2024, 9, 0, 0, 0, 0, 0).getTime(), value: 235 },
          ],
        },
      ].forEach((seriesData) => {
        const series = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: seriesData.name,
            xAxis,
            yAxis,
            valueYField: "value",
            valueXField: "date",
            tooltip: am5.Tooltip.new(root, {
              labelText:
                "[fontSize: 14px]{name}: [bold, fontSize: 14px]{valueY}",
            }),
          })
        );

        series.columns.template.setAll({
          cornerRadiusTL: 4,
          cornerRadiusTR: 4,
        });

        series.setAll({
          stroke: am5.color(seriesData.color),
          fill: am5.color(seriesData.color),
        });

        series.data.setAll(seriesData.data);

        series.appear(1000);
      });
    }

    legend.data.setAll(chart.series.values);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <Box id={chartId} pos="relative" w="full" h="400px" />;
};
