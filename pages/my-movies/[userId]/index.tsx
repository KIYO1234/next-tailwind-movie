import { ObjectId } from "mongodb";
import React, { createContext, Fragment } from "react";
import { connectToDatabase } from "../../../db/mongoDB";
import { Movie } from "../../../Types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import HeadTag from "../../../components/HeadTag";
import TrashIcon from "@heroicons/react/solid/TrashIcon";

const MovieDetail = (props) => {
  const router = useRouter();
  console.log('props.userId: ', props.userId);
  const movies  = props.movies.reverse();
  console.log("movies(front): ", movies);
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
    router.push(`/my-movies/${props.userId}/${url}`);
  };

  if (movies) {
    return (
      <Fragment>
        <HeadTag
          title="Home Page"
          description="This is a home page including the list of user's favorite movies"
        />
        <img src="/images/cinema.jpeg" alt="cover" className="w-full mb-6" />
        <div className="pl-4">マイリスト</div>
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
                <div
                  className="w-full hidden group-hover:block group-hover:line-clamp-2 fixed text-xs bg-white"
                  onClick={() => deleteHandler(movie)}
                >
                  <div className="text-right flex justify-end hover:opacity-50 cursor-pointer pt-1 mt-2">
                    <div>削除</div>
                    <TrashIcon className="h-4 ml-2 mb-3" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  } else {
    return <div>No User</div>;
  }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log('context.params: ', context.params);
  const userId: string = context.params.userId.toString();
  console.log("userId: ", userId);
  const client = await connectToDatabase();
  const usersCollection = await client.db().collection("users");
  const user = await usersCollection.findOne({
    _id: new ObjectId(userId),
  });
  const movies = user.movies.map(movie => ({
    id: new ObjectId(movie.id).toString(),
    title: movie.title,
    image: movie.image,
    author: movie.author,
    description: movie.description,
  }));
  console.log("📹 movies: ", movies);

  return {
    props: {
      movies,
      userId,
    },
  };
};

export default MovieDetail;
