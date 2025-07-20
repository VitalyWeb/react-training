const API_KEY = process.env.REACT__APP__API__KEY;

const headers = {
  "X-API-KEY": API_KEY,
  "Content-Type": "application/json",
};

export async function fetchCategory(type) {
  const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=${type}&page=1`, { headers });
  const data = await res.json();
  return (data.films || data.items || []).slice(0, 20);
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

export async function searchByKeyword(query) {
  const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(query)}&page=1`;
  const res = await fetch(url, { headers });
  const data = await res.json();
  return data.films || [];
}