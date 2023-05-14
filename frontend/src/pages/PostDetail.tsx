import axios from "axios";
import { formatISO9075 } from "date-fns";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import BackButton from "../components/BackButton";
interface postProp {
  _id: string;
  owner: {
    _id: string;
    username: string;
  };
  title: string;
  content: string;
  coverImage: string;
  createdAt: string;
}

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [post, setPost] = useState<postProp | null>(null);
  const { user } = useUserContext();
  // console.log(user?._id)
  useEffect(() => {
    if (!id) return;
    try {
      axios.get(`/posts/${id}`).then(({ data }) => setPost(data));
    } catch (e) {
      alert("Post details failed to load");
    }
  }, [id]);
  const deletePost = async (id:string) =>{
        try{
            await axios.delete(`/posts/${id}`)
            navigate('/')
        }catch(e){
            alert('Post not deleted')
        }
  }
  // console.log(post)
  // if(!post) return '';
  return (
    <div className="relative my-20 py-6 max-w-6xl px-4 mx-auto flex group flex-col gap-4">
      {post && (
        <>
          <div className="pt-2">
            <h2 className="font-bold text-xl sm:text-2xl md:text-3xl text-center">
              {post?.title}
            </h2>
            <div className="flex flex-col justify-center items-center pt-2 gap-1 ">
              <span className="text-sm text-slate-400">
                {post?.createdAt && formatISO9075(new Date(post?.createdAt))}
              </span>
              <div>
                by @{" "}
                <span className="text-sm font-bold">
                  {post?.owner.username}
                </span>{" "}
              </div>
              {user?._id === post?.owner._id ? (
                <div className="flex justify-around w-full">

                <Link
                  to={`/create/${id}`}
                  className="bg-cyan-500 px-4 py-2 flex items-center  text-slate-100 text-center hover:bg-slate-900 duration-300 ease-in rounded-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  &nbsp;Edit post
                </Link>
                <div onClick={() => deletePost(post._id)} className="bg-red-500 px-4 py-2 flex items-center  text-slate-100 text-center hover:bg-slate-900 duration-300 ease-in rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>

                    Delete Post
                </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <img
            className="max-h-[60vh] w-full object-cover rounded-xl drop-shadow-xl aspect-auto "
            src={`http://127.0.0.1:5000/${post?.coverImage}`}
            alt=""
          />

          <div className=" py-3 ">
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: post?.content || "" }}
            />
          </div>
        </>
      )}
      <BackButton  />
    </div>
  );
};

export default PostDetail;
