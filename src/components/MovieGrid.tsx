'use client';

import React, { useState } from 'react';
import { Movie } from '@/types';
import MovieCard from './MovieCard';
import { movieApi } from '@/services/movieApi';
import Loader from './Loader';
import { ChevronDown } from 'lucide-react';

interface MovieGridProps {
    initialMovies: Movie[];
    type: 'popular' | 'trending';
    category?: 'movie' | 'tv';
}

const MovieGrid = ({ initialMovies, type, category = 'movie' }: MovieGridProps) => {
    const [movies, setMovies] = useState<Movie[]>(initialMovies);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = async () => {
        setIsLoading(true);
        const nextPage = page + 1;

        try {
            let response;
            if (category === 'movie') {
                response = type === 'popular'
                    ? await movieApi.getPopular(nextPage)
                    : await movieApi.getTrending(nextPage);
            } else {
                response = type === 'popular'
                    ? await movieApi.getPopularTV(nextPage)
                    : await movieApi.getTrendingTV(nextPage);
            }

            const newMovies = response.results;

            if (newMovies.length === 0) {
                setHasMore(false);
            } else {
                setMovies((prev) => [...prev, ...newMovies]);
                setPage(nextPage);
            }
        } catch (error) {
            console.error('Failed to load more movies:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 w-full">
                {movies.map((movie, index) => (
                    <MovieCard key={`${movie.id}-${index}`} movie={movie} />
                ))}
            </div>

            {hasMore && (
                <button
                    onClick={loadMore}
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3 rounded-full font-bold transition-all border border-zinc-700 shadow-lg disabled:opacity-50"
                >
                    {isLoading ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                        <>
                            Load More <ChevronDown className="h-5 w-5" />
                        </>
                    )}
                </button>
            )}
        </div>
    );
};

export default MovieGrid;
