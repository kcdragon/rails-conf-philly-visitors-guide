class Place
  include ActiveModel::API

  attr_accessor :name, :description, :tags

  validates_presence_of :name

  def self.all
    YAML.load_file(Rails.root.join("data", "places.yml"))["places"].map do |place|
      Place.new(place)
    end
  end
end
