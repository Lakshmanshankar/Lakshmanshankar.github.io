import React from 'react'
import { SkillsIcons } from './Skills'
export default function Contacts() {
    return (
        <div className=' sm:w-full w-full flex justify-center items-center sm:px-5'>
            <div className="links sm:w-8/12 w-full  bg2 rounded-xl sm:p-5 flex-row flex justify-between">
                <a href="https://www.github.com/lakshmanshankar" className="link"><SkillsIcons name='github' size={100} total={4} /></a>
                <a href="https://www.linkedin.com/in/lakshmanshankar" className="link"><SkillsIcons name='linkedin' size={50} total={4} /></a>
                <a href="https://twitter.com/10Lakshman" className="link"><SkillsIcons name='twitter' size={50} total={4} /></a>
                <a href="https://medium.com/@lakshmanashankrc" className="link"><SkillsIcons name='medium' size={100} total={4} /></a>
            </div>
        </div>
    )
}

