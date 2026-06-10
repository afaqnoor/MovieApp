"use client";

import React, { useState } from "react";
import { useWatchlist } from "@/context/WatchlistContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (movie: any) => {
    try {
      setLoading(movie.id);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              id: movie.id,
              title: movie.title,
              price: movie.price,
              posterUrl: movie.posterUrl,
            },
          ],
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: "Failed to initiate checkout" }));
        console.error("Checkout error:", data.error);
        alert(`Checkout failed: ${data.error}`);
        setLoading(null);
        return;
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed");
      setLoading(null);
    }
  };

  if (watchlist.length === 0) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-20 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-black mb-6 text-white text-center">
          Your Watchlist
        </h1>
        <p className="text-xl text-zinc-400 mb-8 text-center">
          Your watchlist is currently empty. Go find some awesome movies!
        </p>
        <Link
          href="/"
          className="bg-red-600 text-white px-8 py-3 rounded-md font-bold hover:bg-red-700 transition-colors"
        >
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-20">
      <h1 className="text-3xl md:text-4xl font-black mb-12 text-white border-l-4 border-red-600 pl-4">
        Your Watchlist
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {watchlist.map((movie) => (
          <div
            key={movie.id}
            className="bg-zinc-600 border border-zinc-500 rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="relative aspect-[2/3] w-full">
              {movie.posterUrl ? (
                <Image
                  src={movie.posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-zinc-500 flex items-center justify-center">
                  <span className="text-zinc-500">No Image</span>
                </div>
              )}
              <button
                onClick={() => removeFromWatchlist(movie.id)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-red-600 p-2 rounded-full text-white backdrop-blur-md transition-colors"
                title="Remove from watchlist"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h2
                className="text-2xl font-bold text-white mb-2 line-clamp-1"
                title={movie.title}
              >
                {movie.title}
              </h2>
              <div className="mt-auto pt-6 flex items-center justify-between">
                <div className="text-2xl font-black text-green-500">
                  ${movie.price.toFixed(2)}
                </div>
                <button
                  onClick={() => handleCheckout(movie)}
                  disabled={loading === movie.id}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:text-zinc-400 text-white px-6 py-2 rounded-md font-bold transition-colors flex items-center gap-2"
                >
                  {loading === movie.id ? "Processing..." : "Pay with Stripe"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
