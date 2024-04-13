import Database from "../Database/Database.js"
import Messages from "../Messages/Messages.js";
let StaffDutyTime = {}
const Data = new Database();
export default class DutyHandler {
    constructor() {

    }


    static async OnDuty(interaction, UserID, UserName, Time) {
        try {
            if ((!StaffDutyTime[UserID]) || (StaffDutyTime[UserID] == null)) {
                StaffDutyTime[UserID] = {
                    UserID: UserID,
                    UserName: UserName,
                    OnDuty: true,
                    Time: Time
                }
                await interaction.reply({
                    content: 'Shoma Ba Movafaghiyat On-Duty Shodid.',
                    ephemeral: true
                })

            }
        } catch (error) {
            Messages.Error('DutyHandler => OnDuty', error)
        }
    }

    static async OffDuty(interaction, UserID) {
        try {
            if ((StaffDutyTime[UserID]) || (StaffDutyTime[UserID] != null)) {
                const OffDutyTime = (new Date().getTime() / 1000 | 0)
                const TimeWorked = OffDutyTime - StaffDutyTime[UserID].Time

                await Data.OnDutyTimeHandler(UserID, {
                    userId: UserID,
                    userName: interaction.user.displayName,
                    time: TimeWorked
                })

                return {
                    Message: "Shoma Ba Movafaghiyat Off-Duty Shodid.",
                    UserID: UserID,
                    UserName: StaffDutyTime[UserID].UserName,
                    Time: TimeWorked
                }, await interaction.reply({
                    content: 'Shoma Ba Movafaghiyat Off-Duty Shodid.',
                    ephemeral: true
                }), StaffDutyTime[UserID] = null;
            }
        } catch (error) {
            Messages.Error('DutyHandler => OffDuty', error)
        }
    }

    static async DutyTimeHandler(interaction, UserID) {
        try {
            await Data.TotalOnDutyTime(UserID).then((e) => {
                interaction.reply({
                    content: e,
                    ephemeral: true
                })
            }).catch((error) => {
                Messages.Error('DutyHandler => DutyTimeHandler -> (Data.TotalOnDutyTime)', error)
            })
        } catch (error) {
            Messages.Error('DutyHandler => DutyTimeHandler', error)
        }
    }


}