import React from "react";
import { Movie } from "../Types";
import TrashIcon from "@heroicons/react/solid/TrashIcon";
import { useRouter } from "next/router";

type Props = {
  movie: Movie;
};

const divHeight = {
  height: "210px",
};

const ListItem: React.FC<Props> = (props) => {
  const { movie } = props;
  const router = useRouter();

  const deleteHandler = async (selectedMovie: Movie) => {
    console.log("delete");
    console.log("selectedMovie: ", selectedMovie);
    if (confirm("Are you sure your want to delete the movie?")) {
      const response = await fetch("/api/movies/deleteMovie", {
        method: "DELETE",
        body: JSON.stringify(selectedMovie),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("data: ", data);
      alert(data.message);
      router.push("/");
    } else {
      alert("Canceled");
    }
  };

  return (
    <li
      className="shadow-md m-2 mb-8 w-4/5 mx-auto rounded-lg max-h-96"
      key={movie.title}
    >
      <div className="bg-gradient-to-br from-purple-600 to-red-300 text-white p-3 mb-5 font-serif flex justify-between">
        <div>{movie.title}</div>
        <button onClick={() => deleteHandler(movie)}>
          <TrashIcon className="h-6" />
        </button>
      </div>
      <div className="flex m-3" style={divHeight}>
        <img className="max-h-40" src={movie.image} alt={movie.title} />
        <div className="ml-10 line-clamp-7">{movie.description}</div>
      </div>
      <br />
      <div className="text-right pr-5 pb-5">{`監督：${movie.author}`}</div>
    </li>
  );
};

export default ListItem;
