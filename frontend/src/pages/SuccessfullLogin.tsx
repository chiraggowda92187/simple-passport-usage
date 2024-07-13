import axios from "axios"
import { useEffect, useState } from "react"


type User = {
    email : String,
    name : String,
    id : number
}


// Todo :
// 1. configure the backend and frontend of our app not their problem.
// 2. Check the get request here, check what the backend returns and what is being printed. 
export const SuccessfullLogin = ()=>{
    const [user, setUser] = useState<User | null>(null)
    useEffect(()=>{
        async function getUserData(){
            const userResponse  = await axios.get("http://localhost:3000/api/data/successfullLogin")
            if(userResponse.data){
                console.log("User data : ", userResponse.data)
                setUser(userResponse.data)
            }
        }

        getUserData()
    }, [])
    return (
        <div>
            {user ? <div>
            Well this is it this is the Encrypted Data hich you will see only when you are logged in...!
            <div>{user?.email}</div>
            <div>{user?.name}</div>
            <div>{user?.id}</div> 
        </div> : "Well it seems you are not logged in....!"}
        </div>
        
    )
}