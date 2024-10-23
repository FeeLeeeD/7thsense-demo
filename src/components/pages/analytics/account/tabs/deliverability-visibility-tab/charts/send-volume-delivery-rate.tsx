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
    "Google Workspace": 9911,
    Gmail: 3481,
    "Verizon/AOL/Yahoo": 1232,
    "Microsoft 365": 2178,
    "Other/Unknown": 124,
    rate: 84,
  },
  {
    date: "2024-11-02",
    "Google Workspace": 4911,
    Gmail: 2481,
    "Verizon/AOL/Yahoo": 3232,
    "Microsoft 365": 1478,
    "Other/Unknown": 94,
    rate: 87,
  },
  {
    date: "2024-11-03",
    "Google Workspace": 5411,
    Gmail: 2781,
    "Verizon/AOL/Yahoo": 8232,
    "Microsoft 365": 578,
    "Other/Unknown": 54,
    rate: 89,
  },
  {
    date: "2024-11-04",
    "Google Workspace": 9911,
    Gmail: 3481,
    "Verizon/AOL/Yahoo": 1232,
    "Microsoft 365": 2178,
    "Other/Unknown": 32,
    rate: 94,
  },
  {
    date: "2024-11-05",
    "Google Workspace": 6481,
    Gmail: 3681,
    "Verizon/AOL/Yahoo": 1749,
    "Microsoft 365": 2611,
    "Other/Unknown": 44,
    rate: 93,
  },
  {
    date: "2024-11-06",
    "Google Workspace": 8960,
    Gmail: 4119,
    "Verizon/AOL/Yahoo": 1821,
    "Microsoft 365": 2918,
    "Other/Unknown": 95,
    rate: 96,
  },
  {
    date: "2024-11-07",
    "Google Workspace": 9066,
    Gmail: 2178,
    "Verizon/AOL/Yahoo": 1568,
    "Microsoft 365": 1797,
    "Other/Unknown": 66,
    rate: 95,
  },
  {
    date: "2024-11-08",
    "Google Workspace": 7925,
    Gmail: 2716,
    "Verizon/AOL/Yahoo": 851,
    "Microsoft 365": 2590,
    "Other/Unknown": 56,
    rate: 98,
  },
  {
    date: "2024-11-09",
    "Google Workspace": 7495,
    Gmail: 4445,
    "Verizon/AOL/Yahoo": 1437,
    "Microsoft 365": 1096,
    "Other/Unknown": 45,
    rate: 99,
  },
  {
    date: "2024-11-10",
    "Google Workspace": 9895,
    Gmail: 1913,
    "Verizon/AOL/Yahoo": 1628,
    "Microsoft 365": 2178,
    "Other/Unknown": 82,
    rate: 100,
  },
  {
    date: "2024-11-11",
    "Google Workspace": 5185,
    Gmail: 1576,
    "Verizon/AOL/Yahoo": 1439,
    "Microsoft 365": 2814,
    "Other/Unknown": 13,
    rate: 98,
  },
  {
    date: "2024-11-12",
    "Google Workspace": 7486,
    Gmail: 4982,
    "Verizon/AOL/Yahoo": 1676,
    "Microsoft 365": 1382,
    "Other/Unknown": 68,
    rate: 94,
  },
  {
    date: "2024-11-13",
    "Google Workspace": 5066,
    Gmail: 4611,
    "Verizon/AOL/Yahoo": 1443,
    "Microsoft 365": 2995,
    "Other/Unknown": 56,
    rate: 96,
  },
  {
    date: "2024-11-14",
    "Google Workspace": 9889,
    Gmail: 3694,
    "Verizon/AOL/Yahoo": 663,
    "Microsoft 365": 1174,
    "Other/Unknown": 54,
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
      "Google Workspace",
      "Gmail",
      "Microsoft 365",
      "Verizon/AOL/Yahoo",
      "Other/Unknown",
    ].forEach((provider) => {
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
        ["Google Workspace", "gSuite"],
        ["Gmail", "gmail"],
        ["Verizon/AOL/Yahoo", "verizon"],
        ["Microsoft 365", "microsoft365"],
        ["Other/Unknown", "unknown"],
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
