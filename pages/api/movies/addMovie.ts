import { MongoClient } from "mongodb";
import * as mongoDB from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../db/mongoDB";
import { NewMovie } from "../../../Types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const movie: NewMovie = req.body
  
  console.log('✌️ req.body: ', req.body);
  // console.log("✌️ req.headers: ", req.headers);

  try {
    const client: MongoClient = await connectToDatabase();
    // const moviesCollection: mongoDB.Collection<Document> = await client.db().collection('movies');
    // moviesCollection.insertOne(req.body);
    const usersCollection: mongoDB.Collection<Document> = await client
      .db()
      .collection("users");
    usersCollection.updateOne(
      { _id: new mongoDB.ObjectId(req.body.id) },
      {
        $push: {
          movies: {
            id: new mongoDB.ObjectId(),
            title: movie.title,
            image: movie.image,
            author: movie.author,
            description: movie.description,
          },
        },
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong...",
    });
    return;
  }
  res.status(200).json({
    message: "Successfully added a new movie!",
  });
};

export default handler;
