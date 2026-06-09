import { movieApi } from "@/services/movieApi";
import MovieGrid from "@/components/MovieGrid";

export default async function MoviesPage() {
    const popularMovies = await movieApi.getPopular().then(res => res.results);

    return (
        <div className="container mx-auto px-4 lg:px-8 py-20">
            <h1 className="text-4xl font-black text-white mb-12 border-l-8 border-red-600 pl-6 uppercase tracking-tighter">
                Explore Movies
            </h1>
            <MovieGrid initialMovies={popularMovies} type="popular" />
        </div>
    );
}
