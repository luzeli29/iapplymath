import clientPromise from "utils/database/mongodb";
import throwError from "@utils/error/throwError";
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
      return await startTimeQuestion(secureUsername,db,res);
    case "PUT":
      return await endTimeQuestion(secureUsername,bodyObject,db,res);
  }
}


//Logic to create new session
async function startTimeQuestion(username,db,res) {
  try {
    const filter = {username: username}

    //TODO: Handle if you dont find user
    //TODO: Handle if user has active session
    const questionObjet = {
      questions_times: {
        start_date: Date.now(),
        end_time: '',
        question: 0
      }
    };

    //Push new session
    const insertResult = await db.collection('users').updateOne(
      filter,
      {$push: questionObjet}
    );
    if(!insertResult) {
      //TODO: HANDLE ERROR
    }
    return res.status(200).json({
      code: 200,
      message: "Created question in user.",
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

async function getSessions(username,db,res) {
  const filter = {username : username}
  //TODO: ERROR HANDALING IF NO USER FOUND
  const findUser = await db.collection('users').findOne(filter)
  if(findUser) {
    return findUser.questions_times
  } else {
    return {}
  }
}


async function endTimeQuestion(username,bodyObject,db,res) {
  const filter = {username: username}

  const findUser = await db.collection("data").findOne(filter)
  if(!findUser) {
    return res.status(404).json({
      code: 404,
      message: 'Cannot find user in database to log out!',
      data: {},
    });
  }

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
      return res.status(404).json({
        code: 404,
        message: 'Cannot find user to log out',
        data: {},
      });
    }

    const index = sessions.length - 1
    const sessionKeyStart = "sessions." + index + "."

    
    let updateSessionObject = {}

    const updateResult = await db.collection('users').findOneAndUpdate(
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
