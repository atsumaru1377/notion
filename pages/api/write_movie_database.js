import axios from "axios";
const { Client } = require("@notionhq/client")

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

export default async function handler(req, res) {
    const { detail, title_jp, credit } = req.body;

    const properties = {
        Title : {
            title: [
                {
                    text: {
                        content: detail.title
                    }
                }
            ]
        },
        Genre : {
            multi_select: detail.genres.map((v) => ({name : v.name}))
        },
        "Title (Japanese)" : {
            rich_text: [
                {
                    text: {
                        content: title_jp
                    }
                }
            ]
        },
        "Release Date" : {
            date: {
                start: detail.release_date
            }
        },
        Year : {
            select: {
                name: detail.release_date.slice(0, 4)
            }
        },
        Director : {
            multi_select:
                credit.crew
                    .filter((v) => v.job === "Director")
                    .map((v) => ({name : v.name}))
        },
        "Cast/Actor" : {
            multi_select:
                credit.cast
                    .slice(0, 5)
                    .map((v) => ({name : v.name, color: "green"}))
        },
        Duration : {
            number: detail.runtime
        },
        Type : {
            select : {
                name: "Movie"
            }
        },
        "Production Company" : {
            multi_select:
                detail.production_companies
                    .map((v) => ({name : v.name}))
        },
        Series : {
            select: {
                name: detail.belongs_to_collection.name
            }
        },
        Watched : {
            checkbox: true
        },
        Recommend : {
            checkbox: false
        },
    };

    const poster = `https://image.tmdb.org/t/p/original${detail.poster_path}`
    const cover = `https://image.tmdb.org/t/p/original${detail.backdrop_path}`

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
            children: [
                {
                    object: "block",
                    type: "image",
                    image: {
                        type: "external",
                        external: {
                            url: poster
                        }
                    }
                }
            ]
        });
        console.log("Success! Entry added.");
        console.log(response);
    } catch (error) {
        console.error("Failed to write movie data", error);
    }
};