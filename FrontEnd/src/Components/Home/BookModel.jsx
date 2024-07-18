import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { PiBookBookmarkLight } from 'react-icons/pi'
import { BiUserCircle } from 'react-icons/bi'

export default function BookModel({ books, onClose }) {
    return (
        <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
            onClick={onClose}>
            <div onClick={(event) => event.stopPropagation()}
                className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'>
                    <AiOutlineClose className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer' onClick={onClose}/>

                    <h2 className='w-fit px-4 py-1 bg-red-300 rounded-lg'>
                    {books.publishYear}
                </h2>
                <h4 className='my-2 text-gray-500'>{books._id}</h4>

                <div className='flex justify-start items-center gap-x-2'>
                    <PiBookBookmarkLight className='text-red-300 text-2xl'/>
                    <h1 className='my-4 '>{books.title}</h1>
                </div>

                
                <div className='flex justify-start items-center gap-x-2'>
                   <BiUserCircle className='text-red-300 text-2xl'/>
                    <h1 className='my-4 '>{books.author}</h1>
                </div>

                <p className='mt-4'>Anything You Want to Show</p>
                <p className='mt-4 overflow-hidden'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus, dolores voluptate a tempora maxime quasi assumenda consequatur quis minus similique quas aperiam eum labore odio. Dolores alias repellendus quibusdam debitis?
                </p>
                </div>
        </div>
    )
}
