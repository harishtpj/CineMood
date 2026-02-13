class FavouritesController < ApplicationController
  def index
    favs = Favourite.where(session_id: session[:user_uuid])
    render inertia: 'movies/Favourites', props: { favourites: favs }
  end

  def create
    Favourite.create!(
      movie_id: params[:movie_id],
      title: params[:title],
      poster_path: params[:poster_path],
      session_id: session[:user_uuid],
    )
    redirect_to root_path
  end

  def destroy(id)
    fav = Favourite.find_by(id: id, session_id: session[:user_uuid])
    fav.destroy if fav
    redirect_to root_path
  end
end
