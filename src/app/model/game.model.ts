import { Card } from "./card.model";
import { Player } from "./player.model"
import { CardDeck } from "./cardDeck.model";
import { Injectable } from "@angular/core";


@Injectable()
export class Game {
    constructor( public deck: CardDeck, public players: Player[], 
        public pot: number = 0, public round: number = 1) {}

    get winners() {
        let sortedPlayers = this.players.filter(player => player.handValue < 22);
        sortedPlayers = sortedPlayers.sort((a: Player, b: Player) => a.handValue - b.handValue);
        return sortedPlayers.filter(player => player.handValue == sortedPlayers[0].handValue); 
    }

    distributeWinnings(winner: Player) {
        winner.addMoney(this.pot);
        this.pot = 0;
    }

    deal() {
        let amount: number = (this.round == 1) ? 2 : 1;
        for (let player of this.players) {
            if (player.wantMoreCards()) {
                let cards: Card[] = this.deck.popRandomCards(amount);
                player.deal(cards);
            }
        }
    }

}