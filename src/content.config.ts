// This file defines Astro Content Collections
// see: https://docs.astro.build/en/guides/content-collections/

// import utilities
import { defineCollection, z } from "astro:content";

// loaders
import { glob, file } from 'astro/loaders';

// glob is appropriate for cases of 1 file per 1 entry
// file is appropriate for multiple entries for 1 file (like a json file holding multiple entries)
// // The file() loader accepts a second argument that defines a parser function. This allows you to specify a custom parser (e.g. toml.parse or csv-parse) to create a collection from a file’s contents.

// define all site collections
const posts = defineCollection({ 
    loader: glob({ pattern: "**/*.md", base: "./posts" }), //does not use @posts alias. uses path relative to basePath in TSConfig
    
    // A schema guarantees that this data exists in a predictable form when you need to reference or query it.
    // Astro uses Zod for schemas https://github.com/colinhacks/zod (hence the z)
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
    })
    //TODO: look into exactly how these schemas work. inserting "url" here breaks it
 })

// export all collections as a single object
export const collections = {posts}

// The Content Layer API allows you to fetch your content
// (whether stored locally in your project or remotely)
// and uses a loader property to retrieve your data.
