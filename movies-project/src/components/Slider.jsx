import React from "react";
import {Card} from "../components/Card";

export class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedCount: 6,
      items: [],
    };

    this.containerRef = React.createRef();
    this.allItems = [];
  }

  componentDidMount() {
    this.generateItems();
    this.loadItems();
  }

  generateItems = () => {
    const { category } = this.props;
    this.allItems = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `${category} №${i + 1}`,
    }));
  };

  loadItems = () => {
    const { loadedCount } = this.state;
    this.setState({ items: this.allItems.slice(0, loadedCount) });
  };

  handleScroll = (direction) => {
    const container = this.containerRef.current;
    if (!container) return;

    const scrollAmount = 300;

    const nearRightEdge =
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 300;

    if (
      direction === "right" &&
      nearRightEdge &&
      this.state.loadedCount < this.allItems.length
    ) {
      this.setState(
        (state) => ({
          loadedCount: Math.min(state.loadedCount + 2, this.allItems.length),
        }),
        () => {
          this.loadItems();
          setTimeout(() => {
            container.scrollBy({
              left: scrollAmount,
              behavior: "smooth",
            });
          }, 50);
        }
      );
    } else {
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  render() {
    const { category } = this.props;
    const { items } = this.state;

    return (
      <section className="slider">
        <h2 className="slider__title">{category}</h2>

        <div className="slider__wrapper">
          <button
            className="slider__arrow slider__arrow--left"
            onClick={() => this.handleScroll("left")}
          >
            ◀
          </button>

          <div className="slider__container" ref={this.containerRef}>
            {items.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>

          <button
            className="slider__arrow slider__arrow--right"
            onClick={() => this.handleScroll("right")}
          >
            ▶
          </button>
        </div>
      </section>
    );
  }
}