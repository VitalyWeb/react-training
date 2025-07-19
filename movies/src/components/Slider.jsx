import React, {Component} from "react";
import {MovieCard} from "./MovieCard";

export class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleIndexes: new Set(),
    };
    this.sliderRef = React.createRef();
    this.observer = null;
  }

  componentDidMount() {
    this.initObserver();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.movies !== this.props.movies) {
      this.initObserver();
    }
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  initObserver() {
    if (this.observer) {
      this.observer.disconnect();
    }

    if (!this.sliderRef.current) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            this.setState((state) => {
              if (!state.visibleIndexes.has(index)) {
                const newSet = new Set(state.visibleIndexes);
                newSet.add(index);
                return { visibleIndexes: newSet };
              }
              return null;
            });
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        root: this.sliderRef.current,
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    const children = this.sliderRef.current.children;
    for (let i = 0; i < children.length; i++) {
      this.observer.observe(children[i]);
    }
  }

  render() {
    const { title, movies } = this.props;
    const { visibleIndexes } = this.state;

    return (
      <section className="slider">
        <h2 className="slider__title">{title}</h2>
        <div className="slider__track" ref={this.sliderRef}>
          {movies.map((movie, index) => (
            <div
              key={movie.kinopoiskId || index}
              data-index={index}
              className="movie-card-wrapper"
            >
              {visibleIndexes.has(index) ? (
                <MovieCard movie={movie} />
              ) : (
                <div className="movie-card-placeholder" />
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }
}