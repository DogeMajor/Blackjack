import { Injectable } from "@angular/core";

export enum Suit {
    Diamonds = '\u2666',
    Spades = '\u2660',
    Hearts = '\u2665',
    Clubs = '\u2663',
}

export enum FaceCardValue {
    A = 14,
    K = 13,
    Q = 12,
    J = 11,
}

export class Card {

    public suit: Suit;
    public num: number;
    public value: number = -1;
    public symbol: string | null = null;

    constructor(
        public suitVar: Suit,
        public numVar: number = -1,
        ) {
            this.suit = suitVar;
            this.num = numVar;
            if (2 <= numVar && numVar <= 10) {
                this.value = this.num;
                this.symbol = this.num.toString();

            }
            else if (numVar >= 10 && numVar <= 13) {
                this.value = 10;
                this.symbol = FaceCardValue[this.num].toString();
            }
            else if (numVar == 14) {
                this.value = 11;
                this.symbol = FaceCardValue[this.num].toString();
            } 
        }
    
        get cardValue(): number {
            return this.value;
        }

        get colorClass(): string {
            if ( this.suit == Suit.Hearts || this.suit == Suit.Diamonds ) {
                return "Card-red";
            }
            else if ( this.suit == Suit.Spades || this.suit == Suit.Clubs ) {
                return "Card-black";
            }
            else {
                return "";
            }
        }
}
