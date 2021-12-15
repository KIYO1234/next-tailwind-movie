import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import { connectToDatabase } from "../db/mongoDB";
import { Movie } from "../Types";
import { useRouter } from "next/router";
import { Fragment } from "react";
import HeadTag from "../components/HeadTag";
import useScrollPosition from "@react-hook/window-scroll";
import MoviesListItem from "../components/MoviesListItem";
import ReactResponsive from "../components/ReactResponsive";

type Props = {
  movies: Movie[];
};

const MyMovies: React.FC<Props> = (props) => {
  console.log("HomePage");
  // console.log("window.screen: ", window.screen.width);
  // console.log("window.innerWidth: ", window.innerWidth);

  const scrollY = useScrollPosition(60);
  console.log("scrollY: ", scrollY);

  // ▼ ユーザーとの紐付きなし
  const { movies } = props;
  console.log("movies: ", movies);

  return (
    <Fragment>
      <HeadTag
        title="Home Page"
        description="This is a home page including the list of user's favorite movies"
      />
      <img src="/images/cinema.jpeg" alt="cover" className="w-full mb-6" />
      <div className="pl-4">おすすめ映画</div>
      {/* <ul className="flex flex-wrap justify-between text-center mx-auto w-4/5 mb-40"> */}
      {movies && (
        <ul className="grid sm:grid-cols-2 md:grid-cols-4 text-center mx-auto w-4/5 mb-40">
          {movies.map((movie) => (
            <MoviesListItem movie={movie} />
          ))}
        </ul>
      )}
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
