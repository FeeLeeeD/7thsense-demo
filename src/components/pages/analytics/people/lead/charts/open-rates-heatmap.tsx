import React from "react";
import { Box, BoxProps, HStack, Text, Tooltip } from "@chakra-ui/react";
import { Am5XYChart } from "~components/charts/am5-xy-chart";

type OpenRatesHeatMapProps = {
  cumulativeMonthlyOpenRates: number[] | undefined;
} & BoxProps;

const label = [
  "Year ago",
  "11 months ago",
  "10 months ago",
  "9 months ago",
  "8 months ago",
  "7 months ago",
  "6 months ago",
  "5 months ago",
  "4 months ago",
  "3 months ago",
  "Month ago",
  "This month",
];

export const OpenRatesHeatMap = ({
  cumulativeMonthlyOpenRates,
  ...props
}: OpenRatesHeatMapProps) => {
  const data =
    cumulativeMonthlyOpenRates?.map((openRate, i) => ({
      value: 1,
      openRate: Math.round(openRate * 100),
      period: label[i],
    })) ?? [];

  return (
    <HStack>
      <Am5XYChart
        h="220px"
        data={data}
        chart={{
          settings: ({ root }) => ({
            layout: root.verticalLayout,
            paddingLeft: 0,
            paddingBottom: 24,
          }),
          cursor: {
            custom: ({ cursor }) => {
              cursor.lineY.set("visible", false);
            },
          },
        }}
        xAxis={{
          type: "CategoryAxis",
          rendererSettings: { minGridDistance: 100 },
          settings: ({ am5, root }) => ({
            maxDeviation: 0.3,
            categoryField: "period",
            tooltip: am5.Tooltip.new(root, {
              labelText: "{period}",
            }),
          }),
        }}
        yAxis={{
          type: "ValueAxis",
          rendererSettings: { strokeOpacity: 0 },
          settings: () => ({ maxPrecision: 0, max: 1, strictMinMax: true }),
        }}
        series={{
          type: "ColumnSeries",
          settings: () => ({
            name: "Potentially enrolled contacts",
            valueYField: "value",
            categoryXField: "period",
          }),
        }}
        customSettings={({ root, am5, series, xAxis, yAxis }) => {
          /* Styles */
          series.columns.template.setAll({
            width: am5.percent(100),
            strokeOpacity: 0,
          });

          /* Value in the center of a column */
          series.bullets.push((_, __, dataItem) => {
            const dataContext = dataItem?.dataContext as
              | (typeof data)[number]
              | undefined;

            if (
              typeof dataContext?.openRate === "number" &&
              dataContext?.openRate >= 0
            ) {
              return am5.Bullet.new(root, {
                sprite: am5.Label.new(root, {
                  centerX: am5.p50,
                  centerY: am5.p50,
                  text: "{openRate}%",
                  fontSize: "12px",
                  fill: am5.color("#FFF"),
                  populateText: true,
                }),
              });
            }
          });

          /* Columns border radius */
          series.columns.template.adapters.add(
            "cornerRadiusTL",
            (value, target) => {
              const dataContext = target.dataItem?.dataContext as
                | (typeof data)[number]
                | undefined;
              if (!dataContext?.period) return value;

              if (dataContext.period === "Year ago") return 8;
              else return value;
            }
          );
          series.columns.template.adapters.add(
            "cornerRadiusBL",
            (value, target) => {
              const dataContext = target.dataItem?.dataContext as
                | (typeof data)[number]
                | undefined;
              if (!dataContext?.period) return value;

              if (dataContext.period === "Year ago") return 8;
              else return value;
            }
          );
          series.columns.template.adapters.add(
            "cornerRadiusTR",
            (value, target) => {
              const dataContext = target.dataItem?.dataContext as
                | (typeof data)[number]
                | undefined;
              if (!dataContext?.period) return value;

              if (dataContext.period === "This month") return 8;
              else return value;
            }
          );
          series.columns.template.adapters.add(
            "cornerRadiusBR",
            (value, target) => {
              const dataContext = target.dataItem?.dataContext as
                | (typeof data)[number]
                | undefined;
              if (!dataContext?.period) return value;

              if (dataContext.period === "This month") return 8;
              else return value;
            }
          );

          /* Column colors */
          series.columns.template.adapters.add("fill", (fill, target) => {
            const dataContext = target.dataItem?.dataContext as
              | (typeof data)[number]
              | undefined;
            if (typeof dataContext?.openRate !== "number") return fill;

            const hexColor = getColor(dataContext.openRate);

            if (hexColor) {
              return am5.color(hexColor);
            } else {
              return fill;
            }
          });

          /* xAxis */
          xAxis.get("renderer").labels.template.setAll({
            fontSize: "12px",
            textBaseline: "middle",
            centerX: 0,
            textAlign: "center",
          });
          xAxis.get("renderer").grid.template.setAll({
            opacity: 0,
          });
          xAxis.get("tooltip")?.label.setAll({
            fontSize: "12px",
          });

          /* yAxis */
          yAxis.get("renderer").labels.template.setAll({
            opacity: 0,
            paddingLeft: 0,
            paddingRight: 0,
          });
          yAxis.get("renderer").grid.template.setAll({
            opacity: 0,
          });
        }}
      />

      <ColorScale />
    </HStack>
  );
};

const ColorScale = () => {
  return (
    <Box>
      {[96, 92, 84, 76, 68, 60, 52, 44, 36, 28, 20, 12].map((value, i) => (
        <HStack key={i}>
          <Box
            boxSize="16px"
            bg={getColor(value)}
            {...(i === 0 && { borderRadius: "4px 4px 0 0" })}
            {...(i === 11 && { borderRadius: "0 0 4px 4px" })}
          />

          {i === 0 && (
            <Text fontSize="xs" h="16px">
              100%
            </Text>
          )}

          {i === 5 && (
            <Text fontSize="xs" h="16px" pt="6px">
              50%
            </Text>
          )}

          {i === 11 && (
            <Text fontSize="xs" h="16px">
              0%
            </Text>
          )}
        </HStack>
      ))}

      <Tooltip label="The period has no data to display" placement="bottom-end">
        <Box mt="4px" boxSize="16px" bg={getColor(-1)} borderRadius="4px" />
      </Tooltip>
    </Box>
  );
};

function getColor(value: number): `#${string}` {
  if (value < 0) return "#E5E5E6";
  if (value <= 12) return "#1973F5";
  if (value <= 20) return "#2769DF";
  if (value <= 28) return "#355EC8";
  if (value <= 36) return "#4354B2";
  if (value <= 44) return "#51499C";
  if (value <= 52) return "#5F3F86";
  if (value <= 60) return "#6C346F";
  if (value <= 68) return "#7A2A59";
  if (value <= 76) return "#881F43";
  if (value <= 84) return "#96152D";
  if (value <= 92) return "#A40A16";

  return "#B20000";
}
