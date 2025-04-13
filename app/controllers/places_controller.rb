class PlacesController < ApplicationController
  def index
    @places = Place.all
  end

  def show
    @place = Place.all.find { |p| p.name.parameterize == params[:id] }
    if @place.nil?
      redirect_to places_path, alert: "Place not found"
    end
  end
end
