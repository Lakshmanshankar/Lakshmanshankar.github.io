"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import { raleway } from '@/fonts/exports'
import MenuIcon from './MenuIcon'


function Navbar() {
    const [toggle, setToggle] = React.useState(true)
    const [theme, setTheme] = React.useState(true)
    useEffect(() => {
        if (window.innerWidth > 768) return () => { console.log(window.innerWidth); }
        else {
            let dom = document.querySelector('#mailul')
            if (toggle) {
                dom?.classList.add('slide-out')
                dom?.classList.remove('slide-in')
                setToggle(toggle)
            }
            else {
                dom?.classList.add('slide-in')
                dom?.classList.remove('slide-out')
                setToggle(toggle)
            }
        }
    }, [toggle])
    return (
        <header className=' w-full flex justify-center fixed z-50'>
            <nav className=' w-full sm:w-11/12 py-3 flex justify-between items-center sm:px-9  blurrish sm:rounded-xl' >
                <h2 className=' font-poppins text1 px-2 '>Portfolio</h2>
                <ul className=' sm:flex sm:w-4/12 sm:h-auto sm:justify-between sm:flex-row w-full pblur absolute sm:relative flex top-10 sm:top-0 flex-col h-screen justify-center items-baseline sm:bg-transparent bg3 rounded-xl mt-2 text1' id='mailul' onClick={() => { setToggle(!toggle) }}>
                    <li className={`${raleway.className}  listOps ml-20 my-2 sm:text-2xl sm:my-0`} onClick={() => { setToggle(!toggle) }}><a href={"#main"}>Home</a></li>
                    <li className={`${raleway.className}  listOps ml-20 my-2 sm:text-2xl sm:my-0`} onClick={() => setToggle(!toggle)}><a href={"#about"}>About</a></li>
                    <li className={`${raleway.className}  listOps ml-20 my-2 sm:text-2xl sm:my-0`} onClick={() => setToggle(!toggle)}><a href={"#projects"}>Projects</a></li>
                    <li className={`${raleway.className}  listOps ml-20 my-2 sm:text-2xl sm:my-0`} onClick={() => setToggle(!toggle)}><Link href={"/"}>Skills</Link></li>
                </ul>

                <div className="div3 flex w-1/12 flex-row justify-between">
                    <button className=' relative right-24 sm:relative sm:right-0  sm:p-2 sm:rounded-lg sm:hover:transition-all text1 sm:text-3xl font-extrabold'
                        onClick={() => {
                            setTheme(!theme)
                            setColors(theme)
                        }}
                        id='themebtn'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-sun" viewBox="0 0 16 16">
                            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                        </svg>
                    </button>
                    <button className=' absolute sm:hidden right-2 top-1 ' onClick={() => setToggle(!toggle)}><MenuIcon props={toggle} /></button>
                </div>
            </nav>
        </header >
    )
}

export default Navbar


// onClick={(event) => {  // for click on ul to remove
//     event?.preventDefault()
//     setToggle(!toggle)
// }}


function setColors(state: boolean) {
    let dom = document.getElementById('themebtn')
    const root = document.documentElement
    root.style.transition = "0.4s"
    if (state) { // darks colors
        root.style.setProperty('--bg-one', '#000')  // black
        root.style.setProperty('--bg-two', 'rgba(0, 0, 0, 0.5)') // black
        root.style.setProperty('--bg-three', '#ff002b') // red rose
        root.style.setProperty('--bg-four', 'rgba(255, 224, 224, 0.18)') // light rose
        root.style.setProperty('--bg-five', '#FF2965FF') // red rose
        root.style.setProperty('--bg-six', '#6EFFAAFF') // light rose
        root.style.setProperty('--text-one', '#fff')  // text color are light
        root.style.setProperty('--text-two', '#fff');
        root.style.setProperty('--text-three', '#0DFF00FF');
        root.style.setProperty('--text-four', '#00FFF7FF');
    }
    else { // light colors
        root.style.setProperty('--bg-one', '#D6EFFFFF') // black
        root.style.setProperty('--bg-two', 'rgba(255, 240, 240, 0.5)') // white
        root.style.setProperty('--bg-three', '#ff9900') // orange
        root.style.setProperty('--bg-four', 'rgba(245, 222, 222, 0.3)') // light orange
        root.style.setProperty('--bg-five', '#FFE208FF') // red rose
        root.style.setProperty('--bg-six', '#FF45CDFF') // light rose
        root.style.setProperty('--text-one', '#000')
        root.style.setProperty('--text-two', '#24051CFF')
        root.style.setProperty('--text-three', '#FF1E00FF');
        root.style.setProperty('--text-four', '#FF007BFF');
    }
}
