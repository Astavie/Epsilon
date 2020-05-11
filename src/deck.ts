
export interface Card {

    name: string;
    image: string;

}

export interface Deck {

    name: string;
    canBeReversed: boolean;
    cards: Card[];

}

export namespace Deck {

    export const Tarot:Deck = {
        name: "Tarot",
        canBeReversed: true,
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

            // Wands
            { name: "Ace of Wands",         image: "https://upload.wikimedia.org/wikipedia/en/1/11/Wands01.jpg"                         },
            { name: "Two of Wands",         image: "https://upload.wikimedia.org/wikipedia/en/0/0f/Wands02.jpg"                         },
            { name: "Three of Wands",       image: "https://upload.wikimedia.org/wikipedia/en/f/ff/Wands03.jpg"                         },
            { name: "Four of Wands",        image: "https://upload.wikimedia.org/wikipedia/en/a/a4/Wands04.jpg"                         },
            { name: "Five of Wands",        image: "https://upload.wikimedia.org/wikipedia/en/9/9d/Wands05.jpg"                         },
            { name: "Six of Wands",         image: "https://upload.wikimedia.org/wikipedia/en/3/3b/Wands06.jpg"                         },
            { name: "Seven of Wands",       image: "https://upload.wikimedia.org/wikipedia/en/e/e4/Wands07.jpg"                         },
            { name: "Eight of Wands",       image: "https://upload.wikimedia.org/wikipedia/en/6/6b/Wands08.jpg"                         },
            { name: "Nine of Wands",        image: "https://upload.wikimedia.org/wikipedia/en/e/e7/Wands09.jpg"                         },
            { name: "Ten of Wands",         image: "https://upload.wikimedia.org/wikipedia/en/0/0b/Wands10.jpg"                         },
            { name: "Page of Wands",        image: "https://upload.wikimedia.org/wikipedia/en/6/6a/Wands11.jpg"                         },
            { name: "Knight of Wands",      image: "https://upload.wikimedia.org/wikipedia/en/1/16/Wands12.jpg"                         },
            { name: "Queen of Wands",       image: "https://upload.wikimedia.org/wikipedia/en/0/0d/Wands13.jpg"                         },
            { name: "King of Wands",        image: "https://upload.wikimedia.org/wikipedia/en/c/ce/Wands14.jpg"                         },

            // Pentacles
            { name: "Ace of Pentacles",     image: "https://upload.wikimedia.org/wikipedia/en/f/fd/Pents01.jpg"                         },
            { name: "Two of Pentacles",     image: "https://upload.wikimedia.org/wikipedia/en/9/9f/Pents02.jpg"                         },
            { name: "Three of Pentacles",   image: "https://upload.wikimedia.org/wikipedia/en/4/42/Pents03.jpg"                         },
            { name: "Four of Pentacles",    image: "https://upload.wikimedia.org/wikipedia/en/3/35/Pents04.jpg"                         },
            { name: "Five of Pentacles",    image: "https://upload.wikimedia.org/wikipedia/en/9/96/Pents05.jpg"                         },
            { name: "Six of Pentacles",     image: "https://upload.wikimedia.org/wikipedia/en/a/a6/Pents06.jpg"                         },
            { name: "Seven of Pentacles",   image: "https://upload.wikimedia.org/wikipedia/en/6/6a/Pents07.jpg"                         },
            { name: "Eight of Pentacles",   image: "https://upload.wikimedia.org/wikipedia/en/4/49/Pents08.jpg"                         },
            { name: "Nine of Pentacles",    image: "https://upload.wikimedia.org/wikipedia/en/f/f0/Pents09.jpg"                         },
            { name: "Ten of Pentacles",     image: "https://upload.wikimedia.org/wikipedia/en/4/42/Pents10.jpg"                         },
            { name: "Page of Pentacles",    image: "https://upload.wikimedia.org/wikipedia/en/e/ec/Pents11.jpg"                         },
            { name: "Knight of Pentacles",  image: "https://upload.wikimedia.org/wikipedia/en/d/d5/Pents12.jpg"                         },
            { name: "Queen of Pentacles",   image: "https://upload.wikimedia.org/wikipedia/en/8/88/Pents13.jpg"                         },
            { name: "King of Pentacles",    image: "https://upload.wikimedia.org/wikipedia/en/1/1c/Pents14.jpg"                         },

            // Cups
            { name: "Ace of Cups",          image: "https://upload.wikimedia.org/wikipedia/en/3/36/Cups01.jpg"                          },
            { name: "Two of Cups",          image: "https://upload.wikimedia.org/wikipedia/en/f/f8/Cups02.jpg"                          },
            { name: "Three of Cups",        image: "https://upload.wikimedia.org/wikipedia/en/7/7a/Cups03.jpg"                          },
            { name: "Four of Cups",         image: "https://upload.wikimedia.org/wikipedia/en/3/35/Cups04.jpg"                          },
            { name: "Five of Cups",         image: "https://upload.wikimedia.org/wikipedia/en/d/d7/Cups05.jpg"                          },
            { name: "Six of Cups",          image: "https://upload.wikimedia.org/wikipedia/en/1/17/Cups06.jpg"                          },
            { name: "Seven of Cups",        image: "https://upload.wikimedia.org/wikipedia/en/a/ae/Cups07.jpg"                          },
            { name: "Eight of Cups",        image: "https://upload.wikimedia.org/wikipedia/en/6/60/Cups08.jpg"                          },
            { name: "Nine of Cups",         image: "https://upload.wikimedia.org/wikipedia/en/2/24/Cups09.jpg"                          },
            { name: "Ten of Cups",          image: "https://upload.wikimedia.org/wikipedia/en/8/84/Cups10.jpg"                          },
            { name: "Page of Cups",         image: "https://upload.wikimedia.org/wikipedia/en/a/ad/Cups11.jpg"                          },
            { name: "Knight of Cups",       image: "https://upload.wikimedia.org/wikipedia/en/f/fa/Cups12.jpg"                          },
            { name: "Queen of Cups",        image: "https://upload.wikimedia.org/wikipedia/en/6/62/Cups13.jpg"                          },
            { name: "King of Cups",         image: "https://upload.wikimedia.org/wikipedia/en/0/04/Cups14.jpg"                          },

            // Swords
            { name: "Ace of Swords",        image: "https://upload.wikimedia.org/wikipedia/en/1/1a/Swords01.jpg"                        },
            { name: "Two of Swords",        image: "https://upload.wikimedia.org/wikipedia/en/9/9e/Swords02.jpg"                        },
            { name: "Three of Swords",      image: "https://upload.wikimedia.org/wikipedia/en/0/02/Swords03.jpg"                        },
            { name: "Four of Swords",       image: "https://upload.wikimedia.org/wikipedia/en/b/bf/Swords04.jpg"                        },
            { name: "Five of Swords",       image: "https://upload.wikimedia.org/wikipedia/en/2/23/Swords05.jpg"                        },
            { name: "Six of Swords",        image: "https://upload.wikimedia.org/wikipedia/en/2/29/Swords06.jpg"                        },
            { name: "Seven of Swords",      image: "https://upload.wikimedia.org/wikipedia/en/3/34/Swords07.jpg"                        },
            { name: "Eight of Swords",      image: "https://upload.wikimedia.org/wikipedia/en/a/a7/Swords08.jpg"                        },
            { name: "Nine of Swords",       image: "https://upload.wikimedia.org/wikipedia/en/2/2f/Swords09.jpg"                        },
            { name: "Ten of Swords",        image: "https://upload.wikimedia.org/wikipedia/en/d/d4/Swords10.jpg"                        },
            { name: "Page of Swords",       image: "https://upload.wikimedia.org/wikipedia/en/4/4c/Swords11.jpg"                        },
            { name: "Knight of Swords",     image: "https://upload.wikimedia.org/wikipedia/en/b/b0/Swords12.jpg"                        },
            { name: "Queen of Swords",      image: "https://upload.wikimedia.org/wikipedia/en/d/d4/Swords13.jpg"                        },
            { name: "King of Swords",       image: "https://upload.wikimedia.org/wikipedia/en/3/33/Swords14.jpg"                        },
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
