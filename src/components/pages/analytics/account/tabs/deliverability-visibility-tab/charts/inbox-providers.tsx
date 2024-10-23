import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Box } from "@chakra-ui/react";
import { chartColor, Provider, providerLabel } from "~data/shared";
import { data } from "~data/charts/inbox-providers";

const chartId = "engagement-segments-chart";
const total = data.reduce((sum, item) => sum + item.count, 0);

export const InboxProvidersChart = () => {
  useLayoutEffect(() => {
    const root = am5.Root.new(chartId);

    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Responsive.new(root),
    ]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        radius: am5.percent(95),
        paddingBottom: 24,
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Engagement segments",
        categoryField: "provider",
        valueField: "count",
        legendLabelText: "{category} –",
        legendValueText:
          "{valuePercentTotal.formatNumber('0.00')}% [normal]({value})",
      })
    );

    series.slices.template.setAll({ cornerRadius: 4 });
    series.labels.template.set("forceHidden", true);
    series.ticks.template.setAll({ strokeOpacity: 0 });
    series.slices.template.set(
      "tooltipText",
      "{category}: {value.formatNumber('0')} ([bold]{valuePercentTotal.formatNumber('0.00')}%[/])"
    );

    const container = chart.children.push(
      am5.Container.new(root, {
        layout: root.verticalLayout,
        x: am5.percent(50),
        centerX: am5.percent(50),
      })
    );

    const label = container.children.push(
      am5.Label.new(root, {
        text: `Total count of contacts: ${new Intl.NumberFormat().format(
          total
        )}`,
        marginBottom: 8,
        x: -6,
        fontWeight: "500",
      })
    );

    const legend = container.children.push(
      am5.Legend.new(root, {
        // x: am5.percent(50),
        // centerX: am5.percent(50),
        layout: root.verticalLayout,
        // marginLeft: 24,
        width: 268,
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
        am5.color(chartColor.provider[Provider.GoogleWorkspace]),
        am5.color(chartColor.provider[Provider.Gmail]),
        am5.color(chartColor.provider[Provider.Microsoft365]),
        am5.color(chartColor.provider[Provider.VerizonAndCo]),
        am5.color(chartColor.provider[Provider.Apple]),
        am5.color(chartColor.provider[Provider.Other]),
      ]);
    series.data.setAll(
      data.map((item) => ({ ...item, provider: providerLabel(item.provider) }))
    );
    legend.data.setAll(series.dataItems);

    series.appear(1000, 0);
    chart.appear(1000, 0);

    return () => {
      root.dispose();
    };
  }, []);

  return <Box id={chartId} w="100%" h="400px" />;
};
