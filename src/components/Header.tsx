import React from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';

const Header = () => {
    return (
        <header className="sticky top-0 z-40 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-2xl font-black tracking-tighter text-red-600 hover:text-red-500 transition-colors">
                        MOVIEBOX
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            Home
                        </Link>
                        <Link href="/movies" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            Movies
                        </Link>
                        <Link href="/tv" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            TV Shows
                        </Link>
                        <Link href="/watchlist" className="text-sm font-bold text-red-500 hover:text-red-400 transition-colors">
                            Watchlist
                        </Link>
                    </nav>
                </div>

                <SearchBar />
            </div>
        </header>
    );
};

export default Header;
