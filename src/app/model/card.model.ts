//import { Injectable } from "@angular/core";

//@Injectable()
export enum Suit {
    Diamonds = "DIAMONDS",
    Spades = "SPADES",
    Hearts = "HEARTS",
    Clubs = "CLUBS",
}


export class Card {

    constructor(
        public suit: Suit,
        public num: number
        ) {}

}