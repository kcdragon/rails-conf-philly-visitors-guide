class PlacesController < ApplicationController
  def index
    @places = Place.all.order(walking_time_in_seconds: :asc)
    @tags = Tag.where("places_count > ?", 0).order(places_count: :desc)
    @view = params[:view] || "list" # Default to list view if not specified

    tag_name = params[:tag_name]
    if tag_name.present?
      @places = @places.joins(:tags).where(tags: { name: tag_name })
      @selected_tag_name = tag_name
    end

    walking_time = params[:walking_time]
    if walking_time.present?
      max_seconds =
        case walking_time
        when "15"
          15 * 60
        when "30"
          30 * 60
        end
      @places = @places.where("walking_time_in_seconds <= ?", max_seconds) if max_seconds
      @selected_walking_time = walking_time
    end
  end

  def show
    @place = Place.find(params[:id])
  end
end
