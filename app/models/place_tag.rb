class PlaceTag < ApplicationRecord
  belongs_to :place
  belongs_to :tag, counter_cache: :places_count
end
