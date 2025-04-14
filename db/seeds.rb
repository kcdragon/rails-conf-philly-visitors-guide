# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

YAML.load_file(Rails.root.join("data", "places.yml"))["places"].map do |place_yaml|
  slug = place_yaml['slug']
  place = Place.find_or_initialize_by(slug: slug)
  place.name = place_yaml['name']
  place.description = place_yaml['description']
  place.save!

  tag_names = place_yaml['tags']
  tags = tag_names.map do |tag_name|
    Tag.find_or_create_by!(name: tag_name)
  end
  
  tags.each do |tag|
    PlaceTag.find_or_create_by!(place: place, tag: tag)
  end
end
