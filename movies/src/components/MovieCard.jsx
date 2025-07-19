import React, {Component} from "react";

export class MovieCard extends Component {
  render() {
    const { movie } = this.props;
    return (
      <div className="movie-card movie-card_large">
        <img
          src={movie.posterUrlPreview || movie.posterUrl}
          alt={movie.nameRu || movie.nameEn}
          className="movie-card__image"
          loading="lazy"
        />
        <div className="movie-card__info">
          <h3 className="movie-card__title">{movie.nameRu || movie.nameEn}</h3>
          <p className="movie-card__year">{movie.year}</p>
        </div>
      </div>
    );
  }
}