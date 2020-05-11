
import { Client, Message, MessageAttachment } from "discord.js";
import { Command } from "./command";
import { Deck, DeckInstance } from "../deck";
import Jimp = require("jimp");

let decks:Deck[] = [ Deck.Tarot ];
let instances = new Map<string, Map<string, DeckInstance>>();

function getInstance(id:string, deck:Deck):DeckInstance {
    if (!instances.has(id)) {
        instances.set(id, new Map<string, DeckInstance>());
    }
    let decks = instances.get(id);
    if (!decks.has(deck.name)) {
        decks.set(deck.name, new DeckInstance(deck));
    }
    return decks.get(deck.name);
}

async function reverse(image: string) {
    return await (await Jimp.read(image)).rotate(180).getBufferAsync(Jimp.MIME_PNG);
}

export class CommandDraw implements Command {

    onMessage(bot: Client, message: Message, prefix:string, parsed: string, args: string): void {
        let names = decks.map(deck => deck.name.toLowerCase());
        let suffix = names.join("|") + " (unlimited)";

        let deck = Command.getArgument(message, parsed, "deck", args, 0, false, suffix);
        if (deck === undefined) {
            return;
        }

        let index = names.indexOf(deck.toLowerCase());
        if (index == -1) {
            Command.respond(message, "Error: unknown deck '" + deck + "'.\n`" + parsed + " " + suffix + "`");
            return;
        }

        let flag = Command.getArgument(message, parsed, "flag", args, 1, true);
        if (flag != undefined && flag.toLowerCase() != "unlimited") {
            Command.respond(message, "Error: unknown flag '" + flag + "'.\n`" + parsed + " " + deck + " (unlimited)`");
            return;
        }

        let instance:DeckInstance;
        let left = "";

        if (flag != undefined && flag.toLowerCase() == "unlimited") {
            instance = new DeckInstance(decks[index]);
        } else {
            instance = getInstance(message.author.id, decks[index]);
            if (instance.available.length == 0) {
                Command.respond(message, "Error: no more cards left!\n`" + prefix + "shuffle " + deck + "`");
                return;
            }
            left = " (" + (instance.available.length - 1) + "/" + instance.deck.cards.length + " cards left)";
        }

        let card = instance.draw();

        if (decks[index].canBeReversed && Math.random() < 0.5) {
            if (left != "") {
                left = " (reversed, " + left.substr(2);
            } else {
                left = " (reversed)";
            }
            reverse(card.image).then(buffer => Command.respond(message, "You drew " + card.name + left + ".", new MessageAttachment(buffer)));
        } else {
            Command.respond(message, "You drew " + card.name + left + ".", { files: [ card.image ]});
        }
    }

}

export class CommandShuffle implements Command {

    onMessage(bot: Client, message: Message, prefix:string, parsed: string, args: string): void {
        let names = decks.map(deck => deck.name.toLowerCase());
        let suffix = names.join("|");

        let deck = Command.getArgument(message, parsed, "deck", args, 0, false, suffix);
        if (deck === undefined) {
            return;
        }

        let index = names.indexOf(deck.toLowerCase());
        if (index == -1) {
            Command.respond(message, "Error: unknown deck '" + deck + "'.\n`" + parsed + " " + suffix + "`");
            return;
        }

        getInstance(message.author.id, decks[index]).shuffle();

        Command.respond(message, "All cards of your " + decks[index].name + " deck have been returned and shuffled");
    }

}
