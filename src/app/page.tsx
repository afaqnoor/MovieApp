import { movieApi } from "@/services/movieApi";
import MovieCard from "@/components/MovieCard";
import MovieGrid from "@/components/MovieGrid";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const [trendingMovies, popularMovies] = await Promise.all([
    movieApi.getTrending().then(res => res.results),
    movieApi.getPopular().then(res => res.results)
  ]);

  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full bg-zinc-900 border-b border-zinc-800">
        {trendingMovies[0] && (
          <div className="absolute inset-0">
            <Image
              src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original${trendingMovies[0].backdrop_path}`}
              alt={trendingMovies[0].title || trendingMovies[0].name || "Hero"}
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-16 lg:p-24 max-w-3xl">
              <span className="text-red-600 font-bold tracking-widest text-sm uppercase mb-4 block">Trending Now</span>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                {trendingMovies[0].title || trendingMovies[0].name}
              </h1>
              <p className="text-lg text-zinc-300 line-clamp-3 mb-8">
                {trendingMovies[0].overview}
              </p>
              <div className="flex gap-4">
                <Link
                  href={`/movie/${trendingMovies[0].id}#trailer`}
                  className="bg-white text-black px-8 py-3 rounded-md font-bold hover:bg-zinc-200 transition-colors"
                >
                  Watch Now
                </Link>
                <Link
                  href={`/movie/${trendingMovies[0].id}`}
                  className="bg-zinc-800/80 text-white px-8 py-3 rounded-md font-bold hover:bg-zinc-700 transition-colors backdrop-blur-md"
                >
                  More Info
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Trending Section */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white border-l-4 border-red-600 pl-4">Trending Movies</h2>
          <button className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors">
            View All <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {trendingMovies.slice(1, 13).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Popular Section with Load More */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white border-l-4 border-red-600 pl-4">Popular Movies</h2>
        </div>
        <MovieGrid initialMovies={popularMovies} type="popular" />
      </section>
    </div>
  );
}
