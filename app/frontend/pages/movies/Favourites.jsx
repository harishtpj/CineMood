import { router } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '../../components/Layout';
import MovieCard from '../../components/MovieCard';
import EmptyState from '../../components/EmptyState';

export default function Favourites({ favourites = [] }) {
  const [removingId, setRemovingId] = useState(null);

  const removeFavourite = (favourite) => {
    if (confirm(`Remove "${favourite.title}" from your favorites?`)) {
      setRemovingId(favourite.id);
      
      router.delete(`/favourites/${favourite.id}`, {
        preserveState: false,
        preserveScroll: true,
        onFinish: () => setRemovingId(null)
      });
    }
  };

  // Convert favourites to movie format for MovieCard
  const moviesFromFavourites = favourites.map(fav => ({
    id: fav.movie_id,
    title: fav.title,
    poster_path: fav.poster_path,
    overview: '', // Not stored in favorites
    vote_average: null, // Not stored in favorites
    release_date: null // Not stored in favorites
  }));

  return (
    <Layout title="🌟 My Favorites" showBack={true}>
      {favourites.length === 0 ? (
        <EmptyState 
          icon="💫"
          title="No favorites yet"
          message="You haven't saved any movies yet. Start exploring and add your favorites!"
          showAction={true}
          actionText="Discover Movies"
          actionHref="/"
        />
      ) : (
        <div>
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Your Movie Collection
            </h2>
            <p className="text-slate-400">
              You have {favourites.length} favorite movie{favourites.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {moviesFromFavourites.map((movie, index) => (
              <div 
                key={favourites[index].id}
                className={`transition-opacity duration-300 ${
                  removingId === favourites[index].id ? 'opacity-50 pointer-events-none' : 'opacity-100'
                }`}
              >
                <MovieCard 
                  movie={movie}
                  isFavourite={true}
                  onToggleFavourite={() => removeFavourite(favourites[index])}
                  showRemoveButton={true}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}