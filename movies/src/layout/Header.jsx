import React from "react";
import SearchBar from "../components/SearchBar";

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Header = ({ onSearchChange, onClearSearch, search }) => (

  <header className="header">
    <div className="header__logo" onClick={onClearSearch}>MoviePicker</div>
    <ul className="header__menu">
      <li className="header__menu-item" onClick={() => scrollToSection("moviesFilms")}>Фильмы</li>
      <li className="header__menu-item" onClick={() => scrollToSection("moviesSeries")}>Сериалы</li>
      <li className="header__menu-item" onClick={() => scrollToSection("moviesNew")}>Новинки</li>
      <li className="header__menu-item" onClick={() => scrollToSection("moviesBest")}>Лучшие</li>
    </ul>

    <SearchBar onSearch={onSearchChange} search={search} />
  </header>
);

export default Header;