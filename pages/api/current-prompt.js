const AirtablePlus = require("airtable-plus")

const airtable = new AirtablePlus({
    baseID: 'app4P7JF2iGkJOLC4',
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: "Prompts",
    transform: r => {
        return r.fields.prompt
    }
})

export default async (req, res) => {
    const record = await airtable.read({
        filterByFormula: `current`
    })
    res.status(200).json(record);
}