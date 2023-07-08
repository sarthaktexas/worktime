import { userAgentFromString } from 'next/server';
import random from '../../lib/random'

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_SECRET;

const twilio = require('twilio')(accountSid, authToken);

const AirtablePlus = require("airtable-plus")

const numbers_airtable = new AirtablePlus({
    baseID: 'app4P7JF2iGkJOLC4',
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: "Users",
    transform: (r) => {
        r = r.fields.number
        return r
    }
})

const users_airtable = new AirtablePlus({
    baseID: 'app4P7JF2iGkJOLC4',
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: "Users",
})

const prompts_table = new AirtablePlus({
    baseID: 'app4P7JF2iGkJOLC4',
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: "Prompts",
    transform: (r) => {
        r = r.fields.prompt
        return r
    }
})

const prompts_airtable = new AirtablePlus({
    baseID: 'app4P7JF2iGkJOLC4',
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: "Prompts",
})

export default async (req, res) => {
    if (req.query.code === process.env.WORKTIME_SECRET) {
        await users_airtable.updateWhere(`picture != ""`, { picture: null }); // clears all pictures
        await prompts_airtable.updateWhere(`prompt != ""`, { current: false }); // clears all current prompt selectors
        const prompts = await prompts_table.read();
        // grab a prompt randomly from the prompt array
        const prompt = prompts[random(0, prompts.length)]
        await prompts_airtable.updateWhere(`prompt = "${prompt}"`, { current: true }); // sets current prompt selector
        // text the prompt to users in a team:
            // grab numbers for all users in a team
            const numbers = await numbers_airtable.read();
            
            // text all numbers with same prompt
            numbers.forEach(number => {
                twilio.messages
                .create({
                    body: `you have 10 minutes.\nsend a picture of: ${prompt}.`,
                    to: `${number}`, // text the number in the array
                    from: process.env.TWILIO_NUMBER, // a valid Twilio #
                });
            })
            res.status(200).send("success!")
            
    } else {
        res.status(403).send("Forbidden: you need the right code :)")
    }
}