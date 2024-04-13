import chalk from "chalk";
import { fileURLToPath } from "url";
import { basename } from "path";
export default class Messages {
    constructor() {

    }

    static async Error(Message, Error) {
        await console.log(console.log(`${chalk.blue('[')}${chalk.red('ERROR')}${chalk.blue(']')}: ${chalk.green(`${basename(fileURLToPath(import.meta.url))}`)} => ${chalk.yellow(Message)}: ${Error}`))
    }
}