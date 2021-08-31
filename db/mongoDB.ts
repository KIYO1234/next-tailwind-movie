import * as mongoDB from "mongodb";

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = await mongoDB.MongoClient.connect(
    process.env.DB_CONN_STRING
  );
  console.log(`Successfully connected to database`);
  return client;
}
