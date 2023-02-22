import clientPromise from "@utils/database/mongodb";
import {throwError} from '@common_imports'
import { resolve } from "styled-jsx/css";

export default async function handler(req, res) {
  const { username } = req.query
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  switch (req.method) {
    case "POST":
      userPost(username,db,res)
      break;
    case "GET":
      userGet(username,db,res)
      break;
  }
}

async function userGet(username,db,res) {
  const bodyObject = {username: username}
  let findResponse = await db.collection("users").findOne(bodyObject)
    
  if(findResponse) {
    res.json({
      code: 200,
      message: "Loging into user " + findResponse._id + ".",
      data: findResponse,
    });
  } else {
    res.json({
      code: 400,
      message: "User not in database.",
      data: {},
    });
  }
}

async function userPost(username, db,res) {
  try {
    const bodyObject = {
      username: username,
    }
    let findResponse = await db.collection("users").findOne(bodyObject)
    if(findResponse) {
      res.json({
        code: 400,
        message: "User already in database.",
        data: {},
      });
    } else {
      const insertObject = {
        username: username,
        dateCreated: new Date(),
        sessions: []
      }
      const insertResult = await db.collection("users").insertOne(insertObject);
      res.json({
        code: 200,
        message: "Created user.",
        data: insertResult,
      });
    }
  } catch (error) {
    throwError("Could not create user. " + error)
  }
}