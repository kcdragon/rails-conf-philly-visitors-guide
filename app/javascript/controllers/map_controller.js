import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["map"]
  static values = {
    centerPosition: Object,
    markers: Array,
  }

  async connect() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const { lat, lng, title } = this.centerPositionValue;

    this.map = new google.maps.Map(this.mapTarget, {
      zoom: 15, // "street" level zoom
      center: { lat, lng },
      mapId: "map",
    });

    new AdvancedMarkerElement({
      map: this.map,
      position: { lat, lng },
      title,
    });

    this.markersValue.forEach((marker) => {      
      let { lat, lng, title } = marker;
      lat = parseFloat(lat);
      lng = parseFloat(lng);
      new AdvancedMarkerElement({
        map: this.map,
        position: { lat, lng },
        title,
      });
    });
  }
} 
