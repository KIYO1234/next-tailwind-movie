import React, {useEffect} from "react";
import { GetStaticProps } from "next";
import { connectToDatabase } from "../db/mongoDB";
import { Movie } from "../Types";
import { useRouter } from "next/router";
import TrashIcon from "@heroicons/react/solid/TrashIcon";
import { Fragment } from "react";
import HeadTag from "../components/HeadTag";

type Props = {
  movies: Movie[];
};

const MyMovies: React.FC<Props> = (props) => {

  // ▼ ユーザーとの紐付きなし
  const { movies } = props;
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

  const routeHandler = (selectedMovie: Movie) => {
    const url = selectedMovie.id;
    router.push(`/recommends/${url}`);
  };

  return (
    <Fragment>
      <HeadTag title="Home Page" description="This is a home page including the list of user's favorite movies" />
      <img src="/images/cinema.jpeg" alt="cover" className="w-full mb-6" />
      <div className="pl-4">おすすめ映画</div>
      {/* <ul className="flex flex-wrap justify-between text-center mx-auto w-4/5 mb-40"> */}
      <ul className="grid sm:grid-cols-2 md:grid-cols-4 text-center mx-auto w-4/5 mb-40">
        {movies.map((movie) => (
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
            </div>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const client = await connectToDatabase();
  const moviesCollection = await client.db().collection("movies");
  const movies = await moviesCollection.find().sort({ _id: -1 }).toArray();

  return {
    props: {
      movies: movies.map((movie) => ({
        id: movie._id.toString(),
        title: movie.title,
        image: movie.image,
        description: movie.description,
        author: movie.author,
      })),
    },
    revalidate: 600,
  };
};

export default MyMovies;
