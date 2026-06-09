import { movieApi } from "@/services/movieApi";
import { Star, Clock, Calendar, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Genre, Video } from "@/types";

interface MoviePageProps {
    params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
    const { id } = await params;

    try {
        const [movie, videoData] = await Promise.all([
            movieApi.getMovieDetails(id),
            movieApi.getMovieVideos(id)
        ]);

        const trailer = videoData.results.find(
            (video: Video) => video.type === "Trailer" && video.site === "YouTube"
        ) || videoData.results[0];

        const backdropUrl = movie.backdrop_path
            ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original${movie.backdrop_path}`
            : null;

        const posterUrl = movie.poster_path
            ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`
            : null;

        return (
            <div className="min-h-screen relative pb-20">
                {/* Background Backdrop */}
                <div className="absolute inset-0 h-[80vh] w-full">
                    {backdropUrl && (
                        <Image
                            src={backdropUrl}
                            alt={movie.title || movie.name || "Backdrop"}
                            fill
                            className="object-cover opacity-20"
                            priority
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/60 to-zinc-950" />
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 lg:px-8 pt-32 relative z-10">
                    <div className="flex flex-col md:flex-row gap-12">
                        {/* Poster */}
                        <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
                            <div className="rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-900 aspect-[2/3] relative">
                                {posterUrl ? (
                                    <Image src={posterUrl} alt={movie.title || movie.name || "Poster"} fill className="object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-zinc-700">No Poster</div>
                                )}
                            </div>

                            {movie.tagline && (
                                <p className="mt-6 italic text-zinc-400 text-center text-sm">
                                    "{movie.tagline}"
                                </p>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                                {movie.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm md:text-base text-zinc-300">
                                <div className="flex items-center gap-2">
                                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                    <span className="font-bold text-white">{movie.vote_average.toFixed(1)}</span>
                                    <span className="text-zinc-500">/ 10</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-zinc-500" />
                                    <span>{movie.runtime} min</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-zinc-500" />
                                    <span>{new Date(movie.release_date || movie.first_air_date || "").toLocaleDateString()}</span>
                                </div>
                                {movie.status === "Released" && (
                                    <span className="px-2 py-0.5 bg-green-900/30 text-green-500 rounded border border-green-900/50 text-xs font-bold uppercase">
                                        Released
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2 mb-10">
                                {movie.genres.map((genre: Genre) => (
                                    <span
                                        key={genre.id}
                                        className="px-4 py-1.5 rounded-full bg-zinc-800 text-zinc-300 text-sm font-medium border border-zinc-700"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            <div className="mb-10">
                                <h2 className="text-xl font-bold text-white mb-4">Overview</h2>
                                <p className="text-lg leading-relaxed text-zinc-300 max-w-4xl">
                                    {movie.overview}
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <button className="bg-red-600 text-white px-8 py-3 rounded-md font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
                                    <a href={`#trailer`} className="flex items-center gap-2">Watch Trailer</a>
                                </button>
                                <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3 rounded-md font-bold transition-colors">
                                    Add to Watchlist
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Trailer Section */}
                    {trailer && (
                        <div id="trailer" className="mt-24">
                            <h2 className="text-3xl font-black text-white mb-8 border-l-4 border-red-600 pl-4">Watch Trailer</h2>
                            <div className="aspect-video w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 bg-black">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${trailer.key}`}
                                    title={trailer.name}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h2 className="text-2xl font-bold mb-4">Failed to load movie details</h2>
                <p className="text-zinc-400 mb-8">This movie might not exist or the API exploded.</p>
                <Link href="/" className="bg-red-600 text-white px-6 py-2 rounded-md font-bold">
                    Back to Home
                </Link>
            </div>
        );
    }
}
