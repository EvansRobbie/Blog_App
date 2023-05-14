import { useUserContext } from "../context/UserContext";
import {Link} from 'react-router-dom'

// import {Link} from 'react-router-dom'
const Navbar = ({ onChange }: { onChange: () => void }) => {
  const { user, handleLogout } = useUserContext();
  // console.log(user);
  return (
    <header className="px-4 fixed top-0 left-0 z-10 bg-slate-200 flex items-center justify-between w-full h-20">
      <Link to={'/'} className="font-bold text-xl">
        My Blog
      </Link>
      <nav className=" flex gap-4 items-center">
          {user ? (
            <>
            <Link to='/create' className="text-xl cursor-pointer">Create New Post</Link>
            <div onClick={handleLogout} className="text-xl cursor-pointer">Logout</div>
            </>
          ) : (
            <div onClick={onChange} className="text-xl cursor-pointer">Login</div>
          )}

          {/* <li className='text-xl'>Account</li> */}
        
      </nav>
    </header>
  );
};

export default Navbar;
