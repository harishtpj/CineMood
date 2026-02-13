import { Link } from '@inertiajs/react';

export default function EmptyState({ 
  icon = "🎬", 
  title = "No results found", 
  message = "Try searching with a different mood",
  showAction = false,
  actionText = "Go back",
  actionHref = "/"
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="text-8xl mb-6 animate-bounce">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">
        {title}
      </h2>
      <p className="text-slate-400 text-center mb-6 max-w-md">
        {message}
      </p>
      {showAction && (
        <Link 
          href={actionHref}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
}
