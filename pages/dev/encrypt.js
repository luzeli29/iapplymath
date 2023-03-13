import Loading from "@comps/screens/loading"
import useUser from "@hooks/user/useUser"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import HashUsername from "@utils/crypto/encryptUsername"
import {useTwoWayEncrypt} from "@hooks/useTwoWayEncrypt"

export default function Encrypt() {
    const [encrypt1, setEncrypt1] = useState()
    const [encrypt2, setEncrypt2] = useState()
    const {encrypt} =  useTwoWayEncrypt()

    function handleSubmit(event) {
        event.preventDefault()
        const inputUsername = event.target.username.value

        setEncrypt1(encrypt(inputUsername))
        setEncrypt2(encrypt(inputUsername))
    }

    return (
        <div className="container">
            <p>Encrypt 1 : {encrypt1}</p>
            <p>Encrypt 2 : {encrypt2}</p>
            <form className="" autoComplete="off" onSubmit={handleSubmit}>
                <div className="row w-75 mx-auto pt-5">
                    <label className="col-4 text-end" htmlFor="UserId">Username:</label>
                    <input className="col-6" id="username" type="text" name="username" pattern="[a-zA-Z0-9]*"/>
                </div>
                <div className="row w-75  mx-auto text-center">
                    <p>Only characters and numbers, no spaces or symbols.</p>
                </div>
                <div className="row pt-5">
                    <div className="col-12 text-center">
                        <button className="basic_button" type="submit" name="action" value="login">Login</button>
                    </div>
                </div>
            </form>
        </div>
        )
  }