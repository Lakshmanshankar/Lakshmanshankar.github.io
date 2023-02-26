"use client"
import React, { useState, useEffect } from 'react'

function MenuIcon(props: any) {
    const [toggle, setToggle] = useState(props.visible)
    useEffect(() => {
        let dom = document.querySelector('#line-one-bne')
        let dom2 = document.querySelector('#line-two-bne')
        if (toggle) {
            dom?.classList.add('menu-i-line-one')
            dom2?.classList.add('menu-i-line-two')
            dom?.classList.remove('menu-i-line-bone')
            dom2?.classList.remove('menu-i-line-btwo')
        }
        else {
            dom?.classList.remove('menu-i-line-one')
            dom2?.classList.remove('menu-i-line-two')
            dom?.classList.add('menu-i-line-bone')
            dom2?.classList.add('menu-i-line-btwo')
        }
    }, [toggle])
    return (
        <div className=' w-10 h-10 flex flex-col items-center justify-center relative' onClick={() => setToggle(!toggle)}>
            <div className=' w-9/12 h-1 menu-i-line-bone bg3' id='line-one-bne'></div>
            <div className=' w-9/12 h-1 menu-i-line-btwo bg3' id='line-two-bne'></div>
        </div>
    )
}

export default MenuIcon