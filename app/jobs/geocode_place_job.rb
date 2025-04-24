class GeocodePlaceJob < ApplicationJob
  def perform(place_id)
    place = Place.find(place_id)

    location = Geocoder.location_for(place.google_maps_address)

    return if location.nil?

    place.update!(
      latitude: location.latitude,
      longitude: location.longitude
    )
  end
end
