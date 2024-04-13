import EmbedCreator from "../Embed/EmbedCreator.js";
import Database from "../Database/Database.js";

const Data = new Database()
export default class UserManagement {
    constructor () {

    }

    static async Create(client, interaction, Username, UserEmail, Usernumber, Userpassword, UserPoint, UserCurrentPoint, UserRemovedPoint, UserAllPoint) {
        await Data.CreateUser(interaction, client, interaction.user.id, Username, UserEmail, Usernumber, Userpassword, UserPoint, UserCurrentPoint, UserRemovedPoint, UserAllPoint)
    }

    static async Login(interaction, client, UserID, UserPassword) {
        return Data.LoginUser(interaction, client, UserID, UserPassword)
    }
}