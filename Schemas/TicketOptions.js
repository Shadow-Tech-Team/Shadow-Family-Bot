import { Schema, model } from "mongoose";

const TicketOptions = new Schema({
    GuildID: {
        type: String,
        required: true
    },

    Option: {
        type: Array,
        required: true,
        default: {
            name: "Default",
            value: "default",
            description: "Default Option",
            emoji: "👤",
            supportrole: "123456789951357",
            supportermessage: "Default Message"
        }
    }
})

export default model('TicketOptions', TicketOptions)