import {useState} from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import Button from "./Button"
import { useUserContext } from '../context/UserContext'

const Login = ({handleToggle, setShowModal}:{handleToggle:()=> void, setShowModal:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {setUser} = useUserContext()
  const navigate = useNavigate()
  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    try{

   const {data} =  await  axios.post('/login', {
        username, 
        password
      
      })
      setUser(data)
      navigate('/')
      setShowModal(false)
    }catch(e){
      alert('Login Failed')
    }
    // if(user){
    //   return <Navigate to={'/'}/>
    // }
  //  console.log(data)
  }

  return (
    <form onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-2">
        <label htmlFor="username">Username</label>
        <input onChange={(e)=>setUsername(e.target.value)} value={username} className="" type="text" id="username" />
        </div>
        <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="text" id="password" />
        </div>
        <div className="flex flex-row-reverse justify-start gap-2">
        <label htmlFor="check">Remember me</label>
        <input type="checkbox" id="check" />
        </div>
        <Button text="Login" className="absolute  top-0 text-center flex items-center justify-between w-full text-slate-200 left-0 h-full rounded-full bg-slate-900"/>
        <div className="flex md:hidden gap-2 items-center">
            <p className="text-sm">Don't have an account?</p>
            <span onClick={handleToggle} className="text-cyan-500 hover:underline underline-offset-2">Register</span>
        </div>
                    
    </form>
  )
}

export default Login