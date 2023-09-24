const { Client } = require("@notionhq/client");

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

export default async function handler(req, res) {
    const { properties } = req.body;
    console.log("properties", properties);

    try {
        const response = await notion.pages.create({
            parent: { database_id: process.env.NOTION_PAPERS_DATABASE_ID },
            properties: properties,
        });
        console.log("Success! Entry added.", response);
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Failed to write paper data", error);
        return res.status(500).json({ error: 'Failed to write data / Make Page', details: error.message });
    }
}
