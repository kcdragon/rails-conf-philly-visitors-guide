class AddLatitudeAndLongitudeToPlaces < ActiveRecord::Migration[8.0]
  def change
    add_column :places, :latitude, :decimal, precision: 10, scale: 6
    add_column :places, :longitude, :decimal, precision: 10, scale: 6
  end
end
