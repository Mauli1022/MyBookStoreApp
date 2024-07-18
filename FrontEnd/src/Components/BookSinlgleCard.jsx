import React from 'react'
import { Link } from 'react-router-dom'
import { PiBookOpenTextLight } from 'react-icons/pi'
import { BiShow, BiUserCircle } from 'react-icons/bi'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdFlashAuto, MdOutlineDelete } from 'react-icons/md'

import { useState } from 'react'
import BookModel from './Home/BookModel'

export default function BookSingleCard({ books }) {
    const [showModel, setShowModel] = useState(false)

    return (
        <div
            key={books._id}
            className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
            <h2 className='absolute top-1 right-2 px-4 py-4 bg-red-300 rounded-lg'>
                {books.publishYear}
            </h2>
            <h4 className='my-2 text-gray-500'>{books._id}</h4>

            <div className='flex justify-start items-center gap-x-2'>
                <PiBookOpenTextLight className='text-red-300 text-2xl' />
                <h1 className='my-4 '>{books.title}</h1>
            </div>


            <div className='flex justify-start items-center gap-x-2'>
                <BiUserCircle className='text-red-300 text-2xl' />
                <h1 className='my-4 '>{books.author}</h1>
            </div>

            <div className='flex justify-between items-center gap-x-2 mt-4p-4'>
                <BiShow className='text-3xl text-blue-800' onClick={() => setShowModel(true)} />
                <Link to={`books/details/${books._id}`}>
                    <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
                </Link>

                <Link to={`/books/edit/${books._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>

                <Link to={`/books/delete/${books._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-600' />
                </Link>
            </div>
            {
                showModel && (<BookModel books={books} onClose={() => setShowModel(false)} />)
            }
        </div>
    )
}