import axios from 'axios'
import React, {useContext, createContext, useState, useEffect} from 'react'
interface userProps {
    user:{
      _id:string | null
    } | null
    setUser:React.Dispatch<React.SetStateAction<{_id:string | null} | null>>
    handleLogout: () => void
}
interface childrenProp{
    children:React.ReactNode
} 

const userContext = createContext({} as userProps)

const UserContextProvider = ({children}:childrenProp) => {
    const [user, setUser] = useState<{_id:string | null} | null>(null)
    useEffect(() =>{
      const fetchUser = async () =>{
        if(!user){
          
          const {data} = await axios.get('/profile')
          // console.log(data)
          setUser(data)
        }
      }
      fetchUser()
    }, [])
    // console.log(user)
    const handleLogout = async () =>{
      await axios.post('/logout')
      setUser(null)
    }
  return (
    <userContext.Provider value= {{user, setUser, handleLogout}}>
        {children}
    </userContext.Provider>
  )
}
export const useUserContext = () =>{
  return useContext(userContext)
}

export default UserContextProvider