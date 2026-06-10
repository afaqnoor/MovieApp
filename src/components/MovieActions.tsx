"use client";

import React from "react";
import { useWatchlist } from "@/context/WatchlistContext";

interface MovieActionsProps {
    movie: {
        id: number | string;
        title: string;
        posterUrl: string | null;
    };
    hasTrailer: boolean;
}

export default function MovieActions({ movie, hasTrailer }: MovieActionsProps) {
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
    const inWatchlist = isInWatchlist(movie.id);

    const handleWatchlistClick = () => {
        if (inWatchlist) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist({
                id: movie.id,
                title: movie.title,
                posterUrl: movie.posterUrl,
            });
        }
    };

    return (
        <div className="flex gap-4">
            {hasTrailer && (
                <button className="bg-red-600 text-white px-8 py-3 rounded-md font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
                    <a href="#trailer" className="flex items-center gap-2">Watch Trailer</a>
                </button>
            )}
            <button 
                onClick={handleWatchlistClick}
                className={`${inWatchlist ? "bg-red-900/50 text-red-400 border border-red-900" : "bg-zinc-800 hover:bg-zinc-700 text-white"} px-8 py-3 rounded-md font-bold transition-colors`}
            >
                {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>
        </div>
    );
}
