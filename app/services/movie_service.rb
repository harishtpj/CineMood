require 'gemini-ai'

class MovieService
    def self.get_recommendations(mood)
        client = GeminiAi::Client.new(api_key: ENV['GEMINI_API_KEY'], version: 'v1beta')
        prompt = "Convert the following mood into a comma-separated list of exactly 3 TMDB genre IDs: '#{mood}'. Return ONLY the IDs."
        genre_ids = client.generate_content({contents: {
                role: 'user',
                parts: { text: prompt }
            }}, model: 'gemini-3-flash-preview').dig('candidates', 0, 'content', 'parts', 0, 'text').strip

        tmdb_url = "https://api.themoviedb.org/3/discover/movie"
        resp = HTTParty.get(tmdb_url, query: {
            api_key: ENV['TMDB_API_KEY'],
            with_genres: genre_ids,
            sort_by: 'popularity.desc'
        })

        resp.parsed_response['results']
    end
end