import clientPromise from "utils/database/mongodb";
import {useRouter} from 'next/router'
import {throwError} from '@utils/imports/commonImports'
import EncryptUsername from "@utils/crypto/encryptUsername";

export default async function handler(req, res) {
  const { username } = req.query
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  const secureUsername = EncryptUsername(username)

  switch (req.method) {
    case "POST":
      return await startSession(secureUsername,db,res);
    case "PUT":
      return await endSession(secureUsername,db,res);
    case "GET":
      return await getSessions(secureUsername,db,res);
  }
  return resolve
}

async function getSessions(username,db,res) {
  const filter = {username : username}
  //TODO: ERROR HANDALING IF NO USER FOUND
  const findUser = await db.collection("data").findOne(filter)
  if(findUser) {
    return findUser.sessions
  } else {
    return {}
  }
}

//Logic to end session
async function endSession(username,db,res) {
  try {
    const filter = {username: username}
    
    //TODO: Handle if you dont find user
    //TODO: Handle if user has no active session
    const sessions = await getSessions(username,db,res)

    if(!sessions) {
      return res.status(404).json({
        code: 404,
        message: "Could not end session.",
        data: {},
        });
    }

    const index = sessions.length - 1

    const endDate = "sessions." + index + ".end_date"

    const updateResult = await db.collection("data").findOneAndUpdate(
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
    const insertResult = await db.collection("data").updateOne(
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