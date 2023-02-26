import React from 'react'
import { ubuntu, ubuntu as ubuntuFont } from '@/fonts/exports'
import { raleway } from '@/fonts/exports'

function Main() {
    return (
        <div className=' w-full h-screen bg1 sm:flex sm:flex-row flex flex-col'>
            <div className="wrapper sm:w-11/12 h-full flex justify-center items-center flex-col sm:flex-row">
                <h1 className={`${ubuntu.className} sm:text-8xl back-gradient sliding text1 text-4xl mt-10 justify-center`}>
                    Hi, I am <span className=' background-change underline'>Lakshman</span>
                    <br />
                    <span className={`${raleway.className} sm:text-4xl text2 text-lg`}> <span className=''>Student</span> | Javascript developer | Linux user</span>


                    <div className="readmore text-8xl animate-pulse sm:mt-40 fast-move flex justify-center  ">
                        <a href="#skills"> 👇 </a>
                    </div>
                </h1>

                <div className="sm:w-3/12 sm:p-10 sm:flex sm:justify-center items-center sm:mb-16">
                    <span className='w-full flex items-center justify-center p-3 rounded-full bg5 sliding'>
                        <div className="imageDiv"></div>
                    </span>

                </div>


            </div>
        </div>
    )
}

export default Main