class AddWalkingTimeInSecondsToPlaces < ActiveRecord::Migration[8.0]
  def change
    add_column :places, :walking_time_in_seconds, :integer
  end
end
