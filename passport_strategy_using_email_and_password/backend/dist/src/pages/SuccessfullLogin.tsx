import axios from "axios"
import { useEffect, useState } from "react"


type User = {
    email : String,
    name : String,
    id : number
}
export const SuccessfullLogin = ()=>{
    const [user, setUser] = useState<User | null>(null)
    useEffect(()=>{
        async function getUserData(){
            const userResponse  = await axios.get("http://localhost:3000/api/data/successfullLogin")
            setUser(userResponse.data)
        }

        getUserData()
    }, [])
    return (
        <div>
            Well this is it this is the Encrypted Data hich you will see only when you are logged in...!
            <div>{user?.email}</div>
            <div>{user?.name}</div>
            <div>{user?.id}</div>
        </div>
    )
}