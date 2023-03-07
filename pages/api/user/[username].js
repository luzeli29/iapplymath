import clientPromise from "@utils/database/mongodb";
import {throwError} from '@utils/imports/commonImports'
import { resolve } from "styled-jsx/css";

export default async function handler(req, res) {
  const { username } = req.query

  if(!username) {
    return res.json({
      code: 400,
      message: "Username cannot be null",
      data: {},
    });
  }
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
      return await postUser(username,db,res)
    case "GET":
      return await getUser(username,db,res)
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
      message: "User" + username + " not found database.",
      data: {},
    });
  }
}

async function postUser(username, db,res) {
  const bodyObject = {username: username}

  //Check if user is already in DB
  try {
    const findResponse = await getUser(username, db,res)
  } catch (e) {
    return res.json({
      code: 400,
      message: "Ran into error trying to check if user is in DB before posting. " + e.message,
      data: {},
    });
  }

  console.log(findResponse)
  //TODO: Check if 404, if so then post user. 
  try{

    const insertObject = {
      username: username,
      date_created: new Date(),
      sessions: [],
    }

    const insertResult = await db.collection("data").insertOne(insertObject);

    return res.json({
      code: 200,
      message: "Created user.",
      data: insertResult,
    });

  } catch (e) {
    return res.json({
      code: 400,
      message: "Ran into error trying to post user into DB. " + e.message,
      data: {},
    });
  }
}