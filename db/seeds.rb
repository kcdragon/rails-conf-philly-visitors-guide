# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

place_data_list = YAML.load_file(Rails.root.join("data", "places.yml"))["places"]

duplicate_slugs = place_data_list.group_by { |place| place['slug'] }.select { |slug, places| places.size > 1 }
if duplicate_slugs.any?
  raise "Duplicate slug found in places.yml: #{duplicate_slugs.inspect}"
end

missing_slugs = place_data_list.select { |place| place['slug'].blank? }
if missing_slugs.any?
  raise "Missing slug in places.yml: #{missing_slugs.inspect}"
end

slugs = place_data_list.map { |place| place['slug'] }
places_removed_from_yaml_file = Place.where.not(slug: slugs)
places_removed_from_yaml_file.destroy_all

place_data_list.map do |place_yaml|
  slug = place_yaml['slug']
  place = Place.find_or_initialize_by(slug: slug)
  place.name = place_yaml['name']
  place.description = place_yaml['description']
  place.address = place_yaml['address']
  place.save!

  tag_names = place_yaml['tags']
  tags = tag_names.map do |tag_name|
    Tag.find_or_create_by!(name: tag_name)
  end

  tags.each do |tag|
    PlaceTag.find_or_create_by!(place: place, tag: tag)
  end
end
