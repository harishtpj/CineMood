import { router } from '@inertiajs/core';
import { useForm, Link } from '@inertiajs/react';

export default function Home({ movies, fav_ids, fav_loc }) {
  const { data, setData, post, processing } = useForm({ mood: '' });

  const submit = (e) => {
    e.preventDefault();
    post('/recommend', { 
      preserveState: true, 
      preserveScroll: true, 
      replace: true 
    });
  };

  const toggleFavorite = (movie) => {
    if (fav_ids.includes(movie.id)) {
      router.delete(`${fav_loc}/${movie.id}`, { preserveScroll: true });
    } else {
      router.post(fav_loc, movie, { preserveScroll: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10 font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">CineMood AI 🎬</h1>
        <Link href={fav_loc} className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded font-bold">
          View Favorites ({fav_ids.length})
        </Link>
      </div>
      
      <form onSubmit={submit} className="max-w-xl mx-auto mb-12 flex gap-2">
        <input 
          type="text" 
          value={data.mood}
          onChange={e => setData('mood', e.target.value)}
          placeholder="How are you feeling today?"
          className="flex-1 p-4 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          disabled={processing}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-lg font-bold transition-colors"
        >
          {processing ? '...' : 'Go'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map(movie => (
          <div key={movie.id} className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 group relative">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
              className="w-full h-96 object-cover" 
            />
            
            {/* Star Button Overlay */}
            <button 
              onClick={() => toggleFavorite(movie)}
              className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill={fav_ids.includes(movie.id) ? "gold" : "none"} 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke={fav_ids.includes(movie.id) ? "gold" : "currentColor"} 
                className="w-8 h-8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.545.044.757.74.34 1.108l-4.148 3.658a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.148-3.658c-.417-.368-.205-1.064.34-1.108l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </button>

            <div className="p-4">
              <h2 className="text-xl font-bold truncate">{movie.title}</h2>
              <p className="text-slate-400 text-sm mt-2 line-clamp-3">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
