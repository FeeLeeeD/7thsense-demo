import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Box } from "@chakra-ui/react";

const chartId = "engagement-segments-chart";

export const EngagementSegmentsChart = () => {
  useLayoutEffect(() => {
    const root = am5.Root.new(chartId);

    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Responsive.new(root),
    ]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.horizontalLayout,
        radius: am5.percent(95),
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Engagement segments",
        categoryField: "label",
        valueField: "value",
        legendLabelText: "{category} –",
      })
    );

    series.slices.template.setAll({ cornerRadius: 4 });
    series.labels.template.set("forceHidden", true);
    series.ticks.template.setAll({ strokeOpacity: 0 });
    series.slices.template.set(
      "tooltipText",
      "{category}: {value.formatNumber('0')} ([bold]{valuePercentTotal.formatNumber('0.00')}%[/])"
    );

    const legend = chart.children.push(
      am5.Legend.new(root, {
        y: am5.percent(50),
        centerY: am5.percent(50),
        layout: root.verticalLayout,
      })
    );

    legend.labels.template.setAll({
      fontSize: "14px",
    });
    legend.valueLabels.template.setAll({
      fontSize: "14px",
      fontWeight: "bold",
      marginRight: 12,
    });

    series
      .get("colors")
      ?.set("colors", [
        am5.color("#90c4ab"),
        am5.color("#bde2b9"),
        am5.color("#f8a6a9"),
        am5.color("#f0616e"),
      ]);
    series.data.setAll([
      {
        label: "Active",
        value: 51.48,
      },
      {
        label: "Evaluating",
        value: 0.64,
      },
      {
        label: "Passive",
        value: 27.05,
      },
      {
        label: "Inactive",
        value: 20.83,
      },
    ]);
    legend.data.setAll(series.dataItems);

    series.appear(1000, 0);
    chart.appear(1000, 0);

    return () => {
      root.dispose();
    };
  }, []);

  return <Box id={chartId} w="100%" h="280px" />;
};
