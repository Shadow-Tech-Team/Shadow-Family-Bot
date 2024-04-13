export default class UserViewManager {
    constructor() {

    }

    static async OverWritePermission(client, interaction, PermissionsArray) {

        // OverWrite Interaction Channel Permission
        const OverWrite = await interaction.channel.permissionOverwrites.set(PermissionsArray)

        // Return OverWrited Channel Permission
        return OverWrite
    }

    static async OverWritePermissionForSelectedChannell(client, interaction, ChannelID, PermissionsArray) {

        // Get Selected Channel Info/Data
        const SelectedChannel = await client.channels.cache.get(ChannelID)

        // OverWrite Selected Channel Permissions
        const OverWrite = await SelectedChannel.permissionOverwrites.set(PermissionsArray);

        // Return OverWrited Channel Permission
        return OverWrite
    }
}