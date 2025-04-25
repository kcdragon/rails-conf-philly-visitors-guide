import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["map"]
  static values = {
    centerPosition: Object,
    markers: Array,
  }

  async connect() {
    this.draw({ detail: { theme: localStorage.getItem("color-theme") || "system" } })
  }

  async draw({ detail: { theme } }) {
    console.log("draw", theme)

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

    new AdvancedMarkerElement({
      map: this.map,
      position: { lat, lng },
      title,
    });

    this.markersValue.forEach((marker, index) => {      
      let { lat, lng, title } = marker;
      lat = parseFloat(lat);
      lng = parseFloat(lng);

      const pinTextGlyph = new PinElement({
        glyph: (index + 1).toString(),
        glyphColor: "white",
      });

      new AdvancedMarkerElement({
        map: this.map,
        position: { lat, lng },
        title,
        content: pinTextGlyph.element,
      });
    });
  }
} 
