import { Card, Suit } from "./card.model";
import { Injectable } from "@angular/core";

var allSuits: Suit[] = [Suit.Diamonds, Suit.Spades, Suit.Hearts, Suit.Clubs]

@Injectable()
export class CardDeck {
    constructor( public cards: Card[] =  [] ) {
        for (let num = 2; num < 15; num++) {
            for (var suit of allSuits) {
                this.cards.push(new Card(suit, num));
            } 
        }
    }

    popRandomCards(amount: number = 1) {
        let cards: Card[] = [];
        for (let i = 0; i < amount; i++) {
            let randomIndex = Math.floor(Math.random() * this.cards.length);
            cards.push(this.cards[randomIndex]);
            this.cards.splice(randomIndex, 1);
        }
        return cards;   
    }
}