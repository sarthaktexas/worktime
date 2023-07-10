const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_SECRET;

const twilio = require('twilio')(accountSid, authToken);

const AirtablePlus = require("airtable-plus")

const airtable = new AirtablePlus({
    baseID: 'app4P7JF2iGkJOLC4',
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: "Users"
})

export default async (req, res) => {
    const time = Date.now(); // current time in ms
    const prev_hour = time - (time % 3600000); // previous hour in ms
    const late = time - prev_hour > 600000 // late if past 10 minutes: dev value 6000000 (60min) prod value 600000
    if (req.body.NumMedia > 0 && !late) {
        sendMessage(req.body.From, "thanks :)")
        airtable.updateWhere(`number = "${req.body.From}"`,
        { picture:
            [
                {
                    url: req.body.MediaUrl0,
                }
            ]
        });
    } else if (req.body.NumMedia > 0 && late) {
        sendMessage(req.body.From, "ha no you're late. you had 10 minutes to submit it :)")
    } else {
        sendMessage(req.body.From, "why did you not attach a photo?? we want a photo!!!")
    }
    res.status(200).json("sent message");
}

function sendMessage(from, body) {
    twilio.messages
            .create({
                body: body,
                to: from, // text the number who sent the msg
                from: process.env.TWILIO_NUMBER, // a valid Twilio #
            });
        return;
}