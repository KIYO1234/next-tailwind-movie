import { MongoClient } from "mongodb";
import * as mongoDB from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../db/mongoDB";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    // console.log('✌️ req.body (req.method === "DELETE"): ', req.body);
    try {
      const client: MongoClient = await connectToDatabase();
      const moviesCollection: mongoDB.Collection<Document> = await client
        .db()
        .collection("movies");
      moviesCollection.deleteOne({_id: new mongoDB.ObjectId(req.body.id)});
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
