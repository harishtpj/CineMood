class MoviesController < ApplicationController
  def index
    render inertia: 'movies/Index', props: { 
      movies: [],
      fav_ids: cur_user_favs,
      fav_loc: favourites_path
    }
  end

  def recommend
    movies = MovieService.get_recommendations(params[:mood])
    render inertia: 'movies/Index', props: { 
      movies: movies, 
      fav_ids: cur_user_favs,
      fav_loc: favourites_path
    }
  end

  private
  def cur_user_favs
    Favourite.where(session_id: session[:user_uuid]).pluck(:movie_id).map(&:to_i)
  end
end
