import { Injectable, Input } from "@angular/core";

export enum Suit {
    Diamonds = "DIAMONDS",
    Spades = "SPADES",
    Hearts = "HEARTS",
    Clubs = "CLUBS",
}

export enum FaceCardValue {
    A = 14,
    K = 13,
    Q = 12,
    J = 11,
}

//@Injectable({
//    providedIn: 'root',
//})
export class Card {

    //@Input() public suit: Suit;
    //@Input() public num: number;
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
                this.value = -1;
                this.symbol = FaceCardValue[this.num].toString();
            }
            
            
        }
    
        get cardValue(): number {
            return this.value;
        }

}