// import {Link} from 'react-router-dom'
const Navbar = ({onChange} :{onChange:() => void}) => {
  return (
    <header className="px-4 fixed top-0 left-0 z-10 bg-slate-200 flex items-center justify-between w-full h-20">
  
          <a className="font-bold text-xl " href="">My Blog</a>
          <nav className="">
            <ul className="flex gap-4">
              <li onClick={onChange} className='text-xl'>
              Login
              </li>
              {/* <li className='text-xl'>Account</li> */}
            </ul>
            
          </nav>
    </header>
  )
}

export default Navbar