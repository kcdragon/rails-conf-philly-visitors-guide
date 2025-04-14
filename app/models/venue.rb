class Venue
  def self.name
    "Sheraton Philadelphia Downtown"
  end

  def self.address
    "201 N 17th St, Philadelphia, PA 19103"
  end

  def self.walking_time_to_place_in_seconds(place)
    self.time_to_place_in_seconds(place, "walking")
  end

  def self.time_to_place_in_seconds(place, mode)
    api_key = Rails.application.credentials.dig(:google, :maps, :distance_matrix, :api_key)
    destination = place.google_maps_address
    url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=#{self.address}&destinations=#{destination}&units=imperial&mode=#{mode}&key=#{api_key}"
    response = Net::HTTP.get(URI(url))
    JSON.parse(response)['rows'][0]['elements'][0]['duration']['value']
  end
end
