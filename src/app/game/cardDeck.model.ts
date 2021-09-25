import { Card, Suit } from './card.model';
import { Injectable } from '@angular/core';

const allSuits: Suit[] = [Suit.Diamonds, Suit.Spades, Suit.Hearts, Suit.Clubs];


@Injectable({
    providedIn: 'root',
})
export class CardDeck {

    public cards: Card[] =  [];
    constructor() {
        for (let num = 2; num < 15; num++) {
            for (const suit of allSuits) {
                this.cards.push(new Card(suit, num));
            }
        }
    }

    get length(): number {
        return this.cards.length;
    }

    popRandomCards(amount: number = 1): Card[] {
        const cards: Card[] = [];
        for (let i = 0; i < amount; i++) {
            const randomIndex = Math.floor(Math.random() * this.cards.length);
            cards.push(this.cards[randomIndex]);
            this.cards.splice(randomIndex, 1);
        }
        return cards;
    }
}


export class CardDeckMock {
    public cards: Card[] = [];

    constructor(public cardsVar: Card[]) {
        for ( const card of cardsVar) {
            this.cards.push(card);
        }
    }

    get length(): number {
        return this.cards.length;
    }

    popRandomCards(amount: number = 1): Card[] {  // Pops the cards in the reversed order; not randomly!
        const cards: Card[] = [];
        for (let i = 0; i < amount; i++) {
            //  @ts-ignore
            cards.push(this.cards.pop());
        }
        return cards;
    }
}
