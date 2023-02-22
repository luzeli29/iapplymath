import clientPromise from "@utils/database/mongodb";
import {throwError} from '@common_imports'

export default async function handler(req, res) {
  const { username } = req.query
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  switch (req.method) {
    case "POST":
      handlePost(username,db,res);
      break;
  }
}

async function handlePost(username,db,res) {
  try {
    const filter = {username: username}

    //TODO: Handle if you dont find user
    //TODO: Handle if user has active session

    const sessionObject = {
      sessions: {
        sessionStartDate: new Date()
      }
    };

    
    const insertResult = await db.collection("users").updateOne(
      filter,
      {$push: sessionObject}
    );
    console.log(insertResult)
    res.json({
    code: 200,
    message: "Created session in user.",
    data: insertResult,
    });
    
  }
  catch (error) {
    throwError("Could not create user session. " + error)
  }
}