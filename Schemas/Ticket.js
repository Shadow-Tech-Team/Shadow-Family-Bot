import {Schema, model} from "mongoose"

const Ticket = Schema({

    GuildID: {
        type: String,
        required: true
    },

    ChannelID: {
        type: String,
        required: true
    },

    ChannelName: {
        type: String,
        required: true
    },

    UserID: {
        type: String,
        required: true
    },

    TicketID: {
        type: String,
        required: true
    },

    SupporterRoleID: {
        type: String,
        required: true
    },

    CreationDate: {
        type: String,
        required: true
    }

})

export default model('Ticket', Ticket)