import axios from "axios";

const { Client } = require("@notionhq/client")

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

export default async function handler(req, res) {
    const { isbn } = req.query;

    const options = {
        method: 'GET',
        url: `https://api.openbd.jp/v1/get?isbn=${isbn}&pretty`,
    };

    let book_data;
    try {
        const response = await axios.request(options);
        book_data = response.data[0].summary;
    } catch (error) {
        console.error(`Failed to fetch book data ${error}`);
        res.status(500).json({ error: "Failed to fetch book data" });
    }

    const title = book_data.title;
    const author = book_data.author;
    const publisher = book_data.publisher;
    const raw_pubdate = book_data.pubdate;
    const pubdate = (/^(\d{4})-(\d{2})-(\d{2})/.test(raw_pubdate)) ? raw_pubdate : null;
    const isbn13 = book_data.isbn;
    const toISBN10 = (isbn13) => {
        const src = isbn13.slice(3, 12);
        const sum = src.split('').map(s => parseInt(s))
          .reduce((p, c, i) => (i === 1 ? p * 10 : p) + c * (10 - i));
        const rem = 11 - sum % 11;
        const checkdigit = rem === 11 ? 0 : (rem === 10 ? 'X' : rem);
        return `${src}${checkdigit}`;
    }
    const isbn10 = toISBN10(isbn13);
    const cover = `https://images-na.ssl-images-amazon.com/images/P/${isbn10}.09.LZZZZZZZ.jpg`;

    try {
        const response = await notion.pages.create({
            parent: { database_id: process.env.NOTION_BOOK_DATABASE_ID },
            properties: {
                Title : {
                    title: [
                        {
                            text: {
                                content: title
                            }
                        }
                    ]
                },
                Author : {
                    multi_select: [
                        {
                            name: author
                        }
                    ]
                },
                Publisher : {
                    select: {
                        name: publisher
                    }
                },
                "Published Date" : {
                    date: pubdate ? { start : pubdate } : null
                },
                ISBN : {
                    number : Number(isbn),
                },
                Cover : {
                    url: cover
                }
            },
            cover: {
                type: "external",
                external: {
                    url: cover
                }
            }
        });
        res.status(200).json(response);c
    } catch (error) {
        console.error(`Failed to write book data ${error}`);
        res.status(500).json({ error: "Failed to write book data" });
    }
};