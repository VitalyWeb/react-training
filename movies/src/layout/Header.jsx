import React, { Component } from "react";
import { SearchBar } from "../components/SearchBar";

export class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header__logo">MoviePicker</div>
        <ul className="header__menu">
          <li className="header__menu-item">Фильмы</li>
          <li className="header__menu-item">Сериалы</li>
          <li className="header__menu-item">Новинки</li>
          <li className="header__menu-item">Лучшие</li>
        </ul>
        <SearchBar onSearch={this.props.onSearchChange} />
      </header>
    );
  }
}
