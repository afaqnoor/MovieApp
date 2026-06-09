import axiosInstance from './axios';
import { MovieResponse, MovieDetails, VideoResponse } from '../types';

export const movieApi = {
    getTrending: async (page: number = 1): Promise<MovieResponse> => {
        const { data } = await axiosInstance.get('/trending/movie/day', {
            params: { page },
        });
        return data;
    },

    getPopular: async (page: number = 1): Promise<MovieResponse> => {
        const { data } = await axiosInstance.get('/movie/popular', {
            params: { page },
        });
        return data;
    },

    searchMovies: async (query: string, page: number = 1): Promise<MovieResponse> => {
        const { data } = await axiosInstance.get('/search/movie', {
            params: { query, page },
        });
        return data;
    },

    getMovieDetails: async (id: string): Promise<MovieDetails> => {
        const { data } = await axiosInstance.get(`/movie/${id}`);
        return data;
    },

    getMovieVideos: async (id: string): Promise<VideoResponse> => {
        const { data } = await axiosInstance.get(`/movie/${id}/videos`);
        return data;
    },

    getTrendingTV: async (page: number = 1): Promise<MovieResponse> => {
        const { data } = await axiosInstance.get('/trending/tv/day', {
            params: { page },
        });
        return data;
    },

    getPopularTV: async (page: number = 1): Promise<MovieResponse> => {
        const { data } = await axiosInstance.get('/tv/popular', {
            params: { page },
        });
        return data;
    },
};
