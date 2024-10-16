import React, { useLayoutEffect } from "react";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import { Box } from "@chakra-ui/react";
import { chartColor } from "~components/charts/shared";

const chartId = "send-volume-delivery-rate";

const data = [
  {
    date: "2024-11-01",
    GSuite: 9911,
    Gmail: 3481,
    Verizon: 1232,
    "Microsoft 365": 2178,
    rate: 84,
  },
  {
    date: "2024-11-02",
    GSuite: 4911,
    Gmail: 2481,
    Verizon: 3232,
    "Microsoft 365": 1478,
    rate: 87,
  },
  {
    date: "2024-11-03",
    GSuite: 5411,
    Gmail: 2781,
    Verizon: 8232,
    "Microsoft 365": 578,
    rate: 89,
  },
  {
    date: "2024-11-04",
    GSuite: 9911,
    Gmail: 3481,
    Verizon: 1232,
    "Microsoft 365": 2178,
    rate: 94,
  },
  {
    date: "2024-11-05",
    GSuite: 6481,
    Gmail: 3681,
    Verizon: 1749,
    "Microsoft 365": 2611,
    rate: 93,
  },
  {
    date: "2024-11-06",
    GSuite: 8960,
    Gmail: 4119,
    Verizon: 1821,
    "Microsoft 365": 2918,
    rate: 96,
  },
  {
    date: "2024-11-07",
    GSuite: 9066,
    Gmail: 2178,
    Verizon: 1568,
    "Microsoft 365": 1797,
    rate: 95,
  },
  {
    date: "2024-11-08",
    GSuite: 7925,
    Gmail: 2716,
    Verizon: 851,
    "Microsoft 365": 2590,
    rate: 98,
  },
  {
    date: "2024-11-09",
    GSuite: 7495,
    Gmail: 4445,
    Verizon: 1437,
    "Microsoft 365": 1096,
    rate: 99,
  },
  {
    date: "2024-11-10",
    GSuite: 9895,
    Gmail: 1913,
    Verizon: 1628,
    "Microsoft 365": 2178,
    rate: 100,
  },
  {
    date: "2024-11-11",
    GSuite: 5185,
    Gmail: 1576,
    Verizon: 1439,
    "Microsoft 365": 2814,
    rate: 98,
  },
  {
    date: "2024-11-12",
    GSuite: 7486,
    Gmail: 4982,
    Verizon: 1676,
    "Microsoft 365": 1382,
    rate: 94,
  },
  {
    date: "2024-11-13",
    GSuite: 5066,
    Gmail: 4611,
    Verizon: 1443,
    "Microsoft 365": 2995,
    rate: 96,
  },
  {
    date: "2024-11-14",
    GSuite: 9889,
    Gmail: 3694,
    Verizon: 663,
    "Microsoft 365": 1174,
    rate: 99,
  },
];

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

    ["GSuite", "Gmail", "Verizon", "Microsoft 365"].forEach((provider) => {
      const providerTooltip = am5.Tooltip.new(root, {
        labelText: `[fontSize: 14px]${provider}: {valueY} emails`,
      });

      const providerSeries = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: provider,
          xAxis: xAxis,
          yAxis: providerAxis,
          stacked: true,
          valueYField: provider,
          valueXField: "date",
          stroke: undefined,
          tooltip: providerTooltip,
        })
      );

      const providerKey = new Map<string, keyof typeof chartColor.provider>([
        ["GSuite", "gSuite"],
        ["Gmail", "gmail"],
        ["Verizon", "verizon"],
        ["Microsoft 365", "microsoft365"],
      ]);

      const key = providerKey.get(provider);

      if (key) {
        providerSeries.columns.template.setAll({
          fill: am5.color(chartColor.provider[key]),
        });
      }
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
