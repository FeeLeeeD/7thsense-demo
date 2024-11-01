import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5geodata_usaLow from "@amcharts/amcharts5-geodata/usaLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Box } from "@chakra-ui/react";
import { data } from "~data/charts/world-map";

const chartId = "world-map-v1";

export const WorldMap_v1 = () => {
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

    // Create point series for markers
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
    var pointSeries = chart.series.push(
      am5map.ClusteredPointSeries.new(root, {})
    );

    // Set clustered bullet
    // https://www.amcharts.com/docs/v5/charts/map-chart/clustered-point-series/#Group_bullet
    pointSeries.set("clusteredBullet", function (root) {
      var container = am5.Container.new(root, {
        cursorOverStyle: "pointer",
      });

      const circle1 = container.children.push(
        am5.Circle.new(root, {
          radius: 12,
          tooltipY: 0,
          fill: am5.color("#2970FF"),
        })
      );

      const circle2 = container.children.push(
        am5.Circle.new(root, {
          radius: 16,
          fillOpacity: 0.3,
          tooltipY: 0,
          fill: am5.color("#69F"),
        })
      );

      const circle3 = container.children.push(
        am5.Circle.new(root, {
          radius: 20,
          fillOpacity: 0.3,
          tooltipY: 0,
          fill: am5.color("#9BC5FF"),
        })
      );

      const label = container.children.push(
        am5.Label.new(root, {
          centerX: am5.p50,
          centerY: am5.p50,
          fill: am5.color("#FFF"),
          populateText: true,
          fontSize: "8",
          text: "{value}",
        })
      );

      container.events.on("click", function (e) {
        pointSeries.zoomToCluster(e.target.dataItem);
      });

      return am5.Bullet.new(root, {
        sprite: container,
      });
    });

    // var minValue = Infinity;
    // var maxValue = -Infinity;

    // var startColorHex = "#E5E5E6";
    // var endColorHex = "#A40A16";

    // for (var i = 0; i < data.cities.us.length; i++) {
    //   var value = data.cities.us[i].count;
    //   if (value < minValue) {
    //     minValue = value;
    //   }
    //   if (value > maxValue) {
    //     maxValue = value;
    //   }
    // }

    // function getColorFromValue(value) {
    // Normalize the value within the range [0, 1]
    // const normalizedValue = (value - minValue) / (maxValue - minValue);

    // Parse the start and end hex colors into RGB components
    // const startColorRGB = {
    //   r: parseInt(startColorHex.slice(1, 3), 16),
    //   g: parseInt(startColorHex.slice(3, 5), 16),
    //   b: parseInt(startColorHex.slice(5, 7), 16),
    // };
    // const endColorRGB = {
    //   r: parseInt(endColorHex.slice(1, 3), 16),
    //   g: parseInt(endColorHex.slice(3, 5), 16),
    //   b: parseInt(endColorHex.slice(5, 7), 16),
    // };

    // Calculate the RGB components based on the normalized value and color interpolation
    // const red = Math.round(
    //   startColorRGB.r + (endColorRGB.r - startColorRGB.r) * normalizedValue
    // );
    // const green = Math.round(
    //   startColorRGB.g + (endColorRGB.g - startColorRGB.g) * normalizedValue
    // );
    // const blue = Math.round(
    //   startColorRGB.b + (endColorRGB.b - startColorRGB.b) * normalizedValue
    // );

    // Convert the RGB components to a hexadecimal color string
    //   const hexColor = `#${red.toString(16).padStart(2, "0")}${green
    //     .toString(16)
    //     .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;

    //   return hexColor;
    // }

    // Create regular bullets
    // pointSeries.bullets.push(function (_, __, dataItem) {
    //   console.log(getColorFromValue(dataItem.dataContext.count));

    //   var circle = am5.Circle.new(root, {
    //     radius: 8,
    //     tooltipY: 0,
    //     fill: am5.color(getColorFromValue(dataItem.dataContext.count)),
    //     tooltipText: "{title}: {count}",
    //   });

    //   return am5.Bullet.new(root, {
    //     sprite: circle,
    //   });
    // });

    // Set data
    const cities = [
      ...data.cities.us,
      // ...data.cities.canada,
      // ...data.cities.uk,
      // ...data.cities.germany,
    ];

    // for (var i = 0; i < cities.length; i++) {
    //   var city = cities[i];
    //   addCity(city.longitude, city.latitude, city.title, city.count);
    // }

    // function addCity(longitude, latitude, title, count) {
    //   pointSeries.data.push({
    //     geometry: { type: "Point", coordinates: [longitude, latitude] },
    //     title,
    //     count,
    //   });
    // }

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
      h="400px"
      border="1px"
      borderColor="#F0F2F8"
      borderRadius="16px"
      overflow="hidden"
    />
  );
};
