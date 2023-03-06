import clientPromise from "@utils/database/mongodb"
import {throwError} from '@utils/imports/commonImports'

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const bodyObject = req.body;
    switch (req.method) {
        case "POST":
            const filter = { username: bodyObject.username };

            const updateDoc = {
            $set: {
                avatar_id: bodyObject.avatarId
            },
            };
            try{
                let myPost = await db.collection("data").updateOne(filter,updateDoc)
                res.json(myPost.acknowledged);
            } catch (error) {
                throwError("Post to DB failed. " + error)
            }
            break;
        case "GET":
        
        break;
    }

}