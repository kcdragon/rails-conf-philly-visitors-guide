class CalculateTimeBetweenVenueAndPlaceJob < ApplicationJob
  def perform(place_id)
    place = Place.find(place_id)
    place.update!(
      walking_time_in_seconds: Venue.walking_time_to_place_in_seconds(place),
    )
  end
end
