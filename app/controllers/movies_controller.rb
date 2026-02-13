class MoviesController < ApplicationController
  def index
    render inertia: { movies: [] }
  end

  def recommend
    mood = params[:mood]
    movies = MovieService.get_recommendations(mood)
    render inertia: { movies: movies }
  end
end
