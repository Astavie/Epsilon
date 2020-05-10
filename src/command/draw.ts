
import { Client, Message } from "discord.js";
import { Command } from "./command";
import { Deck, DeckInstance } from "../deck";

let decks:Deck[] = [ Deck.Tarot ];

export class CommandDraw implements Command {

    onMessage(bot: Client, message: Message, parsed: string, args: string): void {
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

        let instance = new DeckInstance(decks[index]);
        let card = instance.draw();

        Command.respond(message, "You drew " + card.name + ".", { files: [ card.image ]});
    }

}
