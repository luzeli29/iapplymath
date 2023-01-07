import clientPromise from "@utils/database/mongodb"
import {throwError} from '@common_imports'

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const bodyObject = req.body;
    switch (req.method) {
        case "POST":
            // create a filter for a movie to update
            const filter = { userId: bodyObject.userId };
            
            // create a document that sets the plot of the movie
            const updateDoc = {
            $set: {
                avatarId: bodyObject.avatarId
            },
            };
            try{
                let myPost = await db.collection("users").updateOne(filter,updateDoc)
                console.log(myPost)
                res.json(myPost.acknowledged);
            } catch (error) {
                throwError("Post to DB failed. " + error)
            }
            break;
        case "GET":
        
        break;
    }

}