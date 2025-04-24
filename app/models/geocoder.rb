class Geocoder
  Location = Struct.new(:latitude, :longitude)

  def self.location_for(address)
    api_key = Rails.application.credentials.dig(:google, :maps, :private, :api_key)
    url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{address}&key=#{api_key}"
    response = Net::HTTP.get(URI(url))

    begin
      location = JSON.parse(response)["results"][0]["geometry"]["location"]
      Location.new(location["lat"], location["lng"])
    rescue => e
      Rails.logger.error("Error geocoding address #{address}: #{e.message}")
      nil
    end
  end
end
