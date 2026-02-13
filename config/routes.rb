Rails.application.routes.draw do
  # Redirect to localhost from 127.0.0.1 to use same IP address with Vite server
  constraints(host: "127.0.0.1") do
    get "(*path)", to: redirect { |params, req| "#{req.protocol}localhost:#{req.port}/#{params[:path]}" }
  end

  root 'movies#index'
  post '/recommend', to: 'movies#recommend'
  get '/recommend', to: redirect('/')
  resources :favourites, only: [:index, :create, :destroy]
  delete '/favourites/by_movie/:movie_id', to: 'favourites#destroy_by_movie', as: 'destroy_favourite_by_movie'
end
