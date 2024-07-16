import React, {useState,useEffect} from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import BackButton from '../Components/BackButton'
import Spinner from "../Components/Spinner"


export default function ShowBook() {
  const [books,setBooks] = useState({})
  const [loading,setLoading] = useState(false)
  const {id} = useParams()

  useEffect(()=>{
    // setLoading(true)
    // axios.get(`http://localhost:4000/books/${id}`)
    // .then((res)=>{
    //   setBooks(res.data)
    //   setLoading(false)
    // })
    // .catch((error)=>{
    //   console.log(`ERROR : ${error}`);
    // })

    async function fetchSingleBook(){
      setLoading(true)
      try {
        const fetchSingleBook = await fetch(`http://localhost:4000/books/${id}`)
        if(!fetchSingleBook.ok){
          console.log(`Failed To fetch Book Details`);
        }
        const jsonBookData = await fetchSingleBook.json()
        console.log("Json Book Details : ",jsonBookData);
        setBooks(jsonBookData.data)
        setLoading(false)
        
      } catch (error) {
        console.log(`Error : ${error.message}`);
        setLoading(false)
      }
    }
    fetchSingleBook()
  },[])

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Show Books</h1>
      {
        loading ? (
          <Spinner/>
        ) : (
          <div className='flex flex-col border-2 border-red-400 rounded-xl w-fit p-4'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Id</span>
              <span>{books._id}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Title</span>
              <span>{books.title}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Author</span>
              <span>{books.author}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
              <span>{books.publishYear}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Create Time</span>
              <span>{new Date(books.createdAt).toString()}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
              <span>{new Date(books.updatedAt).toString()}</span>
            </div>

          </div>
        )
      }
    </div>
  )
}
