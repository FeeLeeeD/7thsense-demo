import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Box } from "@chakra-ui/react";

const chartId = "contact-engagement-probability";

export const ContactEngagementProbabilityChart = () => {
  useLayoutEffect(() => {
    const root = am5.Root.new(chartId);

    // Setting theme
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

    // Adding series
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
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
      "{category}: {value.formatNumber('0')} contacts ([bold]{valuePercentTotal.formatNumber('0.00')}%[/])"
    );

    const container = chart.children.push(
      am5.Container.new(root, {
        layout: root.verticalLayout,
        y: am5.percent(50),
        centerY: am5.percent(50),
      })
    );

    const label = container.children.push(
      am5.Label.new(root, {
        text: "Engagement Probability",
        marginBottom: 8,
        x: -6,
        fontWeight: "500",
      })
    );

    // Legend
    const legend = container.children.push(
      am5.Legend.new(root, {
        layout: root.verticalLayout,
      })
    );

    // Setting data
    if (data.every((item) => item.color)) {
      series?.get("colors")?.set(
        "colors",
        data.map((item) => am5.Color.fromAny(item?.color as string))
      );
    }
    series.data.setAll(data);

    // Setting legend
    legend.data.setAll(series.dataItems);

    series.appear(1000, 0);
    chart.appear(1000, 0);

    return () => {
      root.dispose();
    };
  }, []);

  return <Box id={chartId} w="100%" h="280px" />;
};

const sortByValue = (data: { label: string; score: number }[]) => {
  return [...data].sort((a, b) => labelWeight(a.label) - labelWeight(b.label));
};

const labelWeight = (label: string) => {
  const weights = new Map([
    ["No emails sent", 2],
    ["<20%", 3],
    ["21-40%", 4],
    ["41-60%", 5],
    ["61-80%", 6],
    [">80%", 7],
  ]);

  return weights.get(label) ?? 1;
};

const rawData = [
  {
    label: "<20%",
    score: 20998,
  },
  {
    label: "21-40%",
    score: 10212,
  },
  {
    label: "41-60%",
    score: 8908,
  },
  {
    label: "61-80%",
    score: 5403,
  },
  {
    label: ">80%",
    score: 2432,
  },
  {
    label: "No emails sent",
    score: 1024,
  },
];

const data =
  sortByValue(rawData).map((item) => ({
    label: item.label,
    value: item.score,
    color: {
      "No emails sent": "#8dc2f7",
      "<20%": "#a2aef3",
      "21-40%": "#bd98e1",
      "41-60%": "#d281c2",
      "61-80%": "#dc6c97",
      ">80%": "#d66167",
    }[item.label],
  })) ?? [];
