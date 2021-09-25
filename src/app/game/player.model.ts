import { Card } from './card.model';
import { Hand } from './hand.model';


export enum PlayerType {
    Dealer = 'DEALER',
    User = 'USER',
    NPC = 'NPC',
}

export class Player {
    public bet = 0;
    public hand: Hand;
    public type: PlayerType;
    public name: string;
    public money: number;
    
    constructor(
        cardsVar: Card[],
        money: number,
        type: PlayerType,
        name: string,
        ) {
        this.hand = new Hand(cardsVar);
        this.money = money;
        this.type = type;
        this.name = name;
    }

    setBet(amount: number): void {
        if (this.money - amount < 0) {
            alert('Player has insufficient funds for the bet!');
        }
        else {
            this.money -= amount;
            this.bet += amount; // This is neded for doubling!
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

    transferMoney(amount: number): void {
        this.money += amount;
    }

    clearHand(): void {
        this.bet = 0;
        this.hand.clearHand();
    }

    deal(cards: Card[]): void {
        this.hand.deal(cards);
    }

    split(): Hand {// @ts-ignore
        const poppedCard: card = this.hand.cards.pop();
        this.hand.split = true;
        return new Hand([poppedCard], false, true);
    }
}
