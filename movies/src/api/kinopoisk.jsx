const API_KEY = process.env.REACT_APP_API_KEY;
const headers = {
  "X-API-KEY": API_KEY,
  "Content-Type": "application/json",
};

export async function fetchCategoryFilm() {
  const res = await fetch(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films?type=FILM&order=NUM_VOTE&ratingFrom=6&yearFrom=2010&yearTo=2025&page=1`,
    { headers }
  );
  const data = await res.json();
  const films = data.films || data.items || [];

  const blocked = ["мультфильм", "аниме", "для детей", "Жанр не указан", "сериал"];
  const filtered = films.filter(movie => !movie.genres?.some(g => blocked.includes(g.genre.toLowerCase())));

  return filtered.slice(0, 20);
}


export async function fetchTopRatedMovies() {
  const res = await fetch(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films?type=FILM&ratingFrom=8.5&votesFrom=1000&order=RATING&yearFrom=1970&yearTo=2025&page=1`,
    { headers }
  );
  const data = await res.json();
  const films = data.items || data.films || [];

  const blocked = ["мультфильм", "аниме", "для детей", "Жaнр не указан", "сериал"];
  const filtered = films.filter(movie => !movie.genres?.some(g => blocked.includes(g.genre.toLowerCase())));

  return filtered.slice(0, 20);
}



export async function fetchNewReleases() {
  const res = await fetch(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films?order=NUM_VOTE&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=2025&yearTo=2025&page=1`,
    { headers }
  );
  const data = await res.json();
  return (data.items || data.films || []).slice(0, 20);
}

export async function fetchSeries() {
  const res = await fetch(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films?type=TV_SERIES&order=NUM_VOTE&ratingFrom=7&ratingTo=10&yearFrom=2000&yearTo=2025&page=1`,
    { headers }
  );
  const data = await res.json();
  return (data.items || data.films || []).slice(0, 20);
}

export async function fetchCartoons() {
  const res = await fetch(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films?type=FILM&genres=18&order=NUM_VOTE&ratingFrom=6&yearFrom=2000&yearTo=2025&page=1`,
    { headers }
  );
  const data = await res.json();
  return (data.items || data.films || []).slice(0, 20);
}

export async function fetchAnime() {
  const res = await fetch(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films?type=FILM&genres=24&order=NUM_VOTE&ratingFrom=6&yearFrom=2000&yearTo=2025&page=1`,
    { headers }
  );
  const data = await res.json();
  return (data.items || data.films || []).slice(0, 20);
}


export async function searchByKeyword(query) {
  const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(query)}&page=1`;
  const res = await fetch(url, { headers });
  const data = await res.json();
  return data.films || [];
}