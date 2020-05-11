
import { Client, Message, MessageOptions, MessageAdditions } from "discord.js";

export interface Command {

    onMessage(bot:Client, message:Message, prefix:string, parsed: string, args:string):void;

}

export namespace Command {

    export class Branch implements Command {

        commands: Map<string, Command>

        constructor(commands: Map<string, Command>) {
            this.commands = commands;
        }

        onMessage(bot: Client, message: Message, prefix:string, parsed: string, args: string): void {
            if (args == "") {
                this._error(message, parsed, "Error: not enough arguments.");
                return;
            }

            let commandName:string, commandArgs:string;

            let index = args.indexOf(' ');
            if (index == -1) {
                commandName = args;
                commandArgs = "";
            } else {
                commandName = args.substr(0, index);
                commandArgs = args.substr(index + 1).trim();
            }

            let command = this.commands.get(commandName);
            if (command === undefined) {
                this._error(message, parsed, "Error: incorrect argument.");
            } else {
                command.onMessage(bot, message, prefix, parsed + " " + commandName, commandArgs);
            }
        }

        _error(message: Message, parsed: string, error: string) {
            let keys = Array.from(this.commands.keys());
            respond(message, error + "\n`" + parsed + " " + keys.join("|") + "`");
        }

    }

    export function respond(message: Message, content: string, options?: MessageOptions | MessageAdditions | (MessageOptions & { split?: false }) | MessageAdditions) {
        if (message.channel.type == "text") {
            content = "<@" + message.author.id + ">\n" + content;
        }
        message.channel.send(content, options);
    }

    export function getParsed(parsed:string, args:string, index:number, suffix:string):string {
        let array = args.split(' ').filter(value => value.trim().length > 0);

        let total = parsed;
        for (let i = 0; i < array.length && i < index; i++) {
            total += " " + array[i];
        }

        return "`" + total + " " + suffix + "`";
    }

    export function getArgument(message: Message, parsed: string, name: string, args: string, index: number, optional:boolean = false, suffix:string = undefined):string|undefined {
        let array = args.split(' ').filter(value => value.trim().length > 0);

        if (index >= array.length) {
            if (!optional) {
                respond(message, "Error: '" + name + "' is a required argument.\n" + getParsed(parsed, args, index, suffix || "<" + name + ">"));
            }
            return undefined;
        }

        return array[index];
    }

}
