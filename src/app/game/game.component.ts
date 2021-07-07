import { Card } from "./card.model";
import { Player } from "./player.model"
import { PlayerType } from "./player.model"
import { CardDeck } from "./cardDeck.model";
//import { Injectable } from "@angular/core";
import { Component, OnInit, Input, NgModule } from "@angular/core";
import { ɵInternalFormsSharedModule } from "@angular/forms";


@Component({
    selector: "game",
    templateUrl: "./game.component.html",
    styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit{
    //constructor( public deck: CardDeck, public players: Player[], 
    //    public pot: number = 0, public round: number = 1) {}
    @Input() pot: number = 0;
    @Input() round: number = 1;
    public players: Player[] = [];

    constructor( public deck: CardDeck) {}
    


    ngOnInit() {
        this.restart();
    }

    restart() {
        this.deck = new CardDeck();
        this.players.push(new Player([], 10000, PlayerType.Dealer, "Dealer"));
        this.players.push(new Player([], 1000, PlayerType.User, "User"));
        this.pot = 0;
        this.round = 1;
    }

    get howManyPlayers() {
        return this.players.length;
    }

    get cardsLeft() {
        return this.deck.length;
    }

    get winners() {
        let sortedPlayers = this.players.filter(player => player.bestHand < 22);
        if (sortedPlayers.length == 0) {
            return this.players;  // Everyone will get their money back so everyone will get winnings
        }
        sortedPlayers = sortedPlayers.sort((a: Player, b: Player) => a.bestHand - b.bestHand);
        return sortedPlayers.filter(player => player.bestHand == sortedPlayers[0].bestHand); 
    }

    distributeWinnings(winners: Player[]) {
        let winnings: number = this.pot / winners.length;
        for (let player of winners) {
            player.addMoney(winnings);
        }
    }

    endRound() {
        let winners: Player[] = this.winners;
        this.distributeWinnings(winners);
        this.pot = 0;
    }

    deal() {
        let amount: number = (this.round == 1) ? 2 : 1;
        let cardsLeft: number = this.deck.length;
        console.log("Hewre we are");
        for (let player of this.players) {
            if (player.wantMoreCards()) {
                console.log("Player"+"$player");
                let cards: Card[] = this.deck.popRandomCards(amount);
                player.deal(cards);
            }
        }
        if (this.deck.length == cardsLeft) {
            return false
        }
        else {
            this.round++;
            return true;
        }
        
    }

}