import { Schema, model } from "mongoose"

const UserDutyHandler = new Schema({

    GuildID: {
        type: String,
        required: true,
        unique: true
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

UserDutyHandler.statics.isUserRegistred = async function(UserID) {
    const Status = await this.findOne({UserID})

    if (Status) return false
    return true;
}

export default model("UserDutyHandler", UserDutyHandler)