import {useEffect, useState} from 'react'
import Button from "../components/Button"
import Editor from '../components/Editor'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const CreatePost = () => {
    const {id} = useParams()
    // console.log(id)
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const[files, setFiles] =  useState<FileList | null>(null)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!id) return;
        axios.get(`/posts/${id}`).then(({data})=> {
            setTitle(data.title)
            setSummary(data.summary)
            setFiles(data.coverImage)
            setContent(data.content)
        })
    }, [id])
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('summary', summary)
    formData.append('content', content)
    if (files) {
      formData.append('file', files[0])
    }
    
    try {
      if (id) {
        // update post
        await axios.put(`/posts/${id}`, formData)
        navigate(`/post/${id}`)
      }else{
                await axios.post('/posts', formData)
                // console.log(formData)
                navigate('/')

            }
           
        }catch(e){
            alert('Post Failed to upload')
        }
        // console.log(files)
    }
  return (
    <form onSubmit={onSubmit} className="px-4 my-20 flex flex-col py-4 max-w-7xl mx-auto gap-4">
        <input className="py-2 border border-slate-400" type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
        <input className="py-2 border border-slate-400" type="text" placeholder="Summary" value={summary} onChange={(e)=>setSummary(e.target.value)} />
        <input className="py-2 border border-slate-400" type="file" onChange={(e)=>setFiles(e.target.files)} />
        <Editor value={content} onChange ={setContent}/>
        <Button text='create post' className="absolute  top-0 text-center flex items-center justify-between w-ful  text-slate-200 left-0 h-full rounded-full bg-slate-900"/>
    </form>
  )
}

export default CreatePost