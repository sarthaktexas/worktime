const AirtablePlus = require("airtable-plus")

const airtable = new AirtablePlus({
    baseID: 'app4P7JF2iGkJOLC4',
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: "Users",
    transform: r => {
        return r.fields.picture[0].url
    }
})

export default async (req, res) => {
    if ((new Date()).getMinutes() > 10) {
        const record = await airtable.read({
            filterByFormula: `picture`
        })
        res.status(200).json(record);
    } else {
        res.status(200).json([])
    }
}