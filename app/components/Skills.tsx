"use client"
import React, { ReactNode, useEffect, useState } from 'react'
import { ubuntu, raleway } from '@/fonts/exports'
import Image from 'next/image'

function Skills() {
    return (
        <section className=' bg1 mt-0.5 h-max py-10 sm:h-max w-full' id='projects'>
            <h1 className={`${ubuntu.className} text3 slow sm:text-9xl text-5xl sm:p-10 text-clip`}>Skills</h1>

            <div className="grid-layout sm:p-5 shadowme">
                <div className="three gitems sm:row-span-4">
                    <div className="flex justify-between w-full bg4 ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur temporibus aliquid ullam explicabo impedit totam, aperiam voluptas quia fuga. Nesciunt dignissimos magni qui ab consequatur illo commodi facilis sunt dolore, in voluptates maxime eaque, eius provident! Repudiandae vitae sint facilis!
                    </div>
                </div>
                <div className="three gitems grid sm:row-span-2 bg2 sm:col-span-2 shadowme">
                    <div className="flex justify-evenly w-full ">
                        <SkillsIcons total={5} name={"typescript"} size={120} />
                        <SkillsIcons total={5} name={"nextjs"} size={120} />
                        <SkillsIcons total={5} name={"nodejs"} size={90} />
                        <SkillsIcons total={5} name={"python"} size={120} />

                    </div>
                </div>
                <div className="three gitems sm:row-span-2 bg2 sm:col-span-2 h-full p-10 grid layout2">
                    <div className="devOps flex justify-evenly w-full ">
                        <SkillsIcons total={5} name={"ansible"} size={120} />
                        <SkillsIcons total={5} name={"docker"} size={90} />
                        <SkillsIcons total={5} name={"linux"} size={120} />
                        <SkillsIcons total={5} name={"azure"} size={120} />
                    </div>
                </div>

                <div className="three gitems sm:row-span-2 bg2 justify-evenly sm:col-span-3 mt-2">
                    <div className={`${raleway.className} sm:text-2xl texl-lg sm:px-14 text1 p-5`}>
                        I follow the devOps principles to create CI/CD workflow for my projects, Docker to containerize my applications and deploy them on Azure cloud. Then I use Ansible to manage the configurations for the deployed applications.

                        I am also proficient in using Azure CLI and other devOps tools such as Git version control system and Github Actions.
                        This is my current stack of technologies that I use to build my projects.
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skills



function SkillsIcons({ name, size, total }: { name: string, size: number, total: number }): JSX.Element {
    const [newsize, setNewsize] = useState(0)
    useEffect(() => {
        const element = document.getElementById(`${name}`)
        // if (window) {
        //     setNewsize(120)
        // } else {
        //     setNewsize(size)
        // }
    }, [])

    return <Image src={`/assets/${name}.svg`} width={newsize} height={newsize} alt='No Image' className=' p-1 sm:p-2 rounded-md inershad sm:w-32 backed bg-zinc-50 sm:h-32 w-16 h-16   shadow-lg'></Image>

}