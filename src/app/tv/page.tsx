import { movieApi } from "@/services/movieApi";
import MovieGrid from "@/components/MovieGrid";

export default async function TVShowsPage() {
    const popularTV = await movieApi.getPopularTV().then(res => res.results);

    return (
        <div className="container mx-auto px-4 lg:px-8 py-20">
            <h1 className="text-4xl font-black text-white mb-12 border-l-8 border-red-600 pl-6 uppercase tracking-tighter">
                TV Shows
            </h1>
            <MovieGrid initialMovies={popularTV} type="popular" category="tv" />
        </div>
    );
}
