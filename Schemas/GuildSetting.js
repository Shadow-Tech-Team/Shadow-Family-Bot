import { Schema, model } from "mongoose"

const GuildSetting = new Schema({
    GuildID: {
        type: String,
        required: true
    },

    ContactUsLogsChannel: {
        type: String,
        required: true
    },

    FeedbackUsChannel: {
        type: String,
        required: true
    },

    Log: {
        type: String,
        required: true
    },

    WelcomeChannel: {
        type: String,
        required: true
    }
})

export default model('GuildSetting', GuildSetting)