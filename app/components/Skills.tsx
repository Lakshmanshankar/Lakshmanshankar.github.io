"use client"
import React, { useEffect } from 'react'
import { ubuntu, raleway } from '@/fonts/exports'
import Image from 'next/image'
import ansible from "../../public/asstest/anisible.svg"

function Skills() {
    return (
        <section className=' bg1 mt-0.5 h-max sm:h-screen w-full' id='projects'>
            <h1 className={`${ubuntu.className} text3 slow sm:text-9xl text-5xl sm:p-10 text-clip`}>Skills</h1>

            <div className="grid-layout sm:p-24">
                <div className="three gitems sm:row-span-4">
                    <div className="flex justify-between w-full overflow-scroll ">
                        <SkillsIcons total={5} name={"nodejs"} size={120} />
                        <SkillsIcons total={5} name={"nextjs"} size={120} />
                        <SkillsIcons total={5} name={"typescript"} size={90} />
                        
                    </div>
                </div>
                <div className="three gitems grid sm:col-span-2 sm:row-span-2">
                    <div className="flex ju">
                        <SkillsIcons total={5} name={"cpp"} size={100} />
                        <SkillsIcons total={5} name={"linux"} size={100} />
                        <SkillsIcons total={5} name={"python"} size={100} />
                    </div>
                </div>
                <div className="three gitems sm:row-span-2 h-full p-10 grid layout2">
                    <div className="devOps flex justify-between w-full ">
                        <SkillsIcons total={5} name={"ansible"} size={120} />

                        <SkillsIcons total={5} name={"docker"} size={90} />
                        <SkillsIcons total={5} name={"github"} size={100} />
                    </div>
                </div>

                <div className="three gitems sm:row-span-2 flex justify-evenly sm:flex-col felx-col">
                    <SkillsIcons total={5} name={"azure"} size={120} />
                    <div> I am Currently using NextJS edge Function to deploy my code but i had Worked on Azure VM, Container Registry, CosmosDB and Azure functions
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skills



function SkillsIcons({ name, size, total }: { name: string, size: number, total: number }) {
    useEffect(() => {
        const element = document.getElementById(`${name}`)

        if (element) {
            element.style.backgroundImage = `url('@/public/asstest/${name}.svg')`
        }
    }, [])

    return <Image src={`/assets/${name}.svg`} width={size} height={size} alt='No Image' className={`w-1/${total} mx-2 `}>
    </Image>
}