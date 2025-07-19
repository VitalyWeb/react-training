import React, { Component } from "react";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.search || "",
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.setState({ query: this.props.search || "" });
    }
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = this.state.query.trim();
    if (trimmed.length > 0) {
      this.props.onSearch(trimmed);
    }
  };

  render() {
    return (
      <form className="search-bar" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Поиск фильма..."
          className="search-bar__input"
          value={this.state.query}
          onChange={this.handleChange}
        />
        <button type="submit" className="search-bar__button" title="Поиск">
          🔍
        </button>
      </form>
    );
  }
}
