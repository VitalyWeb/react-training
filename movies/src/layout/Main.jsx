import React, { Component } from "react";
import {Slider} from "../components/Slider";

export class Main extends Component {
  render() {
    const { moviesFilms, moviesNew, moviesBest, moviesSeries } = this.props;

    return (
      <main className="main">
        <Slider title="Фильмы" movies={moviesFilms} />
        <Slider title="Сериалы" movies={moviesSeries} />
        <Slider title="Новинки" movies={moviesNew} />
        <Slider title="Лучшие фильмы" movies={moviesBest} />
      </main>
    );
  }
}