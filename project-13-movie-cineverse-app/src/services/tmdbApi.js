// axios
import axios from "axios";

// 🔑 Config
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = `https://api.themoviedb.org/3`;
export const BASE_IMAGE_URL = `https://image.tmdb.org/t/p/w500`;

// Axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

// -------------------- Movies --------------------

// Get popular movies
export const getPopularMovies = (page = 1) =>
    axiosInstance.get("/movie/popular", { params: { page } }).then(res => res.data);

// Get top rated movies
export const getTopRatedMovies = (page = 1) =>
    axiosInstance.get("/movie/top_rated", { params: { page } }).then(res => res.data);

// Get upcoming movies
export const getUpcomingMovies = (page = 1) =>
    axiosInstance.get("/movie/upcoming", { params: { page } }).then(res => res.data);

// Get movie details
export const getMovieDetails = (id) =>
    axiosInstance.get(`/movie/${id}`).then(res => res.data);

// Get movie credits (cast & crew)
export const getMovieCredits = (id) =>
    axiosInstance.get(`/movie/${id}/credits`).then(res => res.data);

// Get movie videos (trailers)
export const getMovieVideos = (id) =>
    axiosInstance.get(`/movie/${id}/videos`).then(res => res.data);

// Get similar movies
export const getSimilarMovies = (id) =>
    axiosInstance.get(`/movie/${id}/similar`).then(res => res.data);

// -------------------- TV Shows --------------------

// Get popular TV shows
export const getPopularTV = (page = 1) =>
    axiosInstance.get("/tv/popular", { params: { page } }).then(res => res.data);

// Get top rated TV shows
export const getTopRatedTV = (page = 1) =>
    axiosInstance.get("/tv/top_rated", { params: { page } }).then(res => res.data);

// Get currently airing TV shows
export const getOnTheAirTV = (page = 1) =>
    axiosInstance.get("/tv/on_the_air", { params: { page } }).then(res => res.data);

// Get TV show details
export const getTVDetails = (id) =>
    axiosInstance.get(`/tv/${id}`).then(res => res.data);

// Get TV show credits
export const getTVCredits = (id) =>
    axiosInstance.get(`/tv/${id}/credits`).then(res => res.data);

// Get TV show videos (trailers)
export const getTVVideos = (id) =>
    axiosInstance.get(`/tv/${id}/videos`).then(res => res.data);

// Get similar TV shows
export const getSimilarTV = (id) =>
    axiosInstance.get(`/tv/${id}/similar`).then(res => res.data);

// -------------------- Search --------------------

// Search movies
export const searchMovies = (query, page = 1) =>
    axiosInstance.get("/search/movie", { params: { query, page } }).then(res => res.data);

// Search TV shows
export const searchTV = (query, page = 1) =>
    axiosInstance.get("/search/tv", { params: { query, page } }).then(res => res.data);

// Multi-search (movies + tv + people)
export const searchMulti = (query, page = 1) =>
    axiosInstance.get("/search/multi", { params: { query, page } }).then(res => res.data);

// -------------------- Genres --------------------

// Get movie genres
export const getMovieGenres = () =>
    axiosInstance.get("/genre/movie/list").then(res => res.data);

// Get TV genres
export const getTVGenres = () =>
    axiosInstance.get("/genre/tv/list").then(res => res.data);

// -------------------- Extras --------------------

// Trending movies today
export const getTrendingMovies = () =>
    axiosInstance.get("/trending/movie/day").then(res => res.data);

// Trending TV today
export const getTrendingTV = () =>
    axiosInstance.get("/trending/tv/day").then(res => res.data);

// Get person details
export const getPersonDetails = (id) =>
    axiosInstance.get(`/person/${id}`).then(res => res.data);

// Get person combined credits
export const getPersonCredits = (id) =>
    axiosInstance.get(`/person/${id}/combined_credits`).then(res => res.data);
