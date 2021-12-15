import React from "react";
import { useRouter } from "next/router";
import { Movie } from "../Types";
import TrashIcon from "@heroicons/react/solid/TrashIcon";

const MoviesListItem = (props) => {
  const router = useRouter();
  const { movie } = props;

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

  const routeHandler = (selectedMovie: Movie) => {
    const url = selectedMovie.id;
    router.push(`/recommends/${url}`);
  };

  return (
    <li key={movie.title} className="m-4 group cursor-pointer">
      <div className="hover:scale-125 transition duration-300 ease-in-out">
        <img
          className="max-h-44 rounded-md mx-auto"
          // width={40}
          // height={80}
          src={movie.image}
          alt={movie.title}
          onClick={() => routeHandler(movie)}
        />
        <div
          className="w-full hidden group-hover:block group-hover:line-clamp-2 fixed text-xs bg-white"
          onClick={() => deleteHandler(movie)}
        >
          {/* <div className="text-right flex justify-end hover:opacity-50 cursor-pointer pt-1 mt-2">
            <div>削除</div>
            <TrashIcon className="h-4 ml-2 mb-3" />
          </div> */}
        </div>
      </div>
    </li>
  );
};

export default MoviesListItem;
