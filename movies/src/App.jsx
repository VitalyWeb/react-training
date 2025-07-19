import React, { Component } from "react";
import { Header } from "./layout/Header";
import { Main } from "./layout/Main";
import { Footer } from "./layout/Footer";
import { Slider } from "./components/Slider";
import "./style.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      filteredMovies: [],
      moviesFilms: [],
      moviesNew: [],
      moviesBest: [],
      moviesSeries: []
    };
    this.apiKey = "d3b8ee62-badb-4ac8-87dd-fb01dc336e39";
  }

  componentDidMount() {
    this.loadSequentially();
  }

  async loadSequentially() {
    await this.fetchKpData("TOP_100_POPULAR_FILMS", "moviesFilms");
    await this.wait(2000);
    await this.fetchNewReleases();
    await this.wait(4000);
    await this.fetchKpData("TOP_250_BEST_FILMS", "moviesBest");
    await this.wait(6000);
    await this.fetchSeries();
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  fetchNewReleases() {
    const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films?order=NUM_VOTE&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=2025&yearTo=2025&page=1`;
    return fetch(url, {
      headers: {
        "X-API-KEY": this.apiKey,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        const items = data.items || data.films || [];
        this.setState({ moviesNew: items.slice(0, 15) });
      })
      .catch(e => {
        console.error("Ошибка при загрузке новинок:", e);
        this.setState({ moviesNew: [] });
      });
  }

  fetchKpData(type, stateKey) {
    const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=${type}&page=1`;
    return fetch(url, {
      headers: {
        "X-API-KEY": this.apiKey,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        const items = data.films || data.items || [];
        this.setState({ [stateKey]: items.slice(0, 15) });
      })
      .catch(e => {
        console.error(`Ошибка при загрузке ${stateKey}:`, e);
        this.setState({ [stateKey]: [] });
      });
  }

  fetchSeries() {
    const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films?type=TV_SERIES&order=NUM_VOTE&ratingFrom=7&ratingTo=10&yearFrom=2000&yearTo=2025&page=1`;
    return fetch(url, {
      headers: {
        "X-API-KEY": this.apiKey,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        const items = data.items || data.films || [];
        this.setState({ moviesSeries: items.slice(0, 15) });
      })
      .catch(e => {
        console.error("Ошибка при загрузке сериалов:", e);
        this.setState({ moviesSeries: [] });
      });
  }

  handleSearchChange = (query) => {
    const q = query.trim().toLowerCase();
    this.setState({ search: q });

    if (q.length < 2) {
      this.setState({ filteredMovies: [] });
      return;
    }

    const { moviesFilms, moviesNew, moviesBest, moviesSeries } = this.state;
    const localResults = [...moviesFilms, ...moviesNew, ...moviesBest, ...moviesSeries].filter(movie => {
      const name = (movie.nameRu || movie.nameEn || "").toLowerCase();
      return name.includes(q);
    });

    if (localResults.length > 0) {
      this.setState({ filteredMovies: localResults });
    } else {
      this.searchFromApi(q);
    }
  };

  searchFromApi = (query) => {
    const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(query)}&page=1`;

    fetch(url, {
      headers: {
        "X-API-KEY": this.apiKey,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        const items = data.films || [];
        this.setState({ filteredMovies: items });
      })
      .catch(e => {
        console.error("Ошибка при поиске:", e);
        this.setState({ filteredMovies: [] });
      });
  };

  render() {
    const {
      search,
      filteredMovies,
      moviesFilms,
      moviesNew,
      moviesBest,
      moviesSeries
    } = this.state;

    return (
      <div className="app">
        <Header onSearchChange={this.handleSearchChange} />
        <main className="main">
          {filteredMovies.length > 0 ? (
            <Slider title={`Результаты поиска: "${search}"`} movies={filteredMovies} />
          ) : (
            <Main
              moviesFilms={moviesFilms}
              moviesNew={moviesNew}
              moviesBest={moviesBest}
              moviesSeries={moviesSeries}
            />
          )}
        </main>
        <Footer />
      </div>
    );
  }
}