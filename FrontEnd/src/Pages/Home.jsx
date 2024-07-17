import { useEffect, useState } from 'react'
import React from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import { AiOutlineEdit } from "react-icons/ai"
import { BsInfoCircle } from "react-icons/bs"
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md"
import Spinner from '../Components/Spinner'

import BooksTable from '../Components/Home/BooksTable'
import BooksCard from '../Components/Home/BooksCard'

export default function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false)
    const [showType, setShowType] = useState('table')

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
                if (!res.ok) {
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
                
                <div className='flex justify-center items-center gap-x-4'>
                    <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                        onClick={() => setShowType('table')}>Table</button>

                    <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                        onClick={() => setShowType('card')}>Card</button>
                </div>

                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl my-8'>Book List</h1>
                    <Link to='/books/create/'>
                        <MdOutlineAddBox className='text-sky-800 text-4xl' />
                    </Link>
                </div>
                {
                    loading ? <Spinner /> : showType ==='table' ? <BooksTable books={books} /> : (<BooksCard books={books}/>)
                }
            </div>
        </>
    )
}
