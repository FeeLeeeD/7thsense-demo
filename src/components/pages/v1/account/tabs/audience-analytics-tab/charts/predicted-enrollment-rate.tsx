import React from "react";
import { Am5XYChart } from "~components/charts/am5-xy-chart";
import { chartColor } from "~components/charts/shared";

export const PredictedEnrollmentRateChart = () => {
  return (
    <Am5XYChart
      h="300px"
      data={[
        { openRate: "0", value: 100 },
        { openRate: "5", value: 96 },
        { openRate: "10", value: 89 },
        { openRate: "15", value: 84 },
        { openRate: "20", value: 79 },
        { openRate: "25", value: 74 },
        { openRate: "30", value: 70 },
        { openRate: "35", value: 69 },
        { openRate: "40", value: 65 },
        { openRate: "45", value: 59 },
        { openRate: "50", value: 54 },
        { openRate: "55", value: 49 },
        { openRate: "60", value: 47 },
        { openRate: "65", value: 41 },
        { openRate: "70", value: 39 },
        { openRate: "75", value: 33 },
        { openRate: "80", value: 29 },
        { openRate: "85", value: 22 },
        { openRate: "90", value: 19 },
        { openRate: "95", value: 14 },
        { openRate: "100", value: 9 },
      ]}
      chart={{
        settings: ({ root }) => ({
          layout: root.verticalLayout,
          paddingLeft: 0,
        }),
        cursor: {
          custom: ({ cursor }) => {
            cursor.lineY.set("visible", false);
          },
        },
        legend: {
          settings: ({ am5 }) => ({
            centerX: am5.percent(50),
            x: am5.percent(50),
            y: am5.percent(95),
          }),
          custom: ({ chart, legend }) => {
            legend.labels.template.setAll({ fontSize: 12 });
            legend.data.setAll(chart.series.values);
          },
        },
      }}
      xAxis={{
        type: "CategoryAxis",
        rendererSettings: { minGridDistance: 60 },
        settings: ({ am5, root }) => ({
          categoryField: "openRate",
          tooltip: am5.Tooltip.new(root, {
            labelText: "Probability of engagement: [bold]{openRate}%",
          }),
        }),
      }}
      yAxis={{
        type: "ValueAxis",
        rendererSettings: { strokeOpacity: 0.1 },
        settings: () => ({ maxDeviation: 0.3, max: 100, numberFormat: "#'%'" }),
      }}
      series={{
        type: "ColumnSeries",
        settings: ({ am5, root }) => ({
          name: "Potentially enrolled people",
          valueYField: "value",
          categoryXField: "openRate",
          tooltip: am5.Tooltip.new(root, {
            labelText: "Potentially enrolled people: [bold]{value}%",
          }),
        }),
      }}
      customSettings={({ am5, series, xAxis, yAxis }) => {
        /* Styles */
        series.columns.template.setAll({
          fill: am5.color(chartColor.default),
          cornerRadiusTL: 4,
          cornerRadiusTR: 4,
          strokeOpacity: 0,
        });

        /* xAxis */
        xAxis.get("renderer").labels.template.setAll({
          fontSize: "12px",
        });
        xAxis.get("tooltip")?.label.setAll({
          fontSize: "12px",
        });

        /* yAxis */
        yAxis.get("renderer").labels.template.setAll({
          fontSize: "12px",
        });
        yAxis.get("renderer").labels.template.setAll({
          fontSize: "12px",
        });
      }}
    />
  );
};
