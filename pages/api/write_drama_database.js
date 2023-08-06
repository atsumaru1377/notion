import axios from "axios";
const { Client } = require("@notionhq/client")

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

export default async function handler(req, res) {
    const { properties, cover, children, seasons } = req.body;
    let pageId = "";

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
        pageId = response.id;
        console.log(response);
    } catch (error) {
        console.error("Failed to write movie data", error);
        res.status(500).json({ error: 'Failed to write data / Make Page' });
    }

    let seasonDatabaseId = "";
    try {
        const response = await notion.databases.create({
            parent: { page_id: pageId },
            title: [
                {
                    text: {
                        content: `Seasons of ${properties.Title.title[0].text.content}`
                    }
                }
            ],
            properties: {
                Season : {
                    title: {}
                },
                "Air Date": {
                    date: {}
                },
                Episodes: {
                    number: {}
                },
            },
            is_inline: true,
        });
        seasonDatabaseId = response.id;
    } catch(error) {
        console.error("Failed to make season database", error);
        res.status(500).json({ error: 'Failed to write data / Make Season Database' });
    }


    for (let i = 0; i < seasons.length; i++) {
        try {
            const response = await notion.pages.create({
                parent: { database_id: seasonDatabaseId },
                properties: {
                    Season : {
                        title: [
                            {
                                text: {
                                    content: seasons[i].name
                                }
                            }
                        ]
                    },
                    "Air Date": {
                        date: {
                            start: seasons[i].air_date
                        }
                    },
                    Episodes: {
                        number: seasons[i].num_episode
                    },
                },
                children: [
                    ...(seasons[i].poster_path ? [{
                        object: "block",
                        type: "image",
                        image: {
                            type: "external",
                            external: {
                                url: "https://image.tmdb.org/t/p/original" + seasons[i].poster_path
                            }
                        }
                    }] : []),
                    ...seasons[i].episodes.map((v) => (
                        {
                            object: "block",
                            type: "numbered_list_item",
                            numbered_list_item: {
                                rich_text: [
                                    {
                                        type: "text",
                                        text: {
                                            content: v.name
                                        }
                                    }
                                ]
                            }
                        }
                    ))
                ]
            });
        } catch(error) {
            console.error("Failed to write season data", error);
            res.status(500).json({ error: 'Failed to write data / Write Season Data' });
        }
    }
    res.status(200).json({ message: 'Success' });
};