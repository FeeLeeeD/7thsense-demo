import React, { useLayoutEffect } from "react";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import { Box } from "@chakra-ui/react";
import { data } from "~data/charts/send-volume-delivery-rate";
import { chartColor, Provider, providerLabel } from "~data/shared";

const chartId = "send-volume-delivery-rate";

export const SendVolumeDeliveryRateChart = () => {
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
        baseInterval: { timeUnit: "day", count: 1 },
        periodChangeDateFormats: {
          day: "d MMM",
        },
        dateFormats: {
          day: "d MMM",
        },
        tooltipDateFormat: "d MMMM YYYY",
        renderer: xAxisRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    /* Legend */

    const legend = chart.children.push(
      am5.Legend.new(root, {
        x: am5.percent(50),
        centerX: am5.percent(50),
        layout: root.gridLayout,
        marginTop: 12,
      })
    );

    legend.itemContainers.template.setAll({
      marginLeft: 24,
    });

    legend.labels.template.setAll({
      fontSize: "14px",
    });

    /* Provider */

    const providerAxisRenderer = am5xy.AxisRendererY.new(root, {});
    providerAxisRenderer.grid.template.set("forceHidden", true);
    const providerAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: providerAxisRenderer,
      })
    );

    providerAxis.children.unshift(
      am5.Label.new(root, {
        text: "Marketing email sent",
        textAlign: "center",
        y: am5.p50,
        rotation: -90,
        opacity: 0.8,
        fontSize: 12,
      })
    );

    [
      Provider.GoogleWorkspace,
      Provider.Gmail,
      Provider.Microsoft365,
      Provider.VerizonAndCo,
      Provider.Other,
    ].forEach((provider) => {
      const providerTooltip = am5.Tooltip.new(root, {
        labelText: `[fontSize: 14px]${provider}: {valueY} emails`,
      });

      const providerSeries = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: providerLabel(provider),
          xAxis: xAxis,
          yAxis: providerAxis,
          stacked: true,
          valueYField: provider,
          valueXField: "date",
          stroke: undefined,
          tooltip: providerTooltip,
        })
      );

      providerSeries.columns.template.setAll({
        fill: am5.color(chartColor.provider[provider]),
      });

      providerSeries.columns.template.setAll({
        cornerRadiusTL: 2,
        cornerRadiusTR: 2,
      });

      providerSeries.data.processor = am5.DataProcessor.new(root, {
        dateFields: ["date"],
        dateFormat: "yyyy-MM-dd",
      });

      chart.set(
        "cursor",
        am5xy.XYCursor.new(root, {
          xAxis: xAxis,
          behavior: "selectX",
        })
      );

      providerSeries.data.setAll(data);
      legend.data.push(providerSeries);
      providerSeries.appear(1000);
    });

    /* Rates */

    var rateAxisRenderer = am5xy.AxisRendererY.new(root, {
      opposite: true,
    });

    rateAxisRenderer.labels.template.setAll({
      fill: am5.color(chartColor.dark),
      fontWeight: "bold",
    });

    var rateAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        numberFormat: "0'%'",
        renderer: rateAxisRenderer,
        strictMinMax: true,
        min: 0,
        max: 110,
      })
    );

    rateAxis.children.push(
      am5.Label.new(root, {
        text: "Marketing email delivered rate",
        textAlign: "center",
        fill: am5.color(chartColor.dark),
        y: am5.p50,
        rotation: 90,
        opacity: 0.8,
        fontSize: 12,
      })
    );

    var rateSeries = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: rateAxis,
        valueYField: "rate",
        valueXField: "date",
        stroke: am5.color(chartColor.dark),
        tooltip: am5.Tooltip.new(root, {
          getFillFromSprite: false,
          labelText: "[bold]Delivered rate: {valueY}%",
        }),
      })
    );

    rateSeries
      .get("tooltip")
      ?.get("background")
      ?.setAll({
        stroke: undefined,
        fill: am5.color("#fff"),
      });

    rateSeries.strokes.template.setAll({
      strokeWidth: 4,
    });

    rateSeries.bullets.push(function () {
      var graphics = am5.Circle.new(root, {
        radius: 4,
        centerX: am5.p50,
        centerY: am5.p50,
        fill: am5.color("#fff"),
        stroke: rateSeries.get("stroke"),
        strokeWidth: 2,
      });

      return am5.Bullet.new(root, {
        sprite: graphics,
      });
    });

    rateSeries.data.setAll(data);
    xAxis.data.setAll(data);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <Box id={chartId} w="full" h="400px" />;
};
