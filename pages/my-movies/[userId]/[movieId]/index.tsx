import { ObjectId } from "mongodb";
import { GetServerSideProps } from "next";
import React from "react";
import { Fragment } from "react";
import { connectToDatabase } from "../../../../db/mongoDB";

const MovieDetail = (props) => {
  return (
    <Fragment>
      <div className="mt-20 w-4/5 mx-auto">
        <div>{props.movie.title}</div>
        <div className="grid sm:grid-cols-1 md:grid-cols-3">
          <div className="w-40">
            <img src={props.movie.image} />
          </div>
          <div className="md:col-span-2">{props.movie.description}</div>
        </div>
      </div>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("context.params: ", context.params);
  const userId = context.params.userId.toString();
  const movieId = context.params.movieId.toString();

  const client = await connectToDatabase();
  const usersCollection = await client.db().collection("users");
  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
  // console.log('👩 user.movies: ', user.movies)
  const movies = user.movies.reverse().map((movie) => ({
    id: new ObjectId(movie.id).toString(),
    title: movie.title,
    image: movie.image,
    author: movie.author,
    description: movie.description,
  }));
  console.log("⚡️ movies: ", movies);
  const movie = movies.find((movie) => movie.id === movieId);
  console.log(" 🔍 movie: ", movie);

  // const movie = {title: "sample"}
  return {
    props: {
      movie: {
        id: new ObjectId(movie.id).toString(),
        title: movie.title,
        image: movie.image,
        author: movie.author,
        description: movie.description,
      },
    },
  };
};

export default MovieDetail;
