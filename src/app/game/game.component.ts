import { Card } from "./card.model";
import { Player } from "./player.model"
import { PlayerType } from "./player.model"
import { CardDeck } from "./cardDeck.model";
import { Component, OnInit, Input } from "@angular/core";


@Component({
    selector: "game",
    templateUrl: "./game.component.html",
    styleUrls: ["./game.component.css"]
})

export class GameComponent implements OnInit{

    @Input() pot: number = 0;
    @Input() round: number = 1;
    public gameOver: boolean = false;
    public user: Player;
    public dealer: Player;

    constructor( public deck: CardDeck) {
        this.dealer = new Player([], 10000, PlayerType.Dealer, "Dealer");
        this.user = new Player([], 1000, PlayerType.User, "User");        
    }
    
    ngOnInit() {
        this.restart();
    }

    restart() {
        this.deck = new CardDeck();
        this.clear();
    }

    clear() {
        this.dealer.clearHand();
        this.user.clearHand();
        let amount: number = this.pot / this.howManyPlayers;
        this.user.transferMoney(amount);
        this.dealer.transferMoney(amount);
        this.pot = 0;
        this.round = 1;
        this.gameOver = false;
    }

    bet(amount: number) {
        if (this.user.emptyHand && amount > 0) {
            this.clear();
            //this.user.transferMoney(-amount);
            //this.dealer.transferMoney(-amount);
            this.user.setBet(amount);
            this.dealer.setBet(amount);
            this.pot += amount * 2;
            this.dealTo(this.user, 2);
            this.dealTo(this.dealer, 2);
            if (this.user.bestHand == 21 || this.dealer.bestHand == 21) {
                this.gameOver = true;
                this.endGame();
                this.round++;
            }
            else {
                this.round++;
            }
        }
        else {
            alert("This action is not allowed!");
        }
    }

    get howManyPlayers() {
        return 2;
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

    get winnerNames() {
        return this.winners.map(w=>w.name);
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
        console.log("Pot is currently: "+this.pot.toString())
    }

    playerActionsAreAllowed(): boolean {
        if (this.user.emptyHand || this.gameOver || this.pot <= 0) {
            return false;
        }
        else if(this.user.bestHand >= 21) {
            return false;
        }
        else {
            return true;
        }
    }

    hit() {
        if ( this.playerActionsAreAllowed() ){
            console.log('Hitting with amount...');
            let amount: number = (this.round == 1) ? 2 : 1;
            console.log(amount)
            this.dealTo(this.user, amount);
            if (this.user.bestHand >= 21) {
                this.gameOver = true;
                this.endGame();
            }
            this.round++;
        }
        else {
            alert("This action is not allowed!");
        }
    }

    get canDouble() {
        return this.playerActionsAreAllowed() && this.user.cards.length == 2 && (this.user.money - this.user.bet) >= 0
    }

    double() {
        if ( this.canDouble ){
            console.log('Doubling...');
            this.user.setBet(this.user.bet);
            this.dealer.setBet(this.user.bet);
            this.dealTo(this.user, 1);
            this.round++;
            if (this.user.bestHand >= 21) {
                this.gameOver = true;
                this.endGame();
            }
            else {
                this.stand();
            }
            
        }
        else {
            alert("This action is not allowed!");
        }
    }

    stand() {
        if ( this.playerActionsAreAllowed() ){
            let playOn: boolean = true && this.hasBlackjack.length == 0;
            while (playOn && this.dealer.bestHand <= 16) {
                let amount: number = (this.round == 1) ? 2 : 1;
                this.dealTo(this.dealer, amount);
                this.round++;
            }
            this.gameOver = true;
            this.endGame();
        }
        else {
            alert("This action is not allowed!");
        }
    }

    get canSplit() {
        return this.canDouble && this.user.cards[0].num == this.user.cards[1].num;
    }

    split() {
        if ( this.canSplit ){
            console.log('Splitting...');
            this.user.setBet(this.user.bet);
            this.dealTo(this.user, 1);
            this.round++;
            if (this.user.bestHand >= 21) {
                this.gameOver = true;
                this.endGame();
            }
            else {
                this.stand();
            }
            
        }
        else {
            alert("This action is not allowed!");
        }
    }

    dealTo(player: Player, amount: number, faceDown: boolean = false) {
        if (this.deck.length - amount >= 0) {
            let cards: Card[] = this.deck.popRandomCards(amount);
            player.deal(cards);
        }
    }

    disableButton(name: string) {
        alert(name + "-button is disabled!");
    }

}
