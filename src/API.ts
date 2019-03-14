const API_KEY = 'dff79e1ad1f7733132194c51b9183647';

export async function requestSearchResult(query: string) {
  let url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`;

  let response = await fetch(url);
  let result = await response.json();

  return result;
}

export async function requestNowPlaying() {
  let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;

  let response = await fetch(url);
  let result = await response.json();

  return result;
}

export async function requestMovieTrailer(movieID: number) {
  let url = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${API_KEY}&language=en-US`;

  let response = await fetch(url);
  let result = await response.json();

  return result;
}

export async function requestMovieDetail(movieID: number) {
  let url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`;

  let response = await fetch(url);
  let result = await response.json();

  return result;
}
