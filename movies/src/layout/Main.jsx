import React from "react";
import Slider from "../components/Slider";

const Main = ({
  filteredMovies,
  search,
  categories,
  onScroll,
}) => {
  if (filteredMovies.length > 0) {
    return (
      <main className="main">
        <Slider title={`Результаты поиска: "${search}"`} movies={filteredMovies} />
      </main>
    );
  }

  return (
    <main className="main">
      {categories.map(({ title, key, movies }) => (
        <Slider key={key} id={key} title={title} movies={movies} onScroll={(e) => onScroll(e, key)} />
      ))}
    </main>
  );
};

export default Main;