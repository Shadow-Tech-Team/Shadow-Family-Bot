import { REST, Routes } from "discord.js";
import Config from '../../Config/Config.json' assert { type: "json" }
import { readdirSync } from 'fs';
import { join } from 'path';
import chalk from "chalk";
import Messages from "../Messages/Messages.js";

export default class LoadCommands {

    static async Load(client) {


        const commands = [];

        const foldersPath = join('./Commands')
        const commandFolders = readdirSync(foldersPath);

        for (const folder of commandFolders) {
            const commandsPath = join(foldersPath, folder);
            const commandCategories = readdirSync(commandsPath)
            const commandFiles = commandCategories.filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const filePath = join(commandsPath, file);

                const command = await import(`../../Commands/${folder}/${file}`).then(c => c.default)

                try {
                    if ('data' in command && 'execute' in command) {
                        commands.push(command.data.toJSON());
                        client.SlashCommands.set(command.data.name, command);
                    } else {
                        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                    }
                } catch (error) {
                    Messages.Error('LoadCommand => First Load', error)
                }

            }
        }


        const rest = new REST().setToken(Config.Main.Token);

        (async () => {
            try {
                console.log(`Started refreshing ${commands.length} application ${chalk.green('(/)')} commands.`);

                const data = await rest.put(
                    Routes.applicationGuildCommands(Config.Main.ApplicationID, Config.Main.GuildID),
                    { body: commands },
                );

                console.log(`Successfully reloaded ${data.length} application ${chalk.green('(/)')} commands.`);
            } catch (error) {
                Messages.Error('LoadCommand => Second Load', error)
            }
        })();

    }
}