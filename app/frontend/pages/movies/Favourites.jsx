import { Link, router } from '@inertiajs/react';

export default function Favorites({ favourites }) {
  
  const removeFavorite = (id) => {
    if(confirm("Remove from favorites?")) {
      router.delete(`/favorites/${movie_id}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10 font-sans">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300">← Back to Search</Link>
        <h1 className="text-3xl font-bold">My Favorites 🌟</h1>
      </div>

      {favourites.length === 0 ? (
        <div className="text-center text-slate-500 mt-20">
          <p className="text-xl">You haven't saved any movies yet.</p>
          <Link href="/" className="underline hover:text-white">Go find some!</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {favourites.map(fav => (
            <div key={fav.id} className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700">
              <img 
                src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`} 
                alt={fav.title} 
                className="w-full h-80 object-cover" 
              />
              <div className="p-4">
                <h2 className="text-lg font-bold truncate">{fav.title}</h2>
                <button 
                  onClick={() => removeFavorite(fav.movie_id)}
                  className="mt-3 w-full bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white py-2 rounded transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}