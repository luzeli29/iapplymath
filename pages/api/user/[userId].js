import clientPromise from "@utils/database/mongodb";
import {throwError} from '@common_imports'

export default async function handler(req, res) {
  const { userId } = req.query
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  const bodyObject = {userId: userId}
  switch (req.method) {
    case "POST":
      try {
        let findResponse = await db.collection("users").findOne(bodyObject)
        
        if(findResponse) {
          res.json({
            code: 400,
            message: "User already in database.",
            data: {},
          });
        } else {
          await db.collection("users").insertOne(bodyObject);

          res.json({
            code: 200,
            message: "Created user.",
            data: {},
          });
        }
      } catch (error) {
        throwError("Could not create user. " + error)
      }
      return;
    case "GET":
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
      return;
  }
}

function userGet(params) {
  
}
function userPut(params) {
  
}
function userPost(params) {
  
}