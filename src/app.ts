// Setup environment variables
import { config } from "dotenv";
config();

// Import Discord classes
import { Client, Message, NewsChannel } from "discord.js";

import { Parser } from "./parser";

// App
const client = new Client();

client.once("ready", () => {
    console.log("Bot is ready!");
});

let marco = Parser.literal("marco", false).thenParse(() => Parser.literal("!").optional()).end();
let number = Parser.number().end();

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

client.on("message", async(message: Message) => {
    if (message.channel.type == "dm" && message.author.id !== client.user.id) {
        let result1 = marco.parse(message.content);
        if (result1.hasValue) {
            message.channel.send(takeCapitalization("Polo!", message.content));
        } else {
            let result2 = number.parse(message.content);
            if (result2.hasValue) {
                message.channel.send("You gave me the number: " + result2.value);
            } else {
                message.channel.send(result2.getError());
            }
        }
    }
});

client.login(process.env.TOKEN);
