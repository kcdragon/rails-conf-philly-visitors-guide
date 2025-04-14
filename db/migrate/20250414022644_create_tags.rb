class CreateTags < ActiveRecord::Migration[8.0]
  def change
    create_table :tags do |t|
      t.string :name
      t.integer :places_count, default: 0

      t.timestamps
    end
  end
end
