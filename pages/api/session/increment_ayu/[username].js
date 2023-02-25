import clientPromise from "@utils/database/mongodb";
import {throwError} from '@common_imports'
import GetCurrentSessionIndex from '@utils/database/get_current_session'

export default async function handler(req, res) {
  const { username } = req.query
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  switch (req.method) {
    case "PUT":
      return await handlePut(username,db,res);
  }
}

async function handlePut(username,db,res) {
  try {

    //TODO: Handle if you dont find user
    const index = await GetCurrentSessionIndex(username)
    //TODO: MAKE A GETSESSION API to get correct session then remove following code

    const filter = {
        username : username,
    }

    const incText = "sessions." + index + ".times_talked_to_ayu"

    const updateResult = await db.collection("users").findOneAndUpdate(
      filter,
      { $inc : { 
          [incText] : 1
        } 
      }
     )

    return res.status(200).json({
    code: 200,
    message: "Incremented Ayu Dialog in session.",
    data: updateResult,
    });
    
  }
  catch (error) {
    throwError("Could not incremented Ayu Dialog in session. " + error)
    return res.status(400).json({
      code: 400,
      message: error,
      data: updateResult,
      });
  }
}