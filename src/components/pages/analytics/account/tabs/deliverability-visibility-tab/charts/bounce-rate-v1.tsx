import React, { useLayoutEffect, useRef } from "react";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import { Box } from "@chakra-ui/react";
import { data } from "~data/charts/bounce-rate-v1";
import { chartColor, Provider, providerLabel } from "~data/shared";

const chartId = "bounce-rate-v1";

export const BounceRateV1Chart = () => {
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
        max: 1,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    /* Series */
    setSeries();
    function setSeries() {
      data.forEach((seriesData) => {
        const series = chart.series.push(
          am5xy.LineSeries.new(root, {
            name: providerLabel(seriesData.provider),
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
          stroke: am5.color(chartColor.provider[seriesData.provider]),
          fill: am5.color(chartColor.provider[seriesData.provider]),
        });

        if (seriesData.provider === Provider.Overall) {
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

    createRange(0, 0.25, "#25B160", true);

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
