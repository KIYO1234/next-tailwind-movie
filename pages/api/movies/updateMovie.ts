import { MongoClient } from "mongodb";
import * as mongoDB from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../db/mongoDB";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log("✌️ req.body: ", req.body);
  const id = new mongoDB.ObjectId(req.body.id);
  try {
    const client: MongoClient = await connectToDatabase();
    const moviesCollection: mongoDB.Collection<Document> = await client
      .db()
      .collection("movies");
    const updatedMovie = await moviesCollection.updateOne(
      { _id: id },
      {
        $set: {
          title: req.body.title,
          image: req.body.image,
          author: req.body.author,
          description: req.body.description,
        },
      }
    )
    res.status(200).json({
      message: "Successfully updated the movie!",
      data: updatedMovie
    });
    
  } catch (error) {
    console.log("💥 error.message: ", error.message);

    res.status(500).json({
      message: "Something went wrong...",
    });
    return;
  }
};

export default handler;
