import { useForm } from '@inertiajs/react';

export default function Home({ movies }) {
  const { data, setData, post, processing } = useForm({ mood: '' });

  const submit = (e) => {
    e.preventDefault();
    post('/recommend');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <h1 className="text-4xl font-bold mb-8 text-center">CineMood AI 🎬</h1>
      
      <form onSubmit={submit} className="max-w-md mx-auto mb-12">
        <input 
          type="text" 
          value={data.mood}
          onChange={e => setData('mood', e.target.value)}
          placeholder="How are you feeling?"
          className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-blue-500"
        />
        <button 
          disabled={processing}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold transition"
        >
          {processing ? 'Asking AI...' : 'Get Recommendations'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {movies.map(movie => (
          <div key={movie.id} className="bg-slate-800 p-4 rounded shadow-lg border border-slate-700">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="rounded mb-4" />
            <h2 className="text-xl font-bold">{movie.title}</h2>
            <p className="text-slate-400 text-sm mt-2 line-clamp-3">{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
