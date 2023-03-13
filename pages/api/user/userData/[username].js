import clientPromise from "utils/database/mongodb";
import {throwError} from '@utils/imports/commonImports'
import { resolve } from "styled-jsx/css";
import EncryptUsername from "@utils/crypto/encryptUsername"

export default async function handler(req, res) {
  const { username } = req.query
  if(!username) {
    return res.json({
      code: 400,
      message: "Username cannot be null",
      data: {},
    });
  }

  const secureUsername = EncryptUsername(username)

  let client, db;
  try{
    client = await clientPromise;
    db = client.db(process.env.DB_NAME);
  } catch (e) {
    return res.json({
      code: 400,
      message: "Found error when initializing client and DB. " + e.message,
      data: {},
    });
  }

  switch (req.method) {
    case "POST":
      return await postUser(secureUsername,db,res)
    case "GET":
      return await getUser(secureUsername,db,res)
  }
}

async function getUser(username,db,res) {
  const bodyObject = {username: username}

  let findResponse = await db.collection("data").findOne(bodyObject)
    
  if(findResponse) {
    return res.json({
      code: 200,
      message: "Found user " + findResponse._id + ".",
      data: findResponse,
    });
  } else {
    return res.json({
      code: 404,
      message: "User " + username + " not found database.",
      data: {},
    });
  }
}

async function postUser(username, db,res) {
  try{
    const insertObject = {
      username: username,
      date_created: new Date(),
      sessions: [],
    }

    await db.collection("data").insertOne(insertObject);

    const bodyObject = {username: username}
    let findResponse = await db.collection("data").findOne(bodyObject)    

    return res.json({
      code: 200,
      message: "Created user.",
      data: findResponse,
    });

  } catch (e) {
    return res.json({
      code: 400,
      message: "Ran into error trying to post user into DB. " + e.message,
      data: {},
    });
  }
}

