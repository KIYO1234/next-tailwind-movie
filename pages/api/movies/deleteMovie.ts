import { MongoClient } from "mongodb";
import * as mongoDB from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../db/mongoDB";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    console.log(
      '✌️ req.body.title (req.method === "DELETE"): ',
      req.body.title
    );
    try {
      const client: MongoClient = await connectToDatabase();
      const usersCollection = await client.db().collection("users");
      const user = await usersCollection.findOne({
        _id: new mongoDB.ObjectId(req.body.userId),
      });
      console.log("🎾 user: ", user);
      const index = user.movies.findIndex(
        (movie) => movie.title === req.body.title
      );
      console.log("🐞 movie: ", index);
      const movies = user.movies;
      console.log("kyosukeの映画たち💦：", movies);
      // user.movies.remove({ title: req.body.title });

      usersCollection.updateOne(
        { _id: new mongoDB.ObjectId(req.body.userId) },
        {
          $pull: {
            movies: {
              title: req.body.title,
            },
          },
        }
      );

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
