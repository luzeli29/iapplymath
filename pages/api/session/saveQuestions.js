import clientPromise from "@utils/database/mongodb";
import {throwError} from '@common_imports'
import GetCurrentSessionIndex from '@utils/database/get_current_session'

export default async function handler(req, res) {

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  switch (req.method) {
    case "POST":
      return await handlePost(req,db,res);
  }
}

async function handlePost(req,db,res) {
  try {
    const questions = req.body.questions;
    const username = req.body.username;
    const gameType = req.body.gameType;


    //TODO: Handle if you dont find user
    const index = await GetCurrentSessionIndex(username)
    //TODO: MAKE A GETSESSION API to get correct session then remove following code

    const filter = {
        username : username,
    }

    let pushData = {
        questions : questions,
        game_type: gameType
    }

    if(req.body.order) {
        const order = req.body.order
        pushData.order = order
    }

    const pushFilter = "sessions." + index + ".games_played"
    //Push new session
    const insertResult = await db.collection("data").updateOne(
        filter,
        {$push: {
            [pushFilter] : pushData
        } 
        }
    );

    return res.status(200).json({
    code: 200,
    message: "Saved game data session.",
    data: insertResult,
    });
    
  }
  catch (error) {
    throwError("Could not save game data in session." + error)
    return res.status(400).json({
      code: 400,
      message: error,
      data: null,
      });
  }
}