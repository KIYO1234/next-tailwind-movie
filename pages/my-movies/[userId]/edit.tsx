import { ObjectId } from "mongodb";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { Fragment } from "react";
import { connectToDatabase } from "../../../db/mongoDB";

const Edit = (props) => {
  // console.log("props.movie: ", props.movie);
  const { movie } = props;
  const router = useRouter();

  const [title, setTitle] = useState(movie.title);
  const [image, setImage] = useState(movie.image);
  const [author, setAuthor] = useState(movie.author);
  const [description, setDescription] = useState(movie.description);

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };
  const imageHandler = (event) => {
    setImage(event.target.value);
  };
  const authorHandler = (event) => {
    setAuthor(event.target.value);
  };
  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const updateMovieHandler = async (event) => {
    event.preventDefault();

    const updatedMovie = {
      id: props.movie.id,
      title,
      image,
      author,
      description,
    };

    console.log('updatedMovie: ', updatedMovie)

    const response = await fetch("/api/movies/updateMovie", {
      method: "POST",
      body: JSON.stringify(updatedMovie),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("⭐️ data: ", data);

    if (data.message === 'Something went wrong...') {
      alert('Something went wrong....')
    } else {
      router.push("/");
    }
  };

  return (
    <Fragment>
      <form onSubmit={updateMovieHandler}>
        <div className="w-1/2 mx-auto text-center relative mt-20">
          <div className="mb-5">
            <span className="w-28 inline-block align-top">Title</span>
            <input
              className="border-2 w-60 mb-3"
              onChange={titleHandler}
              value={title}
              required
            />
          </div>
          <div className="mb-5">
            <span className="w-28 inline-block align-top">imageURL</span>
            <input
              className="border-2 w-60 mb-3"
              onChange={imageHandler}
              value={image}
            />
          </div>
          <div className="mb-5">
            <span className="w-28 inline-block align-top">Author</span>
            <input
              className="border-2 w-60 mb-3"
              onChange={authorHandler}
              value={author}
            />
          </div>
          <div>
            <span className="w-28 inline-block align-top">Description</span>
            <textarea
              rows={10}
              className="border-2 w-60 mb-3"
              onChange={descriptionHandler}
              value={description}
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-300 text-white rounded p-0.5 pl-10 pr-10 absolute right-0">
            UPDATE
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  // console.log("⭐️ : ", context.params.movieId);
  const movieId: string = context.params.movieId.toString();
  const client = await connectToDatabase();
  const moviesCollection = await client.db().collection("movies");
  const movies = await moviesCollection;
  const movie = await movies.findOne({ _id: new ObjectId(movieId) })
  // console.log('🐶 movie: ', movie);
  return {
    props: {
      movie: {
        id: movie._id.toString(),
        title: movie.title,
        image: movie.image,
        author: movie.author,
        description: movie.description,
      }
    },
    revalidate: 600
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = await connectToDatabase();
  const moviesCollection = await client.db().collection("movies");
  const movies = await moviesCollection
    .find()
    .sort({ _id: -1 })
    .limit(3)
    .toArray();
  // console.log('movies: ', movies);
  const paths = movies.map(
    (movie) => `/my-movies/${movie._id.toString()}/edit`
  );
  // console.log('paths: ', paths);

  return {
    paths: paths,
    fallback: true,
  };
};

export default Edit;
