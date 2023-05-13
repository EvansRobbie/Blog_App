import axios from "axios"
import { useEffect, useState } from "react"
import { formatISO9075} from 'date-fns'
import { Link } from "react-router-dom"
interface postProps {
  _id:string
  title: string
  summary: string
  coverImage:string
  owner?:{
    username:string
  }
  updatedAt:string
} 
const Home = () => {
  const [posts, setPosts] = useState<postProps[] >([])
  useEffect(()=>{
    const fetchPost = async () =>{
      try{
       const {data} =  await axios.get('/posts')
        setPosts(data)
      }catch(e){
        alert('Posts failed to load.')
      }

    }
    fetchPost()
  }, [])
  // console.log(posts)
  // if (!posts) return '';
  const postElement = posts.map((post)=>{
    const {_id:id, title, summary, updatedAt, owner, coverImage} = post
    return(
      <div key={id} className="flex flex-col md:flex-row gap-6 px-4 ">

        <Link to ={`/post/${id}`} className="aspect-[3] w-full h-full md:w-1/2 md:h-[20vh] lg:w-[30vw] lg:h-[40vh]">
            <img className="object-cover w-full h-full  rounded-2xl " src={`http://127.0.0.1:5000/${coverImage}`} alt={`/image/${title}`} />
        </Link>
        {/* </div> */}
        <div className="flex flex-col px-4">
        <Link to ={`/post/${id}`}>
        <h2 className="pt-2 text-xl font-bold hover:underline underline-offset-4 truncate">{title}</h2>
        </Link>
        <p className=" text-gray-500 flex gap-2 py-1  justify-center  italic">
            <a href="text-sm font-bold">{owner?.username}</a>
            <span>{formatISO9075(new Date(updatedAt))}</span>
        </p>
        <p className="text-sm md:text-base drop-shadow">{summary}
        </p>
        </div>
        </div>
       
    )
  })
  return (
    <div className=" max-w-5xl mx-auto my-20 py-6 flex flex-col gap-6  ">
        {posts && posts.length > 0 ? postElement : <div>No Posts Yet</div>}
    </div>
  )
}

export default Home