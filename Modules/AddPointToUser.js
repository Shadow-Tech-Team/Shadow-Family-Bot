import Database from "../Classes/Database/Database.js";
import UserSetting from "../Schemas/UserSetting.js";
import Messages from "../Classes/Messages/Messages.js";


export default async function AddPointToUser(interaction, client, UserID, PointToAdd) {
    try {
        const Data = new Database();

        // Get User Info From Database
        let UserInfo = await Data.FetchUser(interaction, client, UserID)

        // Get User Current Point From Database
        let UserCurrentPoint = await UserInfo.UserCurrentPoint
        let UserAllPoints = await UserInfo.UserAllPoint

        // Add Point To User's Data
        let UserNewPoint = UserCurrentPoint + PointToAdd
        let UserNewAllPoint = UserNewPoint + UserAllPoints

        // Update User Current Point and Save It Into Database
        await UserSetting.updateOne({UserID: UserID}, {UserCurrentPoint: UserNewPoint}, {returnOriginal: false})
        await UserSetting.updateOne({UserID: UserID}, {UserAllPoint: UserNewAllPoint}, {returnOriginal: false})

        // Show / Return Current User Point After Saving
        return UserNewPoint
    } catch (error) {
        Messages.Error('AddPointToUser => Update Current Point', error)
    }
}
