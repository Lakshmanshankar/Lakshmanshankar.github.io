---
title: "Excalidraw with supabase "
description: "Excalidraw with cloud storage using supabase"
date: "Feb 17 2025"
draft: false
slug: "excalidraw-with-custom-backend"
# demoURL: "https://astro-sphere-demo.vercel.app"
repoURL: "https://github.com/Lakshmanshankar/excalidraw"
---


## Excalidraw app with cloud storage

I recently built a custom backend for Excalidraw using Supabase. In this post I'll explain how I built it.

## Motivation:

As software developers, we love whiteboards for sketching ideas—whether it's for algorithms, architecture designs, or just for fun. Excalidraw is an excellent tool for this purpose. Its keyboard-centric design makes it intuitive and arguably the best option for quick sketches. Moreover, Excalidraw is open source and features some impressive React code.

However, I missed the ability to access files via cloud storage. While Excalidraw+ offers some solutions, I thought it would be a fun and interesting project to work on. So I decided to build this project for <u>myself</u>.

This wasn’t a very time-consuming project to build. The total lines of code were around 2.5K LOC, and I was able to complete it in two weeks of my free time.

## Features I added:

- Authentication using google
- Upload and save files to cloud storage.
- File tree for organizing files
- Move and update files


## Examples:
![full screen app](https://invk935vtx.ufs.sh/f/WLuidxolfrXgVBfHk1XJbXMIKyj2N1RgvU3QkWLCZHO4YG68)

Light mode and dark mode
<div style="display: flex;">

![File menu light](https://invk935vtx.ufs.sh/f/WLuidxolfrXgVdpTMdXJbXMIKyj2N1RgvU3QkWLCZHO4YG68)


![File men dark](https://invk935vtx.ufs.sh/f/WLuidxolfrXgSxHYlj4k3r9RIhTMPOVali4tCfGFyeu2HA1Q)
</div>

Demo with options
![Demo with options](https://invk935vtx.ufs.sh/f/WLuidxolfrXgPLUIXMiPDzFy6VLCw4rnE29cGlN3aYfI1hZ7)


## Tech Stack:

I'm a big fan of Next.js, but since Excalidraw is primarily built with React, I opted for a traditional backend using Express and Supabase.

- Express
- Auth.js (formerly Next-Auth)
- Drizzle
- Supabase

For the frontend, I used React. Given the heavy data fetching involved, I chose React Query to optimize the process.

## Architecture:
Requirements:

1. Create and save Excalidraw files.
2. Update and move files.

Since all data is stored in the cloud, I used a flat file structure per user and organized files with a file tree. This design provides the flexibility to move and update files without modifying file-level details.

### File structure:

```
Supabase stroage /{user_id}/{file_id}.excalidraw
```

File tree json

```json
 {
    "name": "Web",
    "id": "6bc5c407-39ed-479e-84bb-8524dcdb0b1e",
    "type": "folder",
    "children": [
        {
            "name": "React",
            "id": "cf306c18-e9f4-4793-a708-1af3e067480d",
            "type": "file",
            "children": []
        }
    ]
},
```

We built a simple Express backend with Auth.js for authentication, using presigned URLs instead of direct uploads via Express. Initially, the frontend was built using a simple React context, but we noticed unnecessary API calls. Switching to React Query optimized the process effectively.

## What I Learned:

Although I had worked with the Excalidraw codebase before, building this project on my own required new design decisions. It was challenging but rewarding.


### Disclaimer:

This project is for my personal use only. I have great respect for Excalidraw and its creators for building such an amazing open source tool.
