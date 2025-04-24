class Place < ApplicationRecord
  has_many :place_tags, dependent: :destroy
  has_many :tags, through: :place_tags

  validates_presence_of :name, :slug

  after_save_commit :calculate_time_between_venue_and_place
  after_save_commit :geocode_place

  def google_maps_address
    address.present? ? address : "#{name},Philadelphia,PA"
  end

  private

  def calculate_time_between_venue_and_place
    if saved_change_to_name? || saved_change_to_address?
      CalculateTimeBetweenVenueAndPlaceJob.perform_later(self.id)
    end
  end

  def geocode_place
    if saved_change_to_name? || saved_change_to_address?
      GeocodePlaceJob.perform_later(self.id)
    end
  end
end
