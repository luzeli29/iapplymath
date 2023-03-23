import clientPromise from "utils/database/mongodb";
import {useRouter} from 'next/router'
import {throwError} from '@utils/imports/commonImports'
import EncryptUsername from "@utils/crypto/encryptUsername";

export default async function handler(req, res) {
  const { username } = req.query
  if(!username) {
    return res.json({
      code: 400,
      message: "Username cannot be null",
      data: {},
    });
  }
  const bodyObject = req.body;
  const secureUsername = EncryptUsername(username)

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  switch (req.method) {
    case "POST":
      return await startSession(secureUsername,db,res);
    case "PUT":
      return await putSession(secureUsername,bodyObject,db,res);
    case "GET":
      return await getSessions(secureUsername,db,res);
  }
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

async function putSession(username,bodyObject,db,res) {
  const filter = {username: username}
  if(Object.keys(bodyObject).length == 0) {
    return res.status(400).json({
      code: 400,
      message: '"bodyObject" was null when trying to put into session.',
      data: {},
      });
  }
  
  try{

    const sessions = await getSessions(username,db,res)

    if(!sessions) {
      return res.status(400).json({
        code: 400,
        message: "Could not end session due to issue with getSessions.",
        data: {},
        });
    }

    const index = sessions.length - 1
    const sessionKeyStart = "sessions." + index + "."

    let updateSessionObject = {}
    for (const [key, value] of Object.entries(bodyObject)) {
      //TODO: Could be better way of handling incrementingAyu
      if(key == "times_talked_to_ayu") {
        if (!await incrementAyu(username,index,db)) {
          return res.status(400).json({
            code: 400,
            message: 'Error when trying to increment Ayu',
            data: {},
            });
        }
         continue;
       }
      const sessionKey = sessionKeyStart + key
      updateSessionObject[sessionKey] = value
    }

    const updateResult = await db.collection("data").findOneAndUpdate(
      filter,
      { 
        $set : updateSessionObject
      }
     )
     return res.status(200).json({
      code: 200,
      message: 'Put "bodyObject" into session.',
      data: {updateResult},
      });
  } catch (e) {
    return res.status(400).json({
      code: 400,
      message: 'Error when trying to put into Session.' + e.message,
      data: {},
      });  
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
        start_date: Date.now(),
        times_talked_to_ayu: 0
      }
    };

    //Push new session
    const insertResult = await db.collection("data").updateOne(
      filter,
      {$push: sessionObject}
    );
    if(!insertResult) {
      //TODO: HANDLE ERROR
    }
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

async function incrementAyu(username,index,db) {
  try {

    const filter = {
      username : username,
    }

    const incText = "sessions." + index + ".times_talked_to_ayu"

    const updateResult = await db.collection("data").findOneAndUpdate(
      filter,
      { $inc : { 
          [incText] : 1
        } 
      }
    
      )
    if(updateResult.ok) {
      return true
    } else {
      return false
    }
  }
  catch (error) {
    return false
  }
}