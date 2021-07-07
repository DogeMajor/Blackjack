import { Card } from "./card.model";
import { Injectable } from "@angular/core";


export enum PlayerType {
    Dealer = "DEALER",
    User = "USER",
    NPC = "NPC",
}


//@Injectable({
 //   providedIn: 'root',
//})
export class Player {
    constructor( public cards: Card[], public money: number, public type: PlayerType, public name: string) {
        for (let card of cards) {
            this.cards.push(card);
        }
        this.money = money;
        this.type = type;
        this.name = name;
    }

    bet(amount: number) {
        if (this.money - amount < 0) {
            alert("Player does not have sufficient funds for the bet!");
        }
        else {
            this.money -= amount;
        }
    }

    get hand(): Card[] {
        return this.cards;
    }

    get emptyHand(): boolean {
        return this.cards.length == 0;
    }

    get bestHand(): number {
        let handVals: number[] = this.handValues.filter(c=>c<22);
        if ( handVals.length == 0 ) {
            return this.handValues[0];
        }
        else {
            return handVals[handVals.length-1];
        }
    }

    get handValues(): number[] {
        let uniqueCards: Card[] = this.cards.filter(c => c.num != 14);
        let uniqueValues: number[] = uniqueCards.map(c => c.value);
        let uniqueValue = uniqueValues.reduce(function(first, second){ return first + second })
        let aces: number = this.cards.length - uniqueCards.length;
        if ( aces == 0 ) {
            return [uniqueValue];
        }
        else {
            return [uniqueValue+aces, uniqueValue+aces+10]
        } 
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

    wantMoreCards(answer: true | false | null = null): boolean {
        if (answer == null) {
            return (this.bestHand < 15)? true: false;
        }
        else {
            return answer;
        }
    }

}