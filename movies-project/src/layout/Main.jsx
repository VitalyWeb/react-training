import React from "react";
import {Slider} from "../components/Slider";

const categories = ["Фильмы", "Сериалы", "Мультфильмы", "Новинки"];

export class Main extends React.Component {
  render() {
    return (
      <main style={{ padding: "20px" }}>
        {categories.map((category) => (
          <Slider key={category} category={category} />
        ))}
      </main>
    );
  }
}
