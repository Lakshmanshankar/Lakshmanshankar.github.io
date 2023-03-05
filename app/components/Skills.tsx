"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { ubuntu, raleway } from "@/fonts/exports";
import Image from "next/image";

function Skills() {
  return (
    <section className=" bg1 mt-0.5 h-max py-10 sm:h-max w-full" id="projects">
      <h1
        className={`${ubuntu.className} text3 slow sm:text-9xl text-5xl sm:p-10 text-clip`}
      >
        Skills
      </h1>

      <div className="grid-layout sm:p-5 shadowme">
        <div className="three gitems sm:row-span-4 bg2 shadowme">
          <div
            className={`${raleway.className} sm:text-xl texl-lg sm:px-14 sm:py-14 text1 p-7`}
          >
            As a Computer Science student with a passion for building useful
            applications, I am eager to learn new technologies and tools to
            bring my ideas to life. Specifically, I am interested in developing
            full-stack web applications using Next.js, TypeScript, and MySQL. I
            am also working on other NoSQL databases like Azure CosmosDB and
            MongoDB. Working with various frameworks helps me choose which
            framework to use to complete the tasks efficiently.
          </div>
        </div>
        <div className="three gitems grid sm:row-span-2 bg2 sm:col-span-1 shadowme">
          <div className="flex justify-evenly w-full ">
            <SkillsIcons total={5} name={"typescript"} size={120} />
            <SkillsIcons total={5} name={"nextjs"} size={120} />
            <SkillsIcons total={5} name={"nodejs"} size={90} />
            <SkillsIcons total={5} name={"python"} size={120} />
          </div>
        </div>
        <div className="three gitems sm:row-span-2 bg2 sm:col-span-1 p-10 grid layout2">
          <div className="devOps flex justify-evenly w-full ">
            <SkillsIcons total={5} name={"ansible"} size={120} />
            <SkillsIcons total={5} name={"docker"} size={90} />
            <SkillsIcons total={5} name={"linux"} size={120} />
            <SkillsIcons total={5} name={"azure"} size={120} />
          </div>
        </div>

        <div className="three gitems sm:row-span-2 bg2 justify-evenly sm:col-span-2 mt-2">
          <div
            className={`${raleway.className} sm:text-xl sm:p-5 texl-lg sm:px-14 text1 p-5`}
          >
            As a Computer Science student with a keen interest in DevOps and
            full-stack applications, I have been exploring Docker, Azure, and
            Linux to expand my knowledge and skills. I am Using Docker to
            containerize the applications, Create CI workflows for storing them
            in different container registries and use Azure cloud to deploy them.
            I am Mainly using Azure cosmosDB, Container Instances and Azure
            functions. I am also proficient in using Azure CLI to create Azure
            resources. This is the Technologies I am currently using to create
            applications.
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;

export function SkillsIcons({
  name,
  size,
  total,
}: {
  name: string;
  size: number;
  total: number;
}): JSX.Element {
  const [newsize, setNewsize] = useState(0);

  return (
    <Image
      src={`/assets/${name}.svg`}
      width={newsize}
      height={newsize}
      alt="No Image"
      className=" p-1 sm:p-2 rounded-md inershad sm:w-28 backed bg-zinc-50 sm:h-32 w-14 h-14 sm:scale1 shadow-lg"
      priority={true}
    ></Image>
  );
}
