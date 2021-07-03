import { Card } from "./card.model";
import { Injectable } from "@angular/core";


@Injectable()
export class Player {
    constructor( public cards: Card[], public money: number) {}

    bet(amount: number) {
        if (this.money - amount < 0) {
            alert("Player does not have sufficient funds for the bet!");
        }
        else {
            this.money -= amount;
        }
    }

    get hand() {
        return this.cards;
    }

    get handValue() {
        let allCards: number[] = this.cards.map(function(c) { return c.num })
        return allCards.reduce(function(first, second){ return first + second })
    }

    addMoney(amount: number) {
        this.money += amount;
    }

    clearHand() {
        this.cards = [];
    }

    deal(cards: Card[]) {
        for (let card of cards) {
            this.cards.push(card);
        } 
    }

    wantMoreCards(answer: any = null) {
        if (answer == null) {
            return (this.handValue < 15)? true: false;
        }
        else {
            return answer;
        }
    }

}