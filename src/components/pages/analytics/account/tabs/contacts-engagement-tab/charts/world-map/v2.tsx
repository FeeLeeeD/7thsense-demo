import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5geodata_usaLow from "@amcharts/amcharts5-geodata/usaLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { data } from "~data/charts/world-map";
import { chartColor } from "~data/shared";

const chartId = "world-map-v2";

export const WorldMap_v2 = () => {
  const drawer = useDisclosure();
  const pointData = useRef<{ city: string; count: number }>();

  useLayoutEffect(() => {
    const root = am5.Root.new(chartId);
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "translateY",
        wheelY: "none",
        projection: am5map.geoMercator(),
        rotationX: 95,
        rotationY: 7,
        homeZoomLevel: 4,
      })
    );

    let overlay = root.container.children.push(
      am5.Container.new(root, {
        width: am5.p100,
        height: am5.p100,
        layer: 100,
        visible: false,
      })
    );

    let curtain = overlay.children.push(
      am5.Rectangle.new(root, {
        width: am5.p100,
        height: am5.p100,
        fill: am5.color(0x000000),
        fillOpacity: 0.3,
      })
    );

    let message = overlay.children.push(
      am5.Label.new(root, {
        text: "Use CTRL + Scroll to zoom",
        fontSize: 30,
        x: am5.p50,
        y: am5.p50,
        centerX: am5.p50,
        centerY: am5.p50,
      })
    );

    chart.events.on("wheel", function (ev) {
      if (ev.originalEvent.ctrlKey) {
        ev.originalEvent.preventDefault();
        chart.set("wheelY", "zoom");
      } else {
        chart.set("wheelY", "none");
        overlay.show();
        overlay.setTimeout(function () {
          overlay.hide();
        }, 800);
      }
    });

    var zoomControl = chart.set(
      "zoomControl",
      am5map.ZoomControl.new(root, {})
    );
    /* Home button */
    zoomControl.homeButton.set("visible", true);
    zoomControl.homeButton.get("background")?.setAll({
      fill: am5.color(chartColor.default),
      stroke: am5.color(chartColor.default),
    });
    zoomControl.homeButton
      .get("background")
      ?.states.create("hover", {})
      ?.setAll({
        fill: am5.color("#4785FF"),
      });
    zoomControl.homeButton
      .get("background")
      ?.states.create("down", {})
      ?.setAll({
        fill: am5.color("#0A5BFF"),
      });

    /* Plus button */
    zoomControl.plusButton.get("background")?.setAll({
      fill: am5.color(chartColor.default),
      stroke: am5.color(chartColor.default),
    });
    zoomControl.plusButton
      .get("background")
      ?.states.create("hover", {})
      ?.setAll({
        fill: am5.color("#4785FF"),
      });
    zoomControl.plusButton
      .get("background")
      ?.states.create("down", {})
      ?.setAll({
        fill: am5.color("#0A5BFF"),
      });

    /* Minus button */
    zoomControl.minusButton.get("background")?.setAll({
      fill: am5.color(chartColor.default),
      stroke: am5.color(chartColor.default),
    });
    zoomControl.minusButton
      .get("background")
      ?.states.create("hover", {})
      ?.setAll({
        fill: am5.color("#4785FF"),
      });
    zoomControl.minusButton
      .get("background")
      ?.states.create("down", {})
      ?.setAll({
        fill: am5.color("#0A5BFF"),
      });

    var polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color("#D9DDEA"),
    });

    polygonSeries.events.on("datavalidated", function () {
      chart.goHome();
    });

    var polygonSeriesUS = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_usaLow,
      })
    );

    polygonSeriesUS.mapPolygons.template.setAll({
      fill: am5.color("#E8ECF6"),
      stroke: am5.color(chartColor.dark),
      tooltipText: "{name}",
      toggleKey: "active",
      interactive: true,
    });

    // Set data
    const cities = [...data.cities.us];

    // Create polygon series for projected circles
    var circleSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    circleSeries.mapPolygons.template.setAll({
      stroke: am5.color(chartColor.dark),
      strokeWidth: 0.5,
      templateField: "polygonTemplate",
      tooltipText: "{title}: {count}",
    });

    var countLow = Infinity;
    var countHigh = -Infinity;

    for (var i = 0; i < cities.length; i++) {
      var value = cities[i].count;
      if (value < countLow) {
        countLow = value;
      }
      if (value > countHigh) {
        countHigh = value;
      }
    }

    // radius in degrees
    var minRadius = 0.5;
    var maxRadius = 1;

    for (var i = 0; i < cities.length; i++) {
      var dataContext = cities[i];
      var countryDataItem = polygonSeries.getDataItemById(dataContext.title);

      var count = dataContext.count;

      var radius =
        minRadius + (maxRadius * (count - countLow)) / (countHigh - countLow);

      var geometry = am5map.getGeoCircle(
        { longitude: dataContext.longitude, latitude: dataContext.latitude },
        radius
      );

      circleSeries.data.push({
        title: dataContext.title,
        count: dataContext.count,
        polygonTemplate: dataContext,
        geometry: geometry,
      });

      const polygon = circleSeries.mapPolygons.getIndex(i);

      if (polygon) {
        polygon?.setAll({
          fill: am5.color(
            i < 8
              ? "#8BC1F7"
              : i < 16
              ? "#98B1DF"
              : i < 24
              ? "#A4A1C7"
              : i < 32
              ? "#B192AF"
              : i < 40
              ? "#BE8297"
              : i < 48
              ? "#CA727F"
              : "#D76267"
          ),
        });

        polygon.events.on("click", (e) => {
          const { title, count } = e.target.dataItem?.dataContext as {
            title: string;
            count: number;
          };
          pointData.current = { city: title, count };

          drawer.onOpen();
        });

        circleSeries.mapPolygons.setIndex(i, polygon);
      }
    }

    /* Click event */

    // Make stuff animate on load
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <Box>
      <Box
        id={chartId}
        w="full"
        h="400px"
        border="1px"
        borderColor="#F0F2F8"
        borderRadius="16px"
        overflow="hidden"
      />

      {drawer.isOpen && (
        <Drawer
          isOpen={drawer.isOpen}
          placement="right"
          size="xl"
          onClose={drawer.onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{pointData.current?.city}</DrawerHeader>

            <DrawerBody>{pointData.current?.count}</DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </Box>
  );
};
