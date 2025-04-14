class PlacesController < ApplicationController
  def index
    @places = Place.all.order(:name)
    @tags = Tag.where("places_count > ?", 0).order(places_count: :desc)
    @display_tags = ActiveModel::Type::Boolean.new.cast(params[:show_all_tags]) ? @tags : @tags.first(10)
    
    tag_name = params[:tag_name]
    if tag_name.present?
      @places = @places.joins(:tags).where(tags: { name: tag_name })
      @selected_tag_name = tag_name
    end
  end

  def show
    @place = Place.find(params[:id])
    if @place.nil?
      redirect_to places_path, alert: "Place not found"
    end
  end
end
