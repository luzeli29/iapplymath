import clientPromise from "utils/database/mongodb"
import throwError from "@utils/error/throwError";
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
                await db.collection('users').updateOne(filter,updateDoc)
                let findResponse = await db.collection('users').findOne(filter)   
                return res.json({
                    code: 200,
                    message: '"avatarId" saved to user.',
                    data: findResponse,
                });
            } catch (error) {
                throwError("Post to DB failed. " + error)
            }
            break;
        case "GET":
        
        break;
    }

}