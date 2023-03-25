import clientPromise from "utils/database/mongodb";
import {throwError} from '@utils/imports/commonImports'
import { resolve } from "styled-jsx/css";
import EncryptUsername from "@utils/crypto/encryptUsername"

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const bodyObject = req.body;
}