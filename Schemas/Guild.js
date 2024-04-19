import { Schema, model } from "mongoose";

const Guild = new Schema({
    GuildID: {
        unique: true,
        type: String,
        required: true
    },

    GuildName: String,
    GuildIcon: String
})

export default model("Guild", Guild)