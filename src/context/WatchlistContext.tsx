"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface WatchlistMovie {
    id: number | string;
    title: string;
    posterUrl: string | null;
    price: number;
}

interface WatchlistContextType {
    watchlist: WatchlistMovie[];
    addToWatchlist: (movie: Omit<WatchlistMovie, "price">) => void;
    removeFromWatchlist: (id: number | string) => void;
    isInWatchlist: (id: number | string) => boolean;
    clearWatchlist: () => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

// Helper to generate a random price between $4.99 and $19.99
const generateRandomPrice = () => {
    const min = 4.99;
    const max = 19.99;
    return Number((Math.random() * (max - min) + min).toFixed(2));
};

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
    const [watchlist, setWatchlist] = useState<WatchlistMovie[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem("watchlist");
        if (stored) {
            try {
                setWatchlist(JSON.parse(stored));
            } catch (err) {
                console.error("Failed to parse watchlist from local storage", err);
            }
        }
    }, []);

    // Save to local storage whenever watchlist changes
    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (movie: Omit<WatchlistMovie, "price">) => {
        setWatchlist((prev) => {
            if (prev.find((m) => m.id === movie.id)) return prev;
            
            const price = generateRandomPrice();
            return [...prev, { ...movie, price }];
        });
    };

    const removeFromWatchlist = (id: number | string) => {
        setWatchlist((prev) => prev.filter((m) => m.id !== id));
    };

    const isInWatchlist = (id: number | string) => {
        return watchlist.some((m) => m.id === id);
    };
    
    const clearWatchlist = () => {
        setWatchlist([]);
    }

    return (
        <WatchlistContext.Provider
            value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, clearWatchlist }}
        >
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => {
    const context = useContext(WatchlistContext);
    if (context === undefined) {
        throw new Error("useWatchlist must be used within a WatchlistProvider");
    }
    return context;
};
