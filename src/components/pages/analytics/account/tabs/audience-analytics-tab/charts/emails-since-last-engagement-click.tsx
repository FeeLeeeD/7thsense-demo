import React from "react";
import { Am5XYChart } from "~components/charts/am5-xy-chart";
import { chartColor } from "~data/shared";

export const EmailsSinceLastEngagementClickChart = () => {
  return (
    <Am5XYChart
      h="300px"
      data={[
        { emails: "1 email", count: 5500 },
        { emails: "2 emails", count: 3400 },
        { emails: "3 emails", count: 2500 },
        { emails: "4 emails", count: 2200 },
        { emails: "5 emails", count: 3300 },
        { emails: "6 emails", count: 1950 },
        { emails: "7 emails", count: 3350 },
        { emails: "8 emails", count: 1200 },
        { emails: "9 emails", count: 3400 },
        { emails: "10 emails", count: 1500 },
        { emails: "11 emails", count: 1400 },
        { emails: "12 emails", count: 800 },
        { emails: "13 emails", count: 700 },
        { emails: "14 emails", count: 850 },
        { emails: "15 emails", count: 600 },
        { emails: "16 emails", count: 500 },
        { emails: "17 emails", count: 700 },
        { emails: "18 emails", count: 500 },
        { emails: "19 emails", count: 300 },
        { emails: "20 emails", count: 300 },
        { emails: "21 emails", count: 290 },
        { emails: "22 emails", count: 800 },
        { emails: "23 emails", count: 270 },
        { emails: "24 emails", count: 150 },
        { emails: "25 emails", count: 160 },
        { emails: "26 emails", count: 180 },
        { emails: "27 emails", count: 110 },
        { emails: "28 emails", count: 100 },
        { emails: "29 emails", count: 90 },
        { emails: "30 emails", count: 70 },
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
