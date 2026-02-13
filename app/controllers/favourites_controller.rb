class FavouritesController < ApplicationController
  def index
    favs = Favourite.where(session_id: session[:user_uuid]).order(created_at: :desc)
    render inertia: 'movies/Favourites', props: { 
      favourites: favs.as_json(only: [:id, :movie_id, :title, :poster_path, :created_at])
    }
  end

  def create
    isExisting = Favourite.find_by(
      movie_id: params[:movie_id],
      session_id: session[:user_uuid]
    )
    
    unless isExisting
      Favourite.create!(
        movie_id: params[:movie_id],
        title: params[:title],
        poster_path: params[:poster_path],
        session_id: session[:user_uuid]
      )
    end
    
    head :ok
  end

  def destroy
    fav = Favourite.find_by(id: params[:id], session_id: session[:user_uuid])
    fav&.destroy
    
    head :ok
  end
end
