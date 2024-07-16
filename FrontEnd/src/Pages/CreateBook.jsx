import React, { useState } from 'react'
import BackButton from '../Components/BackButton'
import Spinner from '../Components/Spinner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function CreateBook() {
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [publishYear,setPublishYear] = useState('')
  const [loading ,setLoading] = useState('')
  const navigate = useNavigate()

  async function handleSaveBook(){
    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true)
    await axios.post("http://localhost:4000/books",data)
    .then(()=>{
      setLoading(false)
      navigate("/")
    })
    .catch((error)=>{
      setLoading(false)
      alert('An Error hanppened. Please Check Console')
      console.log(`Error ${error}`);
    })
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Create Book</h1>
      {
        loading ? (
          <Spinner/>
        ) : (
          <div className='flex flex-col border-2 border-red-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className='my-4'>
              <label className='text-xl text-gray-500 mr-4'>Title</label>
              <input type="text"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
               />
            </div>

            <div className='my-4'>
              <label className='text-xl text-gray-500 mr-4'>Author</label>
              <input type="text"
              value={author}
              onChange={(e)=>setAuthor(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
               />
            </div>

            <div className='my-4'>
              <label className='text-xl text-gray-500 mr-4'>Publish Year</label>
              <input type="text"
              value={publishYear}
              onChange={(e)=>setPublishYear(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
               />
            </div>

            <button className='p-2 bg-red-300 m-8' onClick={handleSaveBook}>
              Save
            </button>

          </div>
        )
      }
    </div>
  )
}
