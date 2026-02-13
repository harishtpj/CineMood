import { useState } from 'react';

const moodSuggestions = [
  { emoji: '😊', mood: 'happy and uplifting', color: 'from-yellow-500 to-orange-500' },
  { emoji: '😢', mood: 'sad and emotional', color: 'from-blue-500 to-indigo-500' },
  { emoji: '😨', mood: 'scary and thrilling', color: 'from-red-500 to-purple-500' },
  { emoji: '😂', mood: 'funny and comedic', color: 'from-green-500 to-teal-500' },
  { emoji: '💕', mood: 'romantic and sweet', color: 'from-pink-500 to-rose-500' },
  { emoji: '🤔', mood: 'thoughtful and mysterious', color: 'from-slate-500 to-gray-500' },
];

export default function SearchBar({ value, onChange, onSubmit, processing }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(e);
    }
  };

  const handleSuggestionClick = (mood) => {
    onChange(mood);
  };

  return (
    <div className="max-w-3xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-2 mb-6">
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="How are you feeling today? (e.g., adventurous, melancholic, excited...)"
              className={`w-full p-4 pl-12 rounded-xl bg-slate-800/50 backdrop-blur-sm border-2 ${
                isFocused ? 'border-purple-500' : 'border-slate-700'
              } text-white placeholder-slate-400 focus:outline-none transition-all duration-200 shadow-lg`}
              disabled={processing}
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
          </div>
          
          <button 
            type="submit"
            disabled={processing || !value.trim()}
            className={`px-8 py-4 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg ${
              processing || !value.trim()
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
            }`}
          >
            {processing ? (
              <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Find Movies'
            )}
          </button>
        </div>
      </form>

      {/* Mood Suggestions */}
      <div className="mt-6">
        <p className="text-slate-400 text-sm mb-3 text-center">Or try these moods:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {moodSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion.mood)}
              disabled={processing}
              className={`px-4 py-2 rounded-full bg-gradient-to-r ${suggestion.color} text-white font-semibold transition-all duration-200 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
            >
              {suggestion.emoji} {suggestion.mood}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
