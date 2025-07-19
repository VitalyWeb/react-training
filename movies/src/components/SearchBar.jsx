import React, { Component } from "react";

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
    this.timeout = null;
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ query: value });

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.onSearch(value);
    }, 500);
  };

  render() {
    return (
      <input
        type="text"
        className="header__search"
        placeholder="Поиск фильма..."
        value={this.state.query}
        onChange={this.handleChange}
      />
    );
  }
}
