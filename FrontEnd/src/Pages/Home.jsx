import { useEffect, useState } from 'react'
import React from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import { AiOutlineEdit } from "react-icons/ai"
import { BsInfoCircle } from "react-icons/bs"
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md"
import Spinner from '../Components/Spinner'

export default function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false)

    // console.log(`All Books : ${JSON.stringify(books,null,2)}`);
    // console.log(`Title : ${books[0].title}`);
    // books.map((book)=>{
    //     console.log(book.title);
    // })
    useEffect(() => {

        async function fetchBooks() {
            setLoading(true)
            try {
                const res = await fetch("http://localhost:4000/books")
                if(!res.ok){
                    throw new Error(`Network Response was not Ok: ${res.status}`)
                }
                const jsonData = await res.json()
                // console.log(jsonData.data[0].title);
                setBooks(jsonData.data)
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
        fetchBooks()
    }, [])
    return (
        <>
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Book List</h1>
                <Link to='/books/create/'>
                <MdOutlineAddBox className='text-sky-800 text-4xl'/>
                </Link>
            </div>
            {
                loading ? 
                  (  <Spinner/>)
                 : 
                    (<table className='w-full border-separate border-spacing-2 '>
                        <thead>
                            <tr>
                                <th className='border border-slate-600 rounded-md'>No</th>
                                <th className='border border-slate-600 rounded-md'>Title</th>
                                <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
                                <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
                                <th className='border border-slate-600 rounded-md'>Operations</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                books.map((books,index)=>(
                                   <tr key={books._id} className='h-8'>
                                        <td className='border border-slate-700 rounded-md text-center'>{index+1}</td>
                                        <td className='border border-slate-700 rounded-md text-center'>{books.title}</td>
                                        <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{books.author}</td>
                                        <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{books.publishYear}</td>
                                        <td className='border border-slate-700 rounded-md text-center'>
                                            <div className='flex justify-center gap-x-4'>
                                                <Link to={`/books/details/${books._id}`}>
                                                <BsInfoCircle className='text-2xl text-green-800'/>
                                                </Link>
                                                <Link to={`/books/edit/${books._id}`}>
                                                <AiOutlineEdit className='text-2xl text-yellow-600'/>
                                                </Link>
                                                <Link to={`/books/delete/${books._id}`}>
                                                <MdOutlineDelete className='text-2xl text-red-600'/>
                                                </Link>
                                            </div>
                                        </td>

                                    </tr>

                                ))
                            }
                        </tbody>
                    </table>)
                
            }
        </div>
        </>
    )
}
