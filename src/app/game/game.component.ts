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
    public otherPlayers: Player[] = [];
    public user: Player;
    public dealer: Player;

    constructor( public deck: CardDeck) {
        this.dealer = new Player([], 10000, PlayerType.Dealer, "Dealer");
        this.user = new Player([], 1000, PlayerType.User, "User");
        //this.dealer.moreCards = this.dealer.wantMoreCards();
        

    }
    
    ngOnInit() {
        this.restart();
    }

    restart() {
        this.deck = new CardDeck();
        //this.dealer = null;
        //this.dealer = new Player([], 10000, PlayerType.Dealer, "Dealer");
        //this.user = new Player([], 1000, PlayerType.User, "User");
        //this.players.push(new Player([], 10000, PlayerType.Dealer, "Dealer"));
        // this.players.push(new Player([], 1000, PlayerType.User, "User"));
        this.clear();
    }

    clear() {
        this.dealer.clearHand();
        this.user.clearHand();
        let amount: number = this.pot / this.howManyPlayers;
        
        this.user.transferMoney(amount);
        this.dealer.transferMoney(amount);
        for (let player of this.otherPlayers){
            player.clearHand();
            player.transferMoney(amount);
        }
        this.pot = 0;
        this.round = 1;
    }

    bet(amount: number) {
        this.clear();
        this.user.transferMoney(-amount);
        this.dealer.transferMoney(-amount);
        this.pot += amount * 2;
        this.dealTo(this.user, 2);
        this.dealTo(this.dealer, 2);
        this.round++;
    }

    get howManyPlayers() {
        return 2 + this.otherPlayers.length;
    }

    get cardsLeft() {
        return this.deck.length;
    }

    get winners() {
        let players: Player[] = [this.dealer, this.user];
        let sortedPlayers = players.filter(player => player.bestHand < 22);
        if (sortedPlayers.length == 0) {
            return players;  // Everyone will get their money back if their best hands were over 21 so everyone will get winnings
        }
        sortedPlayers = sortedPlayers.sort((a: Player, b: Player) => b.bestHand - a.bestHand);
        return sortedPlayers.filter(player => player.bestHand == sortedPlayers[0].bestHand); 
    }

    get hasBlackjack() {
        let players: Player[] = [this.dealer, this.user];
        return players.filter(p => p.bestHand == 21);
    }

    distributeWinnings(winners: Player[]) {
        let winnings: number = this.pot / winners.length;
        for (let player of winners) {
            player.transferMoney(winnings);
        }
    }

    endGame() {
        let winners: Player[] = this.winners;
        console.log("The game ended. The winners are:")
        for (let winner of winners) {
            console.log(winner);
        }
        this.distributeWinnings(winners);
        this.pot = 0;
    }

    deal(): boolean {
        let amount: number = (this.round == 1) ? 2 : 1;
        let cardsLeft: number = this.deck.length;
        this.dealTo(this.user, amount);
        this.round++;
        return this.deck.length == cardsLeft;
    }

    stand() {
        let playOn: boolean = true && this.hasBlackjack.length == 0;
        while (playOn && this.dealer.bestHand <= 16) {
            let amount: number = (this.round == 1) ? 2 : 1;
            this.dealTo(this.dealer, amount);
            this.round++;
        }
        this.endGame();
    }

    dealTo(player: Player, amount: number) {
        if (this.deck.length - amount >= 0) {
            let cards: Card[] = this.deck.popRandomCards(amount);
            player.deal(cards);
        }
    }
}