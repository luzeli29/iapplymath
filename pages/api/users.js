import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  const bodyObject = req.body
  switch (req.method) {
    case "POST":
      let myPost = await db.collection("users").insertOne(bodyObject);
      res.json(myPost.ops[0]);
      break;
    case "GET":
     
      break;
  }
}