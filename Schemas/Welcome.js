import { Schema, model } from "mongoose";

const Welcome = new Schema({
    GuildID: {
        type: String,
        required: true
    },

    ChannelID: {
        type: String,
        required: true
    },

    WelcomeText: {
        type: String,
        required: true
    }
});

export default model('Welcome', Welcome)