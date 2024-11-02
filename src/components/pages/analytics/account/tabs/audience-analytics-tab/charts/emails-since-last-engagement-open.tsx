import React from "react";
import { Am5XYChart } from "~components/charts/am5-xy-chart";
import { chartColor } from "~data/shared";

export const EmailsSinceLastEngagementOpenChart = () => {
  return (
    <Am5XYChart
      h="300px"
      data={[
        { emails: "1 email", count: 11200 },
        { emails: "2 emails", count: 4700 },
        { emails: "3 emails", count: 3800 },
        { emails: "4 emails", count: 2200 },
        { emails: "5 emails", count: 2100 },
        { emails: "6 emails", count: 1950 },
        { emails: "7 emails", count: 1540 },
        { emails: "8 emails", count: 1200 },
        { emails: "9 emails", count: 900 },
        { emails: "10 emails", count: 1300 },
        { emails: "11 emails", count: 3300 },
        { emails: "12 emails", count: 250 },
        { emails: "13 emails", count: 100 },
        { emails: "14 emails", count: 50 },
        { emails: "15 emails", count: 130 },
        { emails: "16 emails", count: 900 },
        { emails: "17 emails", count: 30 },
        { emails: "18 emails", count: 0 },
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
      }}
      xAxis={{
        type: "CategoryAxis",
        rendererSettings: { minGridDistance: 60, minorGridEnabled: true },
        settings: ({ am5, root }) => ({
          categoryField: "emails",
          tooltip: am5.Tooltip.new(root, {}),
        }),
      }}
      yAxis={{
        type: "ValueAxis",
        rendererSettings: { strokeOpacity: 0.1 },
        settings: () => ({}),
      }}
      series={{
        type: "ColumnSeries",
        settings: ({ am5, root }) => ({
          name: "Count of people",
          valueYField: "count",
          categoryXField: "emails",
          tooltip: am5.Tooltip.new(root, {
            labelText: "Number of people: [bold]{valueY}",
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

        xAxis.get("renderer").labels.template.adapters.add("text", (value) => {
          console.log(value);
          return value;
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
