
export interface Card {

    name: string;
    image: string;

}

export interface Deck {

    name: string;
    cards: Card[];

}

export namespace Deck {

    export const Tarot:Deck = {
        name: "Tarot",
        cards: [
            // Major arcana
            { name: "The Fool",             image: "https://upload.wikimedia.org/wikipedia/en/9/90/RWS_Tarot_00_Fool.jpg"               },
            { name: "The Magician",         image: "https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg"           },
            { name: "The High Priestess",   image: "https://upload.wikimedia.org/wikipedia/en/8/88/RWS_Tarot_02_High_Priestess.jpg"     },
            { name: "The Empress",          image: "https://upload.wikimedia.org/wikipedia/en/d/d2/RWS_Tarot_03_Empress.jpg"            },
            { name: "The Emperor",          image: "https://upload.wikimedia.org/wikipedia/en/c/c3/RWS_Tarot_04_Emperor.jpg"            },
            { name: "The Hierophant",       image: "https://upload.wikimedia.org/wikipedia/en/8/8d/RWS_Tarot_05_Hierophant.jpg"         },
            { name: "The Lovers",           image: "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg"             },
            { name: "The Chariot",          image: "https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg"            },
            { name: "Strength",             image: "https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg"           },
            { name: "The Hermit",           image: "https://upload.wikimedia.org/wikipedia/en/4/4d/RWS_Tarot_09_Hermit.jpg"             },
            { name: "Wheel of Fortune",     image: "https://upload.wikimedia.org/wikipedia/en/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg"   },
            { name: "Justice",              image: "https://upload.wikimedia.org/wikipedia/en/e/e0/RWS_Tarot_11_Justice.jpg"            },
            { name: "The Hanged Man",       image: "https://upload.wikimedia.org/wikipedia/en/2/2b/RWS_Tarot_12_Hanged_Man.jpg"         },
            { name: "Death",                image: "https://upload.wikimedia.org/wikipedia/en/d/d7/RWS_Tarot_13_Death.jpg"              },
            { name: "Temperance",           image: "https://upload.wikimedia.org/wikipedia/en/f/f8/RWS_Tarot_14_Temperance.jpg"         },
            { name: "The Devil",            image: "https://upload.wikimedia.org/wikipedia/en/5/55/RWS_Tarot_15_Devil.jpg"              },
            { name: "The Tower",            image: "https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg"              },
            { name: "The Star",             image: "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_17_Star.jpg"               },
            { name: "The Moon",             image: "https://upload.wikimedia.org/wikipedia/en/7/7f/RWS_Tarot_18_Moon.jpg"               },
            { name: "The Sun",              image: "https://upload.wikimedia.org/wikipedia/en/1/17/RWS_Tarot_19_Sun.jpg"                },
            { name: "Judgement",            image: "https://upload.wikimedia.org/wikipedia/en/d/dd/RWS_Tarot_20_Judgement.jpg"          },
            { name: "The World",            image: "https://upload.wikimedia.org/wikipedia/en/f/ff/RWS_Tarot_21_World.jpg"              },
        ]
    };

}

export class DeckInstance {

    deck: Deck;
    available: number[]; // list of indices of cards that have not yet been drawn

    constructor(deck:Deck) {
        this.deck = deck;
        this.shuffle();
    }

    /**
     * Draws a card and removes that card from the deck
     */
    draw():Card {
        let index = Math.floor(Math.random() * this.available.length);
        return this.deck.cards[this.available.splice(index, 1)[0]];
    }

    /**
     * Puts every drawn card back into the deck
     */
    shuffle():void {
        this.available = this.deck.cards.map((_value, index) => index);
    }

}
