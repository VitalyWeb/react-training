import React from "react";

const MovieCard = ({ movie }) => (
  <div className="movie-card">
    <img
      className="movie-card__image"
      src={movie.posterUrlPreview || movie.posterUrl}
      alt={movie.nameRu || movie.nameEn}
    />
    <div className="movie-card__info">
      <div className="movie-card__title">{movie.nameRu || movie.nameEn}</div>
      <div className="movie-card__year">{movie.year}</div>
    </div>
  </div>
);

export default MovieCard;
