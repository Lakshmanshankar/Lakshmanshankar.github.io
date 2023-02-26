import React from 'react'
import { ubuntu, ubuntu as ubuntuFont } from '@/fonts/exports'
import { raleway } from '@/fonts/exports'

function Main() {
    return (
        <div className=' w-full h-5/6 py-14 bg1 sm:flex sm:flex-row flex flex-col'>

            <div className="sm:w-5/12 sm:h-5/6 sm:p-10 h-1/3 sm:flex sm:justify-center mt-10 bg1 sm:mb-16 flex justify-center items-center">
                <span className='sm:w-full sm:h-full w-min h-min flex items-center justify-center rounded-full bg1 pt-24 sm:py-0'>
                    <div className="imageDiv absolute sm:relative"></div>
                </span>
            </div>
            <div className="wrapper sm:w-6/12 w-full sm:h-full flex justify-center items-center flex-col sm:flex-row mt-10">
                <h1 className={`${ubuntu.className} sm:text-8xl back-gradient ml-5 sm:ml-0 py-10 sm:py-0 sliding text1 text-4xl mt-10 justify-center p-3 sm:p-1`}>
                    Hi, I am <span className=' background-change underline'>Lakshman</span>
                    <br />
                    <span className={`${raleway.className} sm:text-4xl text2 text-lg`}> <span className=''>Student</span> | Javascript developer | Linux user</span>
                    <div className="readmore sm:text-8xl text-2xl mt-10 animate-pulse sm:mt-40 fast-move flex justify-center  ">
                        <a href="#skills"> 👇 </a>
                    </div>
                </h1>
            </div>
        </div>
    )
}

export default Main
