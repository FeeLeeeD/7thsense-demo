import React, { useLayoutEffect } from "react";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import { Box } from "@chakra-ui/react";
import { data } from "~data/charts/delivery-rate-by-inbox-provider";
import { chartColor, Provider, providerLabel } from "~data/shared";

const chartId = "deliverability-score";

export const DeliverabilityScoreChart = () => {
  useLayoutEffect(() => {
    const root = am5.Root.new(chartId);
    root.setThemes([
      am5themes_Responsive.new(root),
      am5themes_Animated.new(root),
    ]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, { paddingLeft: 0 })
    );

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "name",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30,
          minorGridEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.get("renderer").labels.template.setAll({ fontSize: 12 });

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        min: 0,
        max: 100,
        numberFormat: "0'%'",
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    var series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Providers",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "name",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}%",
        }),
      })
    );

    series.columns.template.setAll({
      cornerRadiusTL: 8,
      cornerRadiusTR: 8,
      strokeOpacity: 0,
    });

    series.columns.template.adapters.add("fill", function (fill, target) {
      const provider = (target.dataItem?.dataContext as { provider: Provider })
        .provider;

      return am5.color(chartColor.provider[provider]);
    });

    const dataWithName = data.map((item) => ({
      ...item,
      name: providerLabel(item.provider),
    }));

    xAxis.data.setAll(dataWithName);
    series.data.setAll(dataWithName);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <Box id={chartId} w="full" h="300px" />;
};
