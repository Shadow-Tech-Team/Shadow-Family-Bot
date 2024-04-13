import Database from "../Classes/Database/Database.js";
import UserSetting from "../Schemas/UserSetting.js";
import Messages from "../Classes/Messages/Messages.js";


export default async function RemovePointFromUser(interaction, client, UserID, PointToRemove) {
    try {
        const Data = new Database();
        // Get User Info From Database
        let UserInfo = await Data.FetchUser(interaction, client, UserID)

        // Get User Current Point From Database
        let UserCurrentPoint = await UserInfo.UserCurrentPoint
        let UserRemovedPoint = await UserInfo.UserRemovedPoint

        // Add Point To User's Data
        let UserNewPoint = UserCurrentPoint - PointToRemove
        let UserNewRemovedPoint = UserRemovedPoint + PointToRemove

        // Update User Current Point and Save It Into Database
        await UserSetting.updateOne({UserID: UserID}, {UserCurrentPoint: UserNewPoint}, {returnOriginal: false})
        await UserSetting.updateOne({UserID: UserID}, {UserRemovedPoint: UserNewRemovedPoint}, {returnOriginal: false})

        // Show / Return Current User Point After Saving
        return UserNewPoint
    } catch (error) {
        Messages.Error('RemovePointFromUser => Update Current Point', error)
    }
}
