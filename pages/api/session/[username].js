import clientPromise from "@utils/database/mongodb";
import {throwError} from '@common_imports'
import GetCurrentSessionIndex from '@utils/database/get_current_session'

export default async function handler(req, res) {
  const { username } = req.query
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  switch (req.method) {
    case "POST":
      return await startSession(username,db,res);
    case "PUT":
      return await endSession(username,db,res);
    case "GET":
      return await getSessions(username,db,res);
  }
  return resolve
}

async function getSessions(username,db,res) {
  const filter = {username : username}
  //TODO: ERROR HANDALING IF NO USER FOUND
  const findUser = await db.collection("users").findOne(filter)
  return res.status(200).json({
  code: 200,
  message: "Fetched sessions in user.",
  data: findUser,
  });
}

//Logic to end session
async function endSession(username,db,res) {
  try {
    const filter = {username: username}
    
    //TODO: Handle if you dont find user
    //TODO: Handle if user has no active session

    const index = await GetCurrentSessionIndex(username)

    const endDate = "sessions." + index + ".end_date"

    const updateResult = await db.collection("users").findOneAndUpdate(
      filter,
      { 
        $set : {
          [endDate] : new Date()
        }
      }
     )

    return res.status(200).json({
    code: 200,
    message: "Ended session in user.",
    data: updateResult,
    });
  }

  catch (error) {
    throwError("Could not end user session. " + error)
  }
}

//Logic to create new session
async function startSession(username,db,res) {
  try {
    const filter = {username: username}

    //TODO: Handle if you dont find user
    //TODO: Handle if user has active session

    const sessionObject = {
      sessions: {
        start_date: new Date(),
        times_talked_to_ayu: 0
      }
    };

    //Push new session
    const insertResult = await db.collection("users").updateOne(
      filter,
      {$push: sessionObject}
    );

    return res.status(200).json({
      code: 200,
      message: "Created session in user.",
      data: insertResult,
    });
    
  }
  catch (error) {
    throwError("Could not create user session. " + error)
    return res.status(400).json({
      code: 200,
      message: error,
      data: insertResult,
    });
  }
}