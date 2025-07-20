import React from "react";
import Slider from "../components/Slider";
import MovieCard from "../components/MovieCard";

const Main = ({
  filteredMovies,
  search,
  categories,
  onScroll,
}) => {
  if (filteredMovies.length > 0) {
    return (
      <main className="main">
        <h2 className="search-title">{`Результаты поиска: "${search}"`}</h2>
        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.kinopoiskId || movie.id} movie={movie} />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      {categories.map(({ title, key, movies }) => (
        <Slider
          key={key}
          id={key}
          title={title}
          movies={movies}
          onScroll={(e) => onScroll(e, key)}
        />
      ))}
    </main>
  );
};

export default Main;