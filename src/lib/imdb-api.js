
const APIKEY = '5240e3474ef52daa64069f65f66c7618';
const API_URL= 'https://api.themoviedb.org/3';

export async function SearchMovie(query) {
    const response = await fetch(API_URL + `/search/movie?query=${encodeURI(query)}&api_key=${APIKEY}`);
    const data = await response.json();
    return data.results;
}
  

export async function getLatestMovies() {
    const response = await fetch(API_URL + `/movie/popular?api_key=${APIKEY}`);
    const data = await response.json();
    return data.results;
}
