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

## Data Model 

![Backend Arch](https://invk935vtx.ufs.sh/f/WLuidxolfrXg9cGQZ73W8VZdUGT6pFDsiI5avqCrlB0xYmMh)

The current data model uses three main PostgreSQL tables: `BLOCK`, `PROPERTY`, and `PROPERTY_VALUES`.

1. Blocks are the actual tasks or PR entries that users create. These blocks are responsible for holding the property values and the associated properties together.

2. Properties are much like the columns of a table, but they are dynamic, allowing you to change their type.

3. Property values are the value entries for a block and a property.


### Why Not NoSQL?

Using a NoSQL database may seem flexible at first, but when we need to think about deleting properties and enforcing relations ourselves, it becomes a harder system to maintain. These are some reasons why NoSQL is not suitable for this project:

1. Deletes are the worst – Removing a property requires modifying all related documents. If you have 100+ task rows, each document needs an update, and large-scale writes are expensive. In SQL, cascading deletes handle this automatically.

2. Query inefficiency – Properties and tasks are stored separately, leading to multiple fetches instead of a simple JOIN.

3. Bulk operations are costly – Updating thousands of documents vs. running a single SQL query.

4. Data integrity challenges – No built-in constraints like foreign keys to enforce relationships.

5. Aggregations are harder – Though not needed now, complex calculations (like sum, count, or averages) are much trickier in NoSQL.

### Why SQL?

1. Cascading updates & deletes – Modify properties efficiently without touching every row.

2. Efficient queries – JOINs are better than manually fetching multiple documents.

3. Better indexing – Structured queries scale better with large data.

4. Stronger consistency – Every property value is strongly linked to its block and property.

5. Simpler property management – The server doesn’t need to check or enforce property existence manually. 🚀

As a software developer, I’ve always been amazed by how Notion implements its dynamic data model. Fortunately, I landed a job at a company that builds websites using Notion as a CMS, which gave me deeper insights into its structured data model.

After reading this blog about notion's [data model](https://www.notion.com/blog/data-model-behind-notion) and addtionaly, this [post](https://www.notion.com/blog/how-we-sped-up-notion-in-the-browser-with-wasm-sqlite) led me to explore Notion's SQLite file structure, which played a crucial role in shaping my current block-based model.

## Backend 

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



