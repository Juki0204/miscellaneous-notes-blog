import { createClient } from "microcms-js-sdk";

export const client = createClient({
    serviceDomain: "pre-blog-nextjs",
    apiKey: process.env.API_KEY,
});

