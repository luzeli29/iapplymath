import clientPromise from "@utils/database/mongodb"
import {throwError} from '@common_imports'

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const bodyObject = req.body;
    switch (req.method) {
        case "POST":
            // create a filter for a movie to update
            const filter = { username: bodyObject.username };
            
            // create a document that sets the plot of the movie
            const updateDoc = {
            $set: {
                pet_id: bodyObject.petId
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