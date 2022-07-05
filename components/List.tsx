import React from "react";
import ListItem from "./ListItem";
import { Movie } from "../Types";

type Props = {
  movies: Movie[];
};

const List: React.FC<Props> = (props) => {
  console.log("List: ", List);
  console.log("rebase");

  return (
    <ul>
      {props.movies.map((movie) => (
        <ListItem movie={movie} key={movie.id} />
      ))}
    </ul>
  );
};

export default List;
