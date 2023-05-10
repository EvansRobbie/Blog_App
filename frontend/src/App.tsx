import './App.css'
import {useState} from 'react'
import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
// import Login from './pages/Login'
import LoginModal from './components/LoginModal'
import Home from './pages/Home'

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
      </Routes>
    </>
  )
}

export default App
