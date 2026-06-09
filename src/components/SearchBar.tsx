'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { movieApi } from '../services/movieApi';
import { Movie } from '../types';
import Link from 'next/link';
import Image from 'next/image';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        const search = async () => {
            if (!debouncedQuery.trim()) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const response = await movieApi.searchMovies(debouncedQuery);
                setResults(response.results.slice(0, 5));
                setIsOpen(true);
            } catch (error) {
                console.error('Search failed:', error);
            } finally {
                setIsLoading(false);
            }
        };

        search();
    }, [debouncedQuery]);

    return (
        <div className="relative w-full max-w-md">
            <div className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    className="w-full rounded-full bg-zinc-800/80 py-2 pl-10 pr-10 text-sm text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-red-600 transition-all border border-zinc-700"
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery('');
                            setResults([]);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                        <X className="h-4 w-4 text-zinc-400 hover:text-white" />
                    </button>
                )}
            </div>

            {isOpen && (query || results.length > 0) && (
                <div className="absolute top-full mt-2 w-full rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl z-50 overflow-hidden">
                    {isLoading ? (
                        <div className="p-4 text-center text-sm text-zinc-400">Searching...</div>
                    ) : results.length > 0 ? (
                        <div className="flex flex-col">
                            {results.map((movie) => (
                                <Link
                                    key={movie.id}
                                    href={`/movie/${movie.id}`}
                                    onClick={() => {
                                        setIsOpen(false);
                                        setQuery('');
                                    }}
                                    className="flex items-center gap-3 p-3 hover:bg-zinc-800 transition-colors border-b border-zinc-800/50 last:border-0"
                                >
                                    <div className="relative h-12 w-8 shrink-0 overflow-hidden rounded shadow-md">
                                        {movie.poster_path ? (
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w92${movie.poster_path}`}
                                                alt={movie.title || 'Movie'}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-zinc-800 flex items-center justify-center text-[8px]">
                                                N/A
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="text-sm font-medium text-white truncate">{movie.title}</span>
                                        <span className="text-xs text-zinc-400">
                                            {movie.release_date?.split('-')[0] || 'N/A'}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        query && <div className="p-4 text-center text-sm text-zinc-400">No results found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
