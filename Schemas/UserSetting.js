import { OAuth2Scopes } from "discord.js"
import { Schema, model } from "mongoose"

const UserSetting = new Schema({

    GuildID: {
        type: String,
        required: true,
        unique: true
    },

    UserID: {
        type: String,
        required: true,
        unique: true
    },

    UserName: {
        type: String,
        required: true
    },

    UserEmail: {
        type: String,
        required: true,
        unique: true
    },

    UserPassword: {
        type: String,
        required: true
    },

    UserNumber: {
        type: String,
        required: true,
        unique: true
    },

    UserPoint: {
        type: Number,
        required: true
    },

    UserCurrentPoint: {
        type: Number,
        required: true
    },

    UserRemovedPoint: {
        type: Number,
        required: true
    },

    UserAllPoint: {
        type: Number,
        required: true
    },

    OnDutyTime: {
        type: Object,
        default: {
            id: "11111111111111111",
            name: "Unknown Admin",
            time: 0
        },
        required: false
    }

})

UserSetting.statics.isUserRegistred = async function(UserID) {
    const Status = await this.findOne({UserID})

    if (Status) return false
    return true;
}

export default model("UserSetting", UserSetting)