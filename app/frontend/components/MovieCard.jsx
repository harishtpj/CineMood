import { useState } from 'react';

export default function MovieCard({ movie, isFavourite, onToggleFavourite, showRemoveButton = false }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  const handleToggleFavourite = (e) => {
    e.stopPropagation();
    onToggleFavourite(movie);
  };

  return (
    <div 
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-slate-700/50 hover:border-indigo-500/60 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster Image */}
      <div className="relative overflow-hidden aspect-[2/3]">
        <img 
          src={imageError ? 'https://via.placeholder.com/500x750?text=No+Poster' : posterUrl}
          alt={movie.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
          onError={() => setImageError(true)}
        />
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-sm text-slate-300 line-clamp-4">
              {movie.overview || 'No description available'}
            </p>
            {movie.vote_average && (
              <div className="flex items-center gap-2 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Favourite Toggle Button */}
        <button 
          onClick={handleToggleFavourite}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-all duration-200 backdrop-blur-sm group/btn transform hover:scale-110"
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill={isFavourite ? "#fbbf24" : "none"} 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke={isFavourite ? "#fbbf24" : "white"} 
            className="w-7 h-7 transition-all duration-200"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.545.044.757.74.34 1.108l-4.148 3.658a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.148-3.658c-.417-.368-.205-1.064.34-1.108l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" 
            />
          </svg>
        </button>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h2 className="text-lg font-bold truncate mb-1" title={movie.title}>
          {movie.title}
        </h2>
        {movie.release_date && (
          <p className="text-slate-400 text-sm">
            {new Date(movie.release_date).getFullYear()}
          </p>
        )}
        
        {showRemoveButton && (
          <button 
            onClick={handleToggleFavourite}
            className="mt-3 w-full bg-red-500/20 hover:bg-red-600 text-red-400 hover:text-white py-2 rounded-lg transition-all duration-200 font-semibold flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
