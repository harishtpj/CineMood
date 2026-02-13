class CreateFavourites < ActiveRecord::Migration[8.1]
  def change
    create_table :favourites do |t|
      t.string :movie_id
      t.string :title
      t.string :poster_path
      t.string :session_id

      t.timestamps
    end
  end
end
