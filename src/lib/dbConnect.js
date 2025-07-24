import { MongoClient, ServerApiVersion } from "mongodb";


export const collectionNameObj ={
  servicesCollection: "test_services"
}
export default function dbConnect(collectionName) {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sq4up6y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return client.db(process.env.DB_USER).collection(collectionName);
}
