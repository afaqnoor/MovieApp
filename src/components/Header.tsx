"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-40 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
                <div className="flex items-center gap-4 md:gap-8">
                    {/* Mobile Menu Toggle Button */}
                    <button 
                        className="md:hidden text-zinc-300 hover:text-white"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <Link href="/" onClick={closeMobileMenu} className="text-xl md:text-2xl font-black tracking-tighter text-red-600 hover:text-red-500 transition-colors">
                        MOVIEBOX
                    </Link>

                    {/* Desktop Navigation */}
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

                <div className="flex-1 max-w-sm ml-4 md:ml-0 flex justify-end">
                    <SearchBar />
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-zinc-950 border-b border-zinc-800 p-4 flex flex-col gap-4 shadow-xl shadow-black/50">
                    <Link href="/" onClick={closeMobileMenu} className="text-base font-medium text-zinc-300 hover:text-white transition-colors block py-2 border-b border-zinc-800/50">
                        Home
                    </Link>
                    <Link href="/movies" onClick={closeMobileMenu} className="text-base font-medium text-zinc-300 hover:text-white transition-colors block py-2 border-b border-zinc-800/50">
                        Movies
                    </Link>
                    <Link href="/tv" onClick={closeMobileMenu} className="text-base font-medium text-zinc-300 hover:text-white transition-colors block py-2 border-b border-zinc-800/50">
                        TV Shows
                    </Link>
                    <Link href="/watchlist" onClick={closeMobileMenu} className="text-base font-bold text-red-500 hover:text-red-400 transition-colors block py-2">
                        Watchlist
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;
