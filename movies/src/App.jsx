import React, { Component } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Main from "./layout/Main";

import { fetchCategoryFilm, fetchNewReleases, fetchSeries, searchByKeyword, fetchTopRatedMovies, fetchCartoons, fetchAnime } from "./api/kinopoisk";

import "./style.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      filteredMovies: [],
      moviesFilmsAll: [],
      moviesFilmsVisible: [],
      moviesNewAll: [],
      moviesNewVisible: [],
      moviesBestAll: [],
      moviesBestVisible: [],
      moviesSeriesAll: [],
      moviesSeriesVisible: [],
      moviesCartoonsAll: [],
      moviesCartoonsVisible: [],
      moviesAnimeAll: [],
      moviesAnimeVisible: [],

    };
  }

  componentDidMount() {
    this.loadSequentially();
  }

  wait = (ms) => new Promise((res) => setTimeout(res, ms));

  loadSequentially = async () => {
    try {
      const filmsAll = await fetchCategoryFilm();
      this.setState({
        moviesFilmsAll: filmsAll,
        moviesFilmsVisible: filmsAll.slice(0, 8),
      });
      await this.wait(500);

      const newAll = await fetchNewReleases();
      this.setState({
        moviesNewAll: newAll,
        moviesNewVisible: newAll.slice(0, 8),
      });
      await this.wait(500);

      const bestAll = await fetchTopRatedMovies();
      this.setState({
        moviesBestAll: bestAll,
        moviesBestVisible: bestAll.slice(0, 8),
      });
      await this.wait(500);

      const seriesAll = await fetchSeries();
      this.setState({
        moviesSeriesAll: seriesAll,
        moviesSeriesVisible: seriesAll.slice(0, 8),
      });

      const cartoonsAll = await fetchCartoons();
      this.setState({
        moviesCartoonsAll: cartoonsAll,
        moviesCartoonsVisible: cartoonsAll.slice(0, 8),
      });
      await this.wait(500);

      const animeAll = await fetchAnime();
      this.setState({
        moviesAnimeAll: animeAll,
        moviesAnimeVisible: animeAll.slice(0, 8),
      });

    } catch (e) {
      console.error("Ошибка при загрузке данных:", e);
    }
  };

  handleSearchChange = (query) => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) {
      this.setState({ filteredMovies: [], search: q });
      return;
    }

    const all = [
      ...this.state.moviesFilmsAll,
      ...this.state.moviesNewAll,
      ...this.state.moviesBestAll,
      ...this.state.moviesSeriesAll,
    ];

    const localResults = all.filter((movie) => {
      const name = (movie.nameRu || movie.nameEn || "").toLowerCase();
      return name.includes(q);
    });

    if (localResults.length > 0) {
      this.setState({ filteredMovies: localResults, search: q });
    } else {
      this.searchFromApi(q);
    }
  };

  searchFromApi = async (query) => {
    try {
      const items = await searchByKeyword(query);
      this.setState({ filteredMovies: items, search: query });
    } catch (e) {
      console.error("Ошибка при поиске:", e);
      this.setState({ filteredMovies: [] });
    }
  };

  handleScroll = (e, category) => {
    const el = e.target;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 50) {
      const all = this.state[`${category}All`];
      const visible = this.state[`${category}Visible`];
      const next = all.slice(visible.length, visible.length + 4);
      this.setState({
        [`${category}Visible`]: [...visible, ...next],
      });
    }
  };

  handleClearSearch = () => {
    this.setState({ filteredMovies: [], search: "" });
  };

  render() {
    const {
      filteredMovies,
      search,
      moviesFilmsVisible,
      moviesNewVisible,
      moviesBestVisible,
      moviesSeriesVisible,
    } = this.state;

    const categories = [
      { title: "Фильмы", key: "moviesFilms", movies: moviesFilmsVisible },
      { title: "Сериалы", key: "moviesSeries", movies: moviesSeriesVisible },
      { title: "Новинки", key: "moviesNew", movies: moviesNewVisible },
      { title: "Лучшие фильмы", key: "moviesBest", movies: moviesBestVisible },
      { title: "Мультфильмы", key: "moviesCartoons", movies: this.state.moviesCartoonsVisible },
      { title: "Аниме", key: "moviesAnime", movies: this.state.moviesAnimeVisible },
    ];

    return (
      <div className="app">
        <Header
          search={search}
          onSearchChange={this.handleSearchChange}
          onClearSearch={this.handleClearSearch}
        />

        <Main
          filteredMovies={filteredMovies}
          search={search}
          categories={categories}
          onScroll={this.handleScroll}
        />
        <Footer />
      </div>
    );
  }
}