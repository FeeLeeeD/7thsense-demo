import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5geodata_usaLow from "@amcharts/amcharts5-geodata/usaLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Box } from "@chakra-ui/react";

const chartId = "place-of-engagement";

export const PlaceOfEngagementMap = () => {
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
        homeZoomLevel: 5,
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
      fill: am5.color("#2970FF"),
      stroke: am5.color("#2970FF"),
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
      fill: am5.color("#2970FF"),
      stroke: am5.color("#2970FF"),
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
      fill: am5.color("#2970FF"),
      stroke: am5.color("#2970FF"),
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
      fill: am5.color("#BCDCFF"),
      tooltipText: "{name}",
      toggleKey: "active",
      interactive: true,
    });

    // Set data
    const cities = [...data.cities.us];

    // Create polygon series for projected circles
    var circleSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    circleSeries.mapPolygons.template.setAll({
      fill: am5.color("#6699FF"),
      stroke: am5.color("#BCDCFF"),
      strokeWidth: 1,
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
    }

    // Make stuff animate on load
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <Box
      id={chartId}
      w="full"
      h="340px"
      border="1px"
      borderColor="#F0F2F8"
      borderRadius="16px"
      overflow="hidden"
    />
  );
};

export const data = {
  cities: {
    us: [
      {
        title: "New York",
        latitude: 40.712776,
        longitude: -74.005974,
        count: 189456,
      },
      {
        title: "Los Angeles",
        latitude: 34.052235,
        longitude: -118.243683,
        count: 243895,
      },
      {
        title: "Chicago",
        latitude: 41.878113,
        longitude: -87.629799,
        count: 174852,
      },
      {
        title: "Houston",
        latitude: 29.760427,
        longitude: -95.369804,
        count: 201438,
      },
      {
        title: "Phoenix",
        latitude: 33.448376,
        longitude: -112.074036,
        count: 142395,
      },
      {
        title: "Philadelphia",
        latitude: 39.952583,
        longitude: -75.165222,
        count: 168273,
      },
      {
        title: "San Antonio",
        latitude: 29.424349,
        longitude: -98.491142,
        count: 159582,
      },
      {
        title: "San Diego",
        latitude: 32.715736,
        longitude: -117.161087,
        count: 181748,
      },
      {
        title: "Dallas",
        latitude: 32.776665,
        longitude: -96.796989,
        count: 209675,
      },
      {
        title: "San Jose",
        latitude: 37.338207,
        longitude: -121.88633,
        count: 150493,
      },
      {
        title: "Austin",
        latitude: 30.267153,
        longitude: -97.743057,
        count: 173891,
      },
      {
        title: "Jacksonville",
        latitude: 30.332184,
        longitude: -81.655647,
        count: 127345,
      },
      {
        title: "Fort Worth",
        latitude: 32.755489,
        longitude: -97.330765,
        count: 136912,
      },
      {
        title: "Columbus",
        latitude: 39.961178,
        longitude: -82.998795,
        count: 192543,
      },
      {
        title: "Indianapolis",
        latitude: 39.768402,
        longitude: -86.158066,
        count: 115674,
      },
    ],
  },
};
