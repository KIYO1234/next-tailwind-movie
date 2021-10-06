import { MongoClient } from "mongodb";
import * as mongoDB from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../db/mongoDB";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client: MongoClient = await connectToDatabase();
    const moviesCollection: mongoDB.Collection<Document> = await client
      .db()
      .collection("movies");
    const movies = await moviesCollection.find();
    res.status(200).json({
      message: "Successfully fetched all movies!",
      movies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch...",
    });
    return;
  }
};

export default handler;
