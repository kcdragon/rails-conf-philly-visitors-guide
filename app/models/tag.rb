class Tag < ApplicationRecord
  has_many :place_tags, dependent: :destroy
  has_many :places, through: :place_tags

  validates_presence_of :name
end
