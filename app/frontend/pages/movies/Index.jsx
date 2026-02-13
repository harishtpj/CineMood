import { router } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import SearchBar from '../../components/SearchBar';
import MovieCard from '../../components/MovieCard';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function Index({ movies = [], fav_ids = [], initial_mood = '', error = null }) {
  const { data, setData, post, processing } = useForm({ mood: initial_mood });
  const [isSearching, setIsSearching] = useState(false);

  // Handle search submission
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setIsSearching(true);
    post('/recommend', { 
      preserveState: true, 
      preserveScroll: false,
      onFinish: () => setIsSearching(false)
    });
  };

  // Toggle favorite status
  const toggleFavorite = (movie) => {
    const isFavourite = fav_ids.includes(movie.id);
    
    if (isFavourite) {
      // Remove from favorites using movie_id
      router.delete(`/favourites/by_movie/${movie.id}`, { 
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
          // Reload the page props to update fav_ids
          router.reload({ only: ['fav_ids'] });
        }
      });
    } else {
      // Add to favorites
      router.post('/favourites', {
        movie_id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path
      }, { 
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
          // Reload the page props to update fav_ids
          router.reload({ only: ['fav_ids'] });
        }
      });
    }
  };

  // Show error notification if present
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        router.reload({ only: ['error'] });
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <Layout title="🎬 CineMood AI" favCount={fav_ids.length}>
      {/* Error Banner */}
      {error && (
        <div className="mb-6 bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Search Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Discover Movies That Match Your Mood
          </h2>
          <p className="text-slate-400 text-lg">
            Tell us how you're feeling, and we'll find the perfect movies for you
          </p>
        </div>

        <SearchBar 
          value={data.mood}
          onChange={(value) => setData('mood', value)}
          onSubmit={handleSubmit}
          processing={processing || isSearching}
        />
      </div>

      {/* Results Section */}
      {isSearching || processing ? (
        <LoadingSpinner message="Finding perfect movies for your mood..." />
      ) : movies.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">
              Recommended for "{data.mood}"
            </h3>
            <span className="text-slate-400">
              {movies.length} movie{movies.length !== 1 ? 's' : ''} found
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map(movie => (
              <MovieCard 
                key={movie.id}
                movie={movie}
                isFavourite={fav_ids.includes(movie.id)}
                onToggleFavourite={toggleFavorite}
              />
            ))}
          </div>
        </div>
      ) : data.mood ? (
        <EmptyState 
          icon="🔍"
          title="No movies found"
          message={`We couldn't find any movies matching "${data.mood}". Try a different mood!`}
        />
      ) : (
        <EmptyState 
          icon="🎭"
          title="Ready to find your perfect movie?"
          message="Share your mood above and let AI work its magic to recommend movies just for you!"
        />
      )}
    </Layout>
  );
}
