import { useState } from "react"
import Button from "./Button"
import axios from "axios"

const Register = ({setToggle, handleToggle}:{setToggle:React.Dispatch<React.SetStateAction<boolean>>, handleToggle:()=> void}) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
      // const data = 
      try{
        await  axios.post('/register',{
          username, 
          email,
          password
        } )
        setToggle(false)
        setUsername('')
        setEmail('')
        setPassword('')
        // alert('Registration Successful')
      }catch(e){
        // console.log(e)
        alert('Registration Failed')
      }
  }
  return (
    <form onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-2">
                    <label htmlFor="username">Username</label>
                    <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" id="username" />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" id="email" />
                    </div>
                    <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" id="password" />
                    </div>
                    <div className="flex flex-row-reverse justify-start gap-2">
                    <label htmlFor="check">Remember me</label>
                    <input type="checkbox" id="check" />
                    </div>
                    <Button text='Register' className="absolute  top-0 text-center flex items-center justify-between w-full text-slate-200 left-0 h-full rounded-full bg-slate-900"/>
                    <div className="flex md:hidden gap-2 items-center">
                        <p className="text-sm">Already have an account?</p>
                        <span onClick={handleToggle} className="text-cyan-500 hover:underline underline-offset-2">Login</span>
                    </div>
                    
    </form>
  )
}

export default Register