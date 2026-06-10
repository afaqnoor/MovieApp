import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { WatchlistProvider } from "@/context/WatchlistContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MovieBox | Your Ultimate Movie Guide",
  description: "Browse trending, popular, and search for your favorite movies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-zinc-950 text-white min-h-screen flex flex-col`}>
        <WatchlistProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
        </WatchlistProvider>
        <footer className="border-t border-zinc-900 py-10 mt-20">
          <div className="container mx-auto px-4 text-center text-zinc-500 text-sm">
            © {new Date().getFullYear()} MOVIEBOX. Built with Next.js 15.
          </div>
        </footer>
      </body>
    </html>
  );
}
