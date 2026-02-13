class MoviesController < ApplicationController
  def index
    render inertia: 'movies/Index', props: { 
      movies: [],
      fav_ids: cur_user_favs,
      initial_mood: params[:mood] || ''
    }
  end

  def recommend
    begin
      movies = MovieService.get_recommendations(params[:mood])
      render inertia: 'movies/Index', props: { 
        movies: movies || [], 
        fav_ids: cur_user_favs,
        initial_mood: params[:mood]
      }
    rescue => e
      Rails.logger.error "Movie recommendation error: #{e.message}"
      render inertia: 'movies/Index', props: { 
        movies: [],
        fav_ids: cur_user_favs,
        initial_mood: params[:mood],
        error: 'Failed to get recommendations. Please try again.'
      }
    end
  end

  private
  def cur_user_favs
    Favourite.where(session_id: session[:user_uuid]).pluck(:movie_id).map(&:to_i)
  end
end
