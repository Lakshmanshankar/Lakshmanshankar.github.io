import React from 'react'
import { ubuntu, raleway } from '@/fonts/exports'
function Projects() {
    return (
        <section className=' bg1 mt-0.5 h-max sm:h-screen w-full' id='projects'>
            <h1 className={`${ubuntu.className} text3 slow sm:text-9xl text-5xl sm:p-10 text-clip`}>Projects</h1>
            <div className=' w-full h-max sm:py-24 py-12 rounded-xl flex flex-col justify-center sm:flex-row items-center sm:px-14  p-2'>
                <div className="div sm:w-1/2 sm:h-1/2 sm:py-5 bg2 sm:mx-5 rounded-xl shadow-xl p-10 ">
                    <h1 className={`${ubuntu.className} text-3xl background-change text3 sm:py-5 sm:px-12 sm:text-6xl p-2`}>Code Share</h1>
                    <p className={`${raleway.className}  sm:3xl text1 sm:py-6 sm:px-14 p-5  text-xl`}>
                        Code share is a web application built using React and Let the users to create beautiful images of their code in various themes and download them as PNG Formats
                    </p>
                    <div className={`${raleway.className} text-2xl sm:3xl text1 sm:py-6 sm:px-14 flex sm:flex-row flex-col items-center justify-center `}>
                        <a href="https://github.com/Lakshmanshankar/code-share" className=' bg5 sm:p-3 rounded-lg sm:m-4 hover:bg6 w-full text-center m-1'>Github Source</a>
                        <a href="https://lakshmanshankar.github.io/code-share/" className=' bg5 sm:p-3 rounded-lg sm:m-4 hover:bg6 w-full text-center m-1'> Live Url</a>
                    </div>
                </div>

                <div className="div sm:w-1/2 sm:h-1/2 sm:py-5 bg2 sm:mx-5 rounded-xl shadow-xl p-10 mt-5">
                    <h1 className={`${ubuntu.className} text-3xl background-change text3 sm:py-5 sm:px-12 sm:text-6xl p-2`}>Student Performance Tracking</h1>
                    <p className={`${raleway.className}  sm:3xl text1 sm:py-6 sm:px-14 p-5  text-xl`}>
                        Student Performance Tracking is a web application build Using NEXT js and MySQL backend with Typescript. Which Helps the Student to keep track of their academic progress. This application allow the users to generate reports based on their role.
                    </p>
                    <div className={`${raleway.className} text-2xl sm:3xl text1 sm:py-6 sm:px-14 flex sm:flex-row flex-col items-center justify-center `}>
                        <a href="https://github.com/lakshmanshankarc/student-management-system" className=' bg5 sm:p-3 rounded-lg sm:m-4 hover:bg6 w-full text-center m-1'>Github Source</a>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Projects



