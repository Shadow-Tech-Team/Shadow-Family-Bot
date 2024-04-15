import { Schema, model } from "mongoose";

const YTNotify = new Schema({
    GuildID: String,
    ID: String,
    Channel: String,
    Latest: Array,
    Message: String,
    PingRole: String
})

export default model('YTNotify', YTNotify)