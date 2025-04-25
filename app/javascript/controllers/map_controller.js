import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["map"]
  static values = {
    centerPosition: Object,
    centerPositionImageUrl: String,
    markers: Array,
  }

  async connect() {
    this.draw({ detail: { theme: localStorage.getItem("color-theme") || "system" } })
  }

  async draw({ detail: { theme } }) {
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
    const { ColorScheme } = await google.maps.importLibrary("core")

    const { lat, lng, title } = this.centerPositionValue;

    let colorScheme = null;
    if (theme === "system") {
      colorScheme = ColorScheme.SYSTEM
    } else if (theme === "light") {
      colorScheme = ColorScheme.LIGHT
    } else if (theme === "dark") {
      colorScheme = ColorScheme.DARK
    }

    this.map = new google.maps.Map(this.mapTarget, {
      zoom: 15, // "street" level zoom
      center: { lat, lng },
      mapId: "a38d828481050665", // https://console.cloud.google.com/google/maps-apis/studio/maps/a38d828481050665?project=railsconfphillyvisitorsguide
      colorScheme,
    });

    const glyphImg = document.createElement("img");
    glyphImg.src = this.centerPositionImageUrlValue;
    const glyphSvgPinElement = new PinElement({
      scale: 1.5,
      glyph: glyphImg,
    });

    const centerMarker = new AdvancedMarkerElement({
      map: this.map,
      position: { lat, lng },
      content: glyphSvgPinElement.element,
      title,
    });

    const infoWindow = new google.maps.InfoWindow({});

    centerMarker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(title);
      infoWindow.open(this.map, centerMarker);
    });

    const markers = [];

    this.markersValue.forEach((marker, index) => {      
      let { lat, lng, title } = marker;
      lat = parseFloat(lat);
      lng = parseFloat(lng);

      const pinTextGlyph = new PinElement({
        glyph: (index + 1).toString(),
        glyphColor: "white",
      });

      markers.push(
        new AdvancedMarkerElement({
          map: this.map,
          position: { lat, lng },
          title,
          content: pinTextGlyph.element,
        })
      );

      markers[index].addListener("click", () => {
        infoWindow.close();
        infoWindow.setContent(title);
        infoWindow.open(this.map, markers[index]);
      });
    });
  }
} 
