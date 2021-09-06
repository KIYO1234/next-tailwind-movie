import { MongoClient } from "mongodb";
import * as mongoDB from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../db/mongoDB";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    console.log('✌️ req.body (req.method === "DELETE"): ', req.body);
    try {
      const client: MongoClient = await connectToDatabase();
      const usersCollection = await client.db().collection("users");
      const user = await usersCollection.findOne({
        _id: new mongoDB.ObjectId(req.body.userId),
      });
      console.log("🎾 user: ", user);
      const movie = user.movies.findIndex(
        (movie) => movie.id === new mongoDB.ObjectId(movie.id)
      );
      console.log('🐞 movie: ', movie);
      

      res.status(200).json({
        message: "Successfully deleted the selected movie!",
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong...",
      });
      return;
    }
  }
};

export default handler;
