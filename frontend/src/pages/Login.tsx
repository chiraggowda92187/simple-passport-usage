import axios from "axios";
import { useState } from "react"
import '../App.css';
export const Login = ()=>{
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    return (
      <div>
        <div>
          Enter your Emal :
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          Enter your Password :
          <input
            type="text"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
            <button onClick={async()=>{
                await axios.post("http://localhost:3000/api/auth/login/localPassword", {
                  email : email,
                  password : password
                })
            }}>Login</button>
        </div>
      </div>
    );
}