class MoviesController < ApplicationController
  def index
    render inertia: 'movies/Index', props: { movies: [] }
  end

  def recommend
    mood = params[:mood]
    movies = MovieService.get_recommendations(mood)
    render inertia: 'movies/Index', props: { movies: movies }
  end
end
