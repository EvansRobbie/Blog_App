import { useNavigate } from "react-router-dom"

const BackButton = () => {
    const navigate = useNavigate()
  return (
    <div onClick={()=> navigate(-1)} className='fixed top-24 left-5 z-20 opacity-100 bg-slate-900 text-slate-200 p-1 rounded-full bg-opacity-50'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>

    </div>
  )
}

export default BackButton