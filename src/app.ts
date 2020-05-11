// Setup environment variables
import { config } from "dotenv";
config();

// Import Discord classes
import { Client, Message } from "discord.js";
import { Parser } from "./parser";

import { Command } from "./command/command";
import { CommandDraw, CommandShuffle } from "./command/draw";

// Helper functions
function isCapitalized(string: string):boolean {
    return string.toUpperCase() == string;
}

function takeCapitalization(input: string, capitalization: string):string {
    let output = "";
    for (let i = 0; i < input.length; i++) {
        if (i >= capitalization.length) {
            output += input.substr(i);
            return output;
        }

        let capitalized = isCapitalized(capitalization.charAt(i));
        let char = input.charAt(i);
        output += capitalized ? char.toUpperCase() : char.toLowerCase();
    }
    return output;
}

// Set up commands
let prefix = "!";

class CommandMarco implements Command {

    getUsage(prefix: string): string {
        return prefix + "marco"
    }

    isValidAlias(alias: string): boolean {
        return alias.toLowerCase() == "marco";
    }

    getCategory(): Command.Category|undefined {
        return undefined;
    }

    onMessage(bot: Client, message: Message, prefix: string, parsed: string, args: string): void {
        let marco = parsed.substr(prefix.length);
        message.channel.send(takeCapitalization("Polo!", marco));
    }

}

let help = new Command.Help();

let commands:Command[] = [
    new CommandMarco(),
    new CommandDraw(),
    new CommandShuffle(),
    help
];

help.setCommands(commands);

// App
const client = new Client();

client.once("ready", () => {
    console.log("Bot is ready!");
});

client.on("message", async(message: Message) => {
    if (message.content.startsWith(prefix)) {
        let commandName:string, commandArgs:string;

        let index = message.content.indexOf(' ');
        if (index == -1) {
            commandName = message.content;
            commandArgs = "";
        } else {
            commandName = message.content.substr(0, index);
            commandArgs = message.content.substr(index + 1).trim();
        }

        for (let command of commands) {
            if (command.isValidAlias(commandName.substr(prefix.length))) {
                command.onMessage(client, message, prefix, commandName, commandArgs);
                return;
            }
        }
    }
});

client.login(process.env.TOKEN);
