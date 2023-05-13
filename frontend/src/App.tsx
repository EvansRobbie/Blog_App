import './App.css'
import {useState} from 'react'
import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import axios from 'axios'
// import Login from './pages/Login'
import LoginModal from './components/LoginModal'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.withCredentials =  true
// console.log(axios.defaults.baseURL)

function App() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const handleModalChange = () =>{
    setShowModal(true)
  }

  return (
    <>
      <Navbar onChange = {handleModalChange} />
      {showModal && <LoginModal showModal = {showModal} setShowModal = {setShowModal} onChange = {handleModalChange} />}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<CreatePost/>}/>
        <Route path='/create/:id' element={<CreatePost/>}/>
        <Route path = '/post/:id' element={<PostDetail/>}/>
      </Routes>
    </>
  )
}

export default App
