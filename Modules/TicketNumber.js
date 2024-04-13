import Database from "../Classes/Database/Database.js"
import TicketSetting from "../Schemas/TicketSetting.js";
import Messages from "../Classes/Messages/Messages.js";
const TicketData = new Database();


export default async function GetTicketNumber(interaction) {
    try {
        // Get Guild Ticket Setting
        let TicketNumber = await TicketData.GetTicketSetting(interaction)

        // Get Ticket Number Range (0000, 9999)
        let TicketNumberRange = "" + (TicketNumber.TicketNumber + 1)

        // Get Current Ticket Number Befor Math
        let TicketNumberTemplate = "0000"

        // Proggress Math on Ticket Number and +1
        let CurrentTicketNumber = TicketNumberTemplate.substring(0, TicketNumberTemplate.length - TicketNumberRange.length) + TicketNumberRange

        // Update Set TicketNumber to Current Ticket Number in Database
        await TicketSetting.updateOne({GuildID: interaction.guild.id}, {TicketNumber: CurrentTicketNumber}, {returnOriginal: false})

        // Show / Return Current Ticket Number After Math
        return CurrentTicketNumber
    } catch (error) {
        Messages.Error('TicketNumber => Get Ticket Number', error)
    }
}
