---
title: "Project Management Tool(Orca)"
description: "Tool to track your task and Pr's "
date: "Apr 5 2024"
draft: false
slug: "orca-project-management-tool"
demoURL: "https://project-2-beta-eight.vercel.app/"
repoURL: "https://github.com/lakshmanshankar/project-2"
---

## Project Management Tool

```sh
STATUS = BUILDING
``` 

A flexible, multi-user project management tool inspired by Notion’s dynamic collections. Manage tasks and GitHub PRs with a block-based structure, custom properties, and optimized client-side caching.


## 🚀 Features
Tasks & PR Management – Organize and track work efficiently.

Custom Properties – Define dynamic fields per task or PR.

Optimized Client Caching – React Query ensures fast updates with minimal refetching.

CMD + K Navigation – Quick actions for an efficient workflow.

Multi-User Workspaces – Collaborative and scalable.

## 🔧 Architecture
![Backend Arch](https://invk935vtx.ufs.sh/f/WLuidxolfrXg9cGQZ73W8VZdUGT6pFDsiI5avqCrlB0xYmMh)

1. Built on a unified action-based architecture, keeping the backend, frontend, and cache updates in sync.

2. Unified Action Handler – Strongly typed, routing all block, property, and value operations.

3. Single-Source API Design – Reduces redundancy and improves maintainability.

## Tech Stack
- Frontend: Next.js 15, React Query, ShadCN
- Backend: Next.js API Routes, Drizzle ORM, PostgreSQL
- Auth: BetterAuth
- Hosting: Vercel,Neon(PG)

## 📦 Installation
```sh
# Clone the repository
git clone https://github.com/lakshmanshankar/project-2.git && cd project-2

# Install dependencies
pnpm install

# Start development server
pnpm dev
```
## 📜 License

MIT License. Check out the repo 👉 [GitHub](https://github.com/lakshmanshankar/project-2).



