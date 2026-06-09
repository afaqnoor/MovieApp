import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '../types';
import { Star } from 'lucide-react';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    const imageUrl = movie.poster_path
        ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`
        : null;

    const title = movie.title || movie.name || 'Untitled';
    const date = movie.release_date || movie.first_air_date || '';

    return (
        <Link href={`/movie/${movie.id}`}>
            <div className="group relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer bg-zinc-900 aspect-[2/3] border border-zinc-800 shadow-lg">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-opacity duration-300 group-hover:opacity-70"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-zinc-500 text-center p-2">
                        {title}
                    </div>
                )}
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black via-black/60 to-transparent">
                    <h3 className="text-sm font-bold text-white line-clamp-2">{title}</h3>
                    <div className="mt-2 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-zinc-300">{movie.vote_average?.toFixed(1)}</span>
                        <span className="text-xs text-zinc-400 ml-auto">{date ? new Date(date).getFullYear() : 'N/A'}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
