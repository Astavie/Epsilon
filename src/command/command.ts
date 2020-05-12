
import { Client, Message, MessageOptions, MessageAdditions, MessageEmbed } from "discord.js";

export interface Command {

    onMessage(bot:Client, message:Message, prefix:string, parsed: string, args:string):Promise<void>;
    getUsage(prefix:string):string;
    isValidAlias(alias:string):boolean;
    getCategory():Command.Category|undefined;

}

export namespace Command {

    export interface Category {
    
        description: string;
    
    }

    export class Branch implements Command {

        commands: Map<string, Command>;
        category: Category;

        constructor(commands: Map<string, Command>, category: Category) {
            this.commands = commands;
            this.category = category;
        }

        isValidAlias(alias:string): boolean {
            return Array.from(this.commands.keys()).includes(alias.toLowerCase());
        }

        getUsage(prefix: string): string {
            return prefix + Array.from(this.commands.keys()).join("|");
        }

        getCategory(): Category|undefined {
            throw this.category;
        }

        async onMessage(bot: Client, message: Message, prefix:string, parsed: string, args: string): Promise<void> {
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

    export class Help implements Command {

        catogories:Category[] = [];
        commands = new Map<Category, Command[]>();

        setCommands(commands:Command[]) { 
            for (let command of commands)
                this.addCommand(command);
        }

        addCommand(command:Command) {
            let category = command.getCategory();
            if (category === undefined)
                return;
            
            if (!this.commands.has(category)) {
                this.catogories.push(category);
                this.commands.set(category, [ command ]);
            } else {
                this.commands.get(category).push(command);
            }
        }

        async onMessage(bot: Client, message: Message, prefix: string, parsed: string, args: string): Promise<void> {
            let embed = new MessageEmbed()
                .setColor("#2b2bff")
                .setTitle("Epsilon")
                .setURL("https://github.com/Astavie/Epsilon")
                .setDescription("A random utlity bot.");
            
            for (let category of this.catogories) {
                let description = "";

                for (let command of this.commands.get(category)) {
                    if (description != "") {
                        description += "\n"
                    }
                    description += "`" + command.getUsage(prefix) + "`";
                }

                embed.addField(category.description, description);
            }

            respond(message, "", embed);
        }

        getUsage(prefix: string): string {
            return prefix + "help";
        }
        
        isValidAlias(alias: string): boolean {
            return alias.toLowerCase() == "help";
        }

        getCategory(): Category {
            return { description: "Help" };
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
