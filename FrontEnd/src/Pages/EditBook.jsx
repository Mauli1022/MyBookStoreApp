import React, { useState,useEffect } from 'react'
import BackButton from '../Components/BackButton'
import Spinner from '../Components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import { useSnackbar } from 'notistack'

export default function EditBook() {
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [publishYear,setPublishYear] = useState('')
  const [loading ,setLoading] = useState('')
  const navigate = useNavigate()

  const {enqueueSnackbar} = useSnackbar()

  const { id } = useParams()
  console.log(id);

  useEffect(()=>{
    async function getBookForEdit(){
      setLoading(false)
      try {
        const res = await axios.get(`http://localhost:4000/books/${id}`)
        // console.log(res);
        setAuthor(res.data.data.author)
        setTitle(res.data.data.title)
        setPublishYear(res.data.data.publishYear)
        // console.log(title);
      } catch (error) {
        
      }
    }
    getBookForEdit()
  },[])

  async function handleSaveBook(){
    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true)
    await axios.put(`http://localhost:4000/books/${id}`,data)
    .then(()=>{
      setLoading(false)
      enqueueSnackbar("Book Edited Successfully",{variant : "success"})
      navigate("/")
    })
    .catch((error)=>{
      setLoading(false)
      // alert('An Error hanppened. Please Check Console')
      enqueueSnackbar("Error",{variant:'error'})
      console.log(`Error ${error}`);
    })
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Edit Book</h1>
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
