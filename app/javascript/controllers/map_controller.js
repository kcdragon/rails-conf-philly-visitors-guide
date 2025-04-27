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

    if (!this.hasMapTarget) {
      return;
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
      let { lat, lng, title, tags, path } = marker;
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
        infoWindow.setContent(`
          <div class="flex flex-col gap-2">
            <div class="text-gray-800 dark:text-gray-100 text-lg font-semibold mb-2">${title}</div>
            <div class="flex flex-wrap gap-2">
              ${tags.map(tag => `
                <span class="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  ${tag}
                </span>
              `).join('')}
            </div>
            <div class="mt-2">
              <a href="${path}" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-block text-sm" data-turbo-frame="_top">
                View Details
              </a>
            </div>
          </div>
        `);
        infoWindow.open(this.map, markers[index]);
      });
    });
  }
} 
