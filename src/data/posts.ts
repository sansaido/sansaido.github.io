import { getCollection, getEntry } from "astro:content";

const unsortedPosts = await getCollection("posts")
export const sortedPosts = [...unsortedPosts].sort(
    (a,b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
)

console.log("Here is allBlogPosts");
console.dir(sortedPosts, {depth: null});