Rails.application.routes.draw do
  # Redirect to localhost from 127.0.0.1 to use same IP address with Vite server
  constraints(host: "127.0.0.1") do
    get "(*path)", to: redirect { |params, req| "#{req.protocol}localhost:#{req.port}/#{params[:path]}" }
  end

  root 'movies#index'
  post '/recommend', to: 'movies#recommend'
  get '/favourites', to: 'favourites#index'
  resource :favourites, only: [:create, :destroy]
end
