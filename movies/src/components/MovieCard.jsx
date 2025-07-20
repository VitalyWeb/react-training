import React from "react";

const MovieCard = ({ movie }) => {
  const {
    posterUrlPreview,
    posterUrl,
    nameRu,
    nameEn,
    year,
    countries,
    genres,
  } = movie;

  const title = nameRu || nameEn || "Без названия";
  const poster = posterUrlPreview || posterUrl;
  const country = countries?.[0]?.country || "Неизвестно";
  const genre = genres?.[0]?.genre || "Жанр не указан";

  return (
    <div className="movie-card">
      <img
        className="movie-card__image"
        src={poster}
        alt={title}
      />
      <div className="movie-card__info">
        <div className="movie-card__title">{title}</div>
        <div className="movie-card__year">{year}</div>
        <div className="movie-card__extra">
          <span>{country}</span> • <span>{genre}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;