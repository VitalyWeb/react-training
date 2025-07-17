import React from "react";

export class Card extends React.PureComponent {
  render() {
    const { item } = this.props;
    return (
      <div className="slider__card">
        {item.Poster && item.Poster !== "N/A" ? (
          <img
            src={item.Poster}
            alt={item.Title}
            className="slider__poster"
          />
        ) : (
          <div className="slider__no-poster">Нет постера</div>
        )}
        <div className="slider__card-title">{item.Title}</div>
      </div>
    );
  }
}