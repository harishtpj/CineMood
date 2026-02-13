import { Link } from '@inertiajs/react';

export default function Layout({ children, title = "CineMood AI", showBack = false, favCount = 0 }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-indigo-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {showBack && (
                <Link 
                  href="/" 
                  className="flex items-center gap-2 text-teal-300 hover:text-teal-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Back
                </Link>
              )}
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {title}
              </h1>
            </div>
            
            {!showBack && (
              <Link 
                href="/favourites" 
                className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 px-4 py-2 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-pink-500/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                My Favorites 
                {favCount > 0 && (
                  <span className="bg-white/95 text-pink-600 px-2 py-0.5 rounded-full text-sm font-bold">
                    {favCount}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 py-6 text-center text-slate-400">
          <p className="text-sm">
            🎬 Powered by TMDB & Gemini AI | Find your perfect movie based on your mood
          </p>
        </div>
      </footer>
    </div>
  );
}
