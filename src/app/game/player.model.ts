import { Card } from "./card.model";
import { Hand } from "./hand.model";


export enum PlayerType {
    Dealer = "DEALER",
    User = "USER",
    NPC = "NPC",
}

export class Player {
    public bet: number = 0;
    public hand: Hand;
    
    
    constructor(
        public cardsVar: Card[],
        public money: number,
        public type: PlayerType,
        public name: string,
        
        ) {
        this.hand = new Hand(cardsVar)
        this.money = money;
        this.type = type;
        this.name = name;
    }

    setBet(amount: number) {
        if (this.money - amount < 0) {
            alert("Player has insufficient funds for the bet!");
        }
        else {
            this.money -= amount;
            this.bet += amount; // For doubling!
        }
    }

    get emptyHand(): boolean {
        return this.hand.emptyHand;
    }

    get bestHand(): number {
        return this.hand.bestHand;
    }

    get handValues(): number[] {
        return this.hand.handValues;
    }

    transferMoney(amount: number) {
        this.money += amount;
    }

    clearHand() {
        this.bet = 0;
        this.hand.clearHand();
    }

    deal(cards: Card[]) {
        this.hand.deal(cards);
    }

    split(): Hand {// @ts-ignore
        let poppedCard: card = this.hand.cards.pop();
        this.hand.split = true;
        return new Hand([poppedCard], false, true);
    }
}
