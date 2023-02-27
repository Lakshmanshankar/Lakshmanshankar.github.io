import React from 'react'
import { raleway, ubuntu } from '@/fonts/exports'
function About() {
    return (
        <div>
            <section className=' w-full h-max slow sm:py-64 bg1 mt-1 py-10' id='about'>
                <h1 className={`${ubuntu.className} text1 background-change slow sm:text-9xl text-5xl sm:p-10`}>About Me</h1>
                <p className={`${raleway.className} text-lg sm:text-3xl text2 p-5 sm:p10 sm:flex sm:full justify-center sm:items-center sm:px-40  sm:h-full`}>
                    I am a Javascript developer (👨‍🎓)  working on the NextJS fullstack applications.
                    <br className='sm:none sm:hidden' /> <br />

                    As a computer science student, I have spent the last few years learning and developing my skills in various areas of computer science, such as programming languages, operating systems and devops. I have had the opportunity to work on a range of projects, both individually and as part of a team, which has given me valuable experience in building and deploying applications.

                    <br className='sm:none sm:hidden' /><br className='sm:none sm:hidden' />
                    I am someone who is passionate about building innovative and exciting software applications. I believe that the key to creating truly remarkable software is staying up-to-date with the latest technologies and continuously expanding my skill set. I am currently working on NEXT Js and MySQL database.
                    <br /><br />
                    As a linux user, I am part of a community that values flexibility, technical proficiency, and collaboration. Using Linux has helped me develop important skills  and has given me the opportunity to contribute to open-source projects and collaborate with others in the tech industry.

                    <br className='sm:none sm:hidden' /><br className='sm:none sm:hidden' />
                    Thank you for taking the time to read my About page. If you have any questions or would like to discuss potential projects, please feel free to contact me.
                </p>
            </section>
        </div>
    )
}

export default About