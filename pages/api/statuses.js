const AirtablePlus = require("airtable-plus")

const airtable = new AirtablePlus({
    baseID: 'app4P7JF2iGkJOLC4',
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: "Users",
    transform: r => {
        delete r.fields.number
        if (r.fields.picture) { r.fields.submitted = true } else { r.fields.submitted = false }
        delete r.fields.picture
        return r.fields
    }
})

export default async (req, res) => {
    if ((new Date()).getMinutes() < 10) {
        const record = await airtable.read()
        res.status(200).json(record);
    } else {
        res.status(200).json([])
    }
}