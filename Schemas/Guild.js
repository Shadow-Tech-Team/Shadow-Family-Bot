import { Schema, model } from "mongoose";

const Guild = new Schema({
    GuildID: {
        unique: true,
        type: String,
        required: true
    },

    // ContactUsChannel: {
    //     unique: true,
    //     type: String,
    //     required: true
    // },

    // FeedbackUsChannel: {
    //     unique: true,
    //     type: String,
    //     required: true
    // },

    // LogChannel: {
    //     unique: true,
    //     type: String,
    //     required: true
    // },

    GuildName: String,
    GuildIcon: String
})

export default model("Guild", Guild)