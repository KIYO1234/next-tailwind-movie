import { MongoClient } from "mongodb";
import * as mongoDB from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../db/mongoDB";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return;
  }
  try {
    const client = await connectToDatabase();
    const usersCollection = await client.db().collection('users');

    // 同一メールアドレス有無の確認
    const hasSameEmail = await usersCollection.findOne({email: req.body.email})
    console.log(' 📩 hasSameEmail: ', hasSameEmail);
  
    if (hasSameEmail) {
      res.status(409).json({
        message: 'This email has already been registered',
        status: 'Conflict',
      })
      return;
    }
    const user = await usersCollection.insertOne({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      movies: [],
    });
    res.status(201).json({
      message: 'Successfully signed you up!',
      status: 'Success'
    })    
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong...',
      status: 'Failed'
    })
  }

};

export default handler;
