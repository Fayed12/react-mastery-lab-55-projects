// axios
import axios from "axios";

// Config
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = `https://api.themoviedb.org/3`;
export const BASE_IMAGE_URL = `https://image.tmdb.org/t/p/original`;

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

// -------------------- Search --------------------

// Multi-search (movies + tv + people)
export const searchMulti = (query, page = 1) =>
    axiosInstance.get("/search/multi", { params: { query, page } }).then(res => res.data);

// -------------------- Extras --------------------

// Get person details
export const getPersonDetails = (id) =>
    axiosInstance.get(`/person/${id}`).then(res => res.data);
