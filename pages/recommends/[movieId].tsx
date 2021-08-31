import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { Fragment } from "react";
import { connectToDatabase } from "../../db/mongoDB";
import { ObjectId } from "mongodb";
import Image from "next/image";
import { Movie } from "../../Types";

type Props = {
  movie: Movie
}

const RecommendsDetail: React.FC<Props> = (props) => {
  const movie = props.movie;

  return (
    <Fragment>
      <div className="mt-20 w-4/5 mx-auto">
        <Image src={movie.image} width={200} height={300}/>
        <div>{props.movie.title}</div>
      </div>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const movieId = context.params.movieId.toString();
  // console.log('movieId: ', movieId);
  const id = new ObjectId(movieId);
  const client = await connectToDatabase();
  const moviesCollection = client.db().collection('movies');
  const movie = await moviesCollection.findOne({ _id: new ObjectId(movieId) });
  console.log('movie: ', movie);

  return {
    props: {
      movie: {
        id: new ObjectId(movie._id).toString(),
        title: movie.title,
        author: movie.author,
        image: movie.image,
        description: movie.description,
      }
    }
  }
}

export default RecommendsDetail;
