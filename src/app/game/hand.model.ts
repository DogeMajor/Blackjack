import { Card } from './card.model';


export class Hand {

    constructor(
        public cards: Card[] = [],
        public finished: boolean = false,
        public split: boolean = false,
        ) {}

        deal(dealtCards: Card[]): void {
            for (const card of dealtCards) {
                this.cards.push(card);
            }
        }

        clearHand(): void {
            this.cards = [];
            this.finished = false;
            this.split = false;
        }

        cutEnd(lastIndex: number): void {
            if (lastIndex <= this.cards.length){
                this.cards = this.cards.slice(0, lastIndex);
            }
        }

        get howManyCards(): number {
            return this.cards.length;
        }

        get emptyHand(): boolean {
            return this.cards.length === 0;
        }

        get canSplit(): boolean {
            return this.cards.length === 2 && this.cards[0].num === this.cards[1].num;
        }

        get bestHand(): number {
            const handVals: number[] = this.handValues.filter( c => c < 22 );
            if ( handVals.length === 0 ) {
                return this.handValues[0];
            }
            else {
                return handVals[handVals.length - 1];
            }
        }

        get handValues(): number[] {
            if (this.emptyHand) {
                return [];
            }
            const uniqueCards: Card[] = this.cards.filter(c => c.num !== 14);
            const uniqueValues: number[] = uniqueCards.map(c => c.value);
            const uniqueValue: number = uniqueValues.reduce((first, second) => first + second);
            const aces: number = this.cards.length - uniqueCards.length;
            if ( aces === 0 ) {
                return [uniqueValue];
            }
            else {
                return [uniqueValue + aces, uniqueValue + aces + 10];
            }
        }
}
