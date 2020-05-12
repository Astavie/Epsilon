// Setup environment variables
import { config } from "dotenv";
config();

// Import Discord classes
import { Client, Message } from "discord.js";
import { Parser } from "./parser";

import { Command } from "./command/command";
import { CommandDraw, CommandShuffle } from "./command/draw";

// Database
import lowdb from "lowdb";
import { default as FileSync } from "lowdb/adapters/FileSync";

const adapter = new FileSync("db.json");
let db = lowdb(adapter);

db.defaults({ defaultPrefix: "%", prefixes: {} }).write();

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

    async onMessage(bot: Client, message: Message, prefix: string, parsed: string, args: string): Promise<void> {
        let marco = parsed.substr(prefix.length);
        message.channel.send(takeCapitalization("Polo!", marco));
    }

}

class CommandPrefix implements Command {

    async onMessage(bot: Client, message: Message, _prefix: string, parsed: string, args: string): Promise<void> {
        if (message.author.id != "216949091173662722" && message.author.id != "95206863083143168") { // Astavie and Thauma'
            return;
        }

        let p = Command.getArgument(message, parsed, "prefix", args, 0);
        if (p === undefined) {
            return;
        }

        Command.respond(message, "The command prefix has been set to " + p);

        let id = message.channel.type == "dm" ? message.channel.id : message.guild.id;
        if (p == db.get('defaultPrefix').value()) {
            db.unset('prefixes.' + id).write();
        } else {
            db.set('prefixes.' + id, p).write();
        }
    }

    getUsage(prefix: string): string {
        return prefix + "prefix <prefix>"
    }

    isValidAlias(alias: string): boolean {
        return alias.toLowerCase() == "prefix";
    }

    getCategory(): Command.Category {
        return undefined;
    }

}

let help = new Command.Help();

let commands:Command[] = [
    new CommandPrefix(),
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
    let id = message.channel.type == "dm" ? message.channel.id : message.guild.id;
    let prefix:string = db.has('prefixes.' + id).value() ? db.get('prefixes.' + id).value() : db.get('defaultPrefix').value();

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
    } else if (message.mentions.has(client.user)) {
        Command.respond(message, "`" + prefix + "help`");
    }
});

client.login(process.env.TOKEN);
