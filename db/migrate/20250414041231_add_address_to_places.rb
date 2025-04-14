class AddAddressToPlaces < ActiveRecord::Migration[8.0]
  def change
    add_column :places, :address, :string
  end
end
