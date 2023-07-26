import axios from "axios";
const { Client } = require("@notionhq/client")

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

export default async function handler(req, res) {
    const { properties, cover, children } = req.body;

    try {
        const response = await notion.pages.create({
            parent: { database_id: process.env.NOTION_MOVIE_DATABASE_ID },
            properties: properties,
            cover: {
                type: "external",
                external: {
                    url: cover
                }
            },
            children: children
        });
        console.log("Success! Entry added.");
        console.log(response);
    } catch (error) {
        console.error("Failed to write movie data", error);
    }
};