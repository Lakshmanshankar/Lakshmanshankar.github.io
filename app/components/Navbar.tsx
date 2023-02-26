"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import { raleway } from '@/fonts/exports'
import MenuIcon from './MenuIcon'

function Navbar() {
    const [toggle, setToggle] = React.useState(false)
    const [theme, setTheme] = React.useState(false)
    useEffect(() => {
        if (window.innerWidth > 768) return () => { console.log(window.innerWidth); }
        else {
            let dom = document.querySelector('#mailul')
            if (toggle) {
                dom?.classList.add('slide-out')
                dom?.classList.remove('slide-in')
            }
            else {
                dom?.classList.add('slide-in')
                dom?.classList.remove('slide-out')
            }
        }
    }, [toggle])
    return (
        <header className=' w-full flex justify-center fixed z-50'>
            <nav className=' w-full sm:w-11/12 py-3 flex justify-between items-center sm:px-9  blurrish sm:rounded-xl' >
                <h2 className=' font-poppins '>ManPage</h2>

                <ul className=' sm:flex sm:w-4/12 sm:h-auto sm:justify-between sm:flex-row  w-full absolute sm:relative flex top-10 sm:top-0 flex-col h-screen justify-center items-baseline sm:bg-transparent bg5 rounded-xl mt-2 text1' id='mailul'>
                    <li className={`${raleway.className}  listOps ml-20 my-2 sm:text-2xl sm:my-0`} onClick={() => setToggle(!toggle)}><Link href={""}>Home</Link></li>
                    <li className={`${raleway.className}  listOps ml-20 my-2 sm:text-2xl sm:my-0`} onClick={() => setToggle(!toggle)}><Link href={"/"}>About</Link></li>
                    <li className={`${raleway.className}  listOps ml-20 my-2 sm:text-2xl sm:my-0`} onClick={() => setToggle(!toggle)}><Link href={"/"}>Contact</Link></li>
                    <li className={`${raleway.className}  listOps ml-20 my-2 sm:text-2xl sm:my-0`} onClick={() => setToggle(!toggle)}><Link href={"/"}>Skills</Link></li>
                </ul>

                <div className="div3 flex w-1/12 flex-row justify-between">
                    <button className=' relative right-24 sm:relative sm:right-0  sm:p-2 sm:rounded-lg sm:hover:transition-all'
                        onClick={() => {
                            setTheme(!theme)
                            setColors(theme)
                        }}
                        id='themebtn'
                    >
                        dark
                    </button>
                    <button className=' absolute sm:hidden right-2 top-1 ' onClick={() => setToggle(!toggle)}><MenuIcon /></button>
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
        root.style.setProperty('--bg-four', '#FF57B9FF') // light rose
        root.style.setProperty('--bg-five', '#FF2965FF') // red rose
        root.style.setProperty('--bg-six', '#FAFAFAFF') // light rose


        root.style.setProperty('--text-one', '#fff')  // text color are light
        root.style.setProperty('--text-two', '#fff')

        if (dom) {
            dom.innerHTML = `light`
        }

    }
    else { // light colors
        root.style.setProperty('--bg-one', '#D6EFFFFF') // black
        root.style.setProperty('--bg-two', 'rgba(255, 240, 240, 0.5)') // white
        root.style.setProperty('--bg-three', '#ff9900') // orange
        root.style.setProperty('--bg-four', '#FFB700FF') // light orange
        root.style.setProperty('--bg-five', '#FFE208FF') // red rose
        root.style.setProperty('--bg-six', '#FF57B9FF') // light rose
        root.style.setProperty('--text-one', '#000')

        root.style.setProperty('--text-two', '#24051CFF')


        if (dom) {
            dom.innerHTML = `dark`
        }
    }
}
