import fs from "fs";
import Messages from "../Messages/Messages.js";

export default class Manager {

    static async SetupManager(Path, Data) {
        try {
            fs.writeFileSync(Path, JSON.stringify(Data, null, 4), { encoding:'utf-8', flag: "w" })
        } catch (error) {
            Messages.Error('Manager => Setup Manager', error)
        }
    }

    static async ReadData(Path) {
        try {
            const ReadedFile = fs.readFileSync(Path, { encoding:'utf-8' })
            return ReadedFile
        } catch (error) {
            Messages.Error('Manager => Read Data', error)
        }
    }

}