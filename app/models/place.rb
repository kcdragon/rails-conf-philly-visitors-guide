class Place < ApplicationRecord
  has_many :place_tags, dependent: :destroy
  has_many :tags, through: :place_tags

  validates_presence_of :name, :slug

  def google_maps_address
    address.present? ? address : "#{name},Philadelphia,PA"
  end
end
