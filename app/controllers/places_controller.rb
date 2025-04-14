class PlacesController < ApplicationController
  def index
    @places = Place.all
    @tag_counts = Place.all.flat_map(&:tags).tally
    @all_tags = @tag_counts.keys.sort_by { |tag| -@tag_counts[tag] }
    
    if params[:tag].present?
      @places = @places.select { |place| place.tags.include?(params[:tag]) }
      @selected_tag = params[:tag]
    end
  end

  def show
    @place = Place.all.find { |p| p.name.parameterize == params[:id] }
    if @place.nil?
      redirect_to places_path, alert: "Place not found"
    end
  end
end
