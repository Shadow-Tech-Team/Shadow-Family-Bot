import { Schema, model } from "mongoose";

const TicketSetting = new Schema({

    GuildID: {
        type: String,
        required: true,
        unique: true
    },

    Category: {
        type: String,
        required: true,
        unique: true
    },

    EmbedTitle: {
        type: String,
        required: true
    },

    EmbedDescription: {
        type: String,
        required: true
    },

    EmbedColor: {
        type: String,
        required: true
    },

    Channel: {
        type: String,
        required: true
    },

    TicketNumber: {
        type: Number,
        required: true,
        default: 1
    }
})

export default model("TicketSetting", TicketSetting)