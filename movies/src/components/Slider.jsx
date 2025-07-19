import React, { Component } from "react";
import MovieCard from "./MovieCard";

class Slider extends Component {
  constructor(props) {
    super(props);
    this.trackRef = React.createRef();
  }

  scroll = (direction) => {
    if (this.trackRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      this.trackRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    }
  };

  render() {
    const { id, title, movies, onScroll } = this.props;
    
    return (
      <section className="slider" id={id}>
        <h2 className="slider__title">{title}</h2>
        <div className="slider__container">
          <button 
            className="slider__button slider__button--left" 
            onClick={() => this.scroll("left")}
          >
            &lt;
          </button>
          <div 
            className="slider__track" 
            ref={this.trackRef}
            onScroll={onScroll}
          >
            {movies.map((movie) => (
              <MovieCard key={movie.kinopoiskId || movie.filmId} movie={movie} />
            ))}
          </div>
          <button 
            className="slider__button slider__button--right" 
            onClick={() => this.scroll("right")}
          >
            &gt;
          </button>
        </div>
      </section>
    );
  }
}

export default Slider;