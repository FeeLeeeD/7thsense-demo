import React from "react";
import { Am5XYChart } from "~components/charts/am5-xy-chart";
import { chartColor } from "~components/charts/shared";

export const InitiationRatesChart = () => {
  return (
    <Am5XYChart
      h="300px"
      data={[
        {
          email: "1st",
          value: 55,
        },
        {
          email: "2nd",
          value: 20,
        },
        {
          email: "3rd",
          value: 14,
        },
        {
          email: "4th",
          value: 12,
        },
        {
          email: "5th",
          value: 9,
        },
        {
          email: "6th",
          value: 6,
        },
        {
          email: "7th",
          value: 5,
        },
        {
          email: "8th",
          value: 6,
        },
        {
          email: "9th",
          value: 5,
        },
        {
          email: "10th",
          value: 4,
        },
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
        rendererSettings: { minGridDistance: 40 },
        settings: ({ am5, root }) => ({
          categoryField: "email",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{email} email",
          }),
        }),
      }}
      yAxis={{
        type: "ValueAxis",
        rendererSettings: { strokeOpacity: 0.1 },
        settings: () => ({
          maxDeviation: 5,
          max: 100,
          numberFormat: "#'%'",
        }),
      }}
      series={{
        type: "ColumnSeries",
        settings: ({ am5, root }) => ({
          name: "Probability of opening an email",
          valueYField: "value",
          categoryXField: "email",
          tooltip: am5.Tooltip.new(root, {
            labelHTML:
              "Probability of opening an email: <strong>{value}</strong>",
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

        /* Change tooltip when value is 0 */
        series.get("tooltip")?.adapters.add("labelHTML", (value, target) => {
          if (
            (target.dataItem?.dataContext as { value?: number })?.["value"] ===
            0
          ) {
            return "No data";
          }

          return value;
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
