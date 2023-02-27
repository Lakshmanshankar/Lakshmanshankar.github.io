import React from 'react'
import { raleway, ubuntu } from '@/fonts/exports'
function About() {
    return (
        <div>
            <section className=' w-full h-max bg1 mt-1 py-10' id='about'>
                <h1 className={`${ubuntu.className} gradientcolor sm:text-9xl text-5xl`}>About Me</h1>
                <p className={`${raleway.className} text-lg sm:tex-2xl text2 p-5`}>
                    I am a Javascript developer (👨‍🎓)  working on the NextJS fullstack applications.
                    <br /> <br />

                    As a computer science student, I have spent the last few years learning and developing my skills in various areas of computer science, such as programming languages, operating systems and devops. I have had the opportunity to work on a range of projects, both individually and as part of a team, which has given me valuable experience in building and deploying applications.

                    <br /><br />
                    I am someone who is passionate about building innovative and exciting software applications. I believe that the key to creating truly remarkable software is staying up-to-date with the latest technologies and continuously expanding my skill set. I am currently working on NEXT Js and MySQL database.
                    <br /><br />
                    As a Linux, I am part of a community that values flexibility, technical proficiency, and collaboration. Using Linux has helped me develop important skills  and has given me the opportunity to contribute to open-source projects and collaborate with others in the tech industry.

                    <br /><br />
                    Thank you for taking the time to read my About page. If you have any questions or would like to discuss potential projects, please feel free to contact me.
                </p>
            </section>
        </div>
    )
}

export default About