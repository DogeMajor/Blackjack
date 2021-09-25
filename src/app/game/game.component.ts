import { Card } from './card.model';
import { Hand } from './hand.model';
import { Player } from './player.model';
import { PlayerType } from './player.model';
import { CardDeck } from './cardDeck.model';
import { ButtonSounds, ButtonSoundsMock } from './buttonSounds.model';
import { Component, OnInit, Input } from '@angular/core';


@Component({
    selector: 'game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})


export class GameComponent implements OnInit{

    @Input() pot = 0;
    public round = 1;
    public gameOver = false;
    public user: Player;
    public dealer: Player;
    public splitHands: Hand[] = [];
    public splitBet = 0;
    public earlierBet = 0;

    constructor( public deck: CardDeck, public soundFiles: ButtonSoundsMock ) {
        this.dealer = new Player([], 10000, PlayerType.Dealer, 'Dealer');
        this.user = new Player([], 1000, PlayerType.User, 'User');
    }

    ngOnInit(): void {
        this.restart();
    }

    restart(): void {
        this.soundFiles = new ButtonSounds();
        this.soundFiles.play('shuffle');
        this.deck = new CardDeck();
        this.clear();
    }

    get canRestart(): boolean {
        return (this.user.emptyHand || this.gameOver) && !this.canResolveSplit;
    }

    clear(): void {
        this.dealer.clearHand();
        this.user.clearHand();
        if (this.pot !== 0) {
            this.user.transferMoney(this.pot / 2);
            this.dealer.transferMoney(this.pot / 2);
            this.pot = 0;
        }
        this.round = 1;
        this.gameOver = false;
    }

    get canBet(): boolean {
        return this.user.bet === 0 && !this.pot && !this.gameOver;
    }

    bet(amount: number): void {
        console.log('betting ' + amount);
        if (this.user.emptyHand && amount > 0) {
            this.user.setBet(amount);
            this.dealer.setBet(amount);
            this.earlierBet = amount;
            this.pot += amount * 2;
            this.dealTo(this.user, 2);
            this.dealTo(this.dealer, 2);
            this.soundFiles.play('bet');
            this.soundFiles.play('deal_two_cards', 400);
            if (this.user.bestHand === 21 || this.dealer.bestHand === 21) {
                this.gameOver = true;
                this.endGame();
            }
            this.round++;
        }
        else {
            this.raise_alert('Betting failed! Either you put in false amount or your hand was not empty');
        }
    }

    get cardsLeft(): number {
        return this.deck.length;
    }

    get dealerHand(): number {
        if (this.gameOver) {
            return this.dealer.bestHand;
        }
        else if (this.dealer.emptyHand) {
            return 0;
        }
        else {
            return this.dealer.hand.cards[0].value;
        }
    }

    get winners(): Player[] {
        const players: Player[] = [this.dealer, this.user];
        let sortedPlayers = players.filter(player => player.bestHand < 22);
        if (sortedPlayers.length === 0) {
            return players; // Everyone will get their money back if their
            // best hands were over 21 so everyone will get winnings
        }
        sortedPlayers = sortedPlayers.sort((a: Player, b: Player) => b.bestHand - a.bestHand);
        return sortedPlayers.filter(player => player.bestHand === sortedPlayers[0].bestHand);
    }

    get winnerNames(): Array<string> {
        return this.winners.map(w => w.name);
    }

    get hasBlackjack(): Player[] {
        const players: Player[] = [this.dealer, this.user];
        return players.filter(p => p.bestHand === 21);
    }

    distributeWinnings(winners: Player[]): void {
        const winnings: number = this.pot / winners.length;
        for (const player of winners) {
            player.transferMoney(winnings);
        }
        this.soundFiles.play('coins', 1000);
    }

    endGame(): void {
        const winners: Player[] = this.winners;
        this.distributeWinnings(winners);
        this.pot = 0;
    }

    get canResolveSplit(): boolean {
        return this.gameOver && this.splitHands.length > 0;
    }

    resolveSplit(): void {
        console.log('Resolving split...');
        if (this.splitHands.length > 0) {
            this.soundFiles.play('deal_one_card', 100);
            this.gameOver = false;
            this.user.clearHand(); // @ts-ignore
            this.user.deal(this.splitHands.pop().cards);
            this.dealTo(this.user, 1);
            this.user.hand.split = true;
            this.dealer.hand.cutEnd(2);
            this.user.setBet(this.splitBet);
            this.dealer.setBet(this.splitBet);
            this.pot = 2 * this.splitBet;
            if (this.splitHands.length === 0) {
                this.splitBet = 0;
            }
            if (this.user.bestHand === 21 || this.dealer.bestHand === 21) {
                this.gameOver = true;
                this.endGame();
            }
            this.round = 2;
        }
    }

    get canHit(): boolean {
        if (this.user.emptyHand || this.gameOver || this.pot <= 0) {
            return false;
        }
        else if (this.user.bestHand >= 21) {
            return false;
        }
        else {
            return true;
        }
    }

    hit(): void {
        console.log('Clicked the hit button.');
        if ( this.canHit ){
            this.dealTo(this.user, 1);
            this.soundFiles.play('deal_one_card', 100);
            if (this.user.bestHand >= 21) {
                this.gameOver = true;
                this.endGame();
            }
            this.round++;
        }
        else {
            this.raise_alert('Hitting is not allowed!');
        }
    }

    get canDouble(): boolean {
        return this.canHit && this.user.hand.cards.length === 2 && (this.user.money - this.user.bet) >= 0;
    }

    double(): void {
        console.log('Clicked the double button.');
        if ( this.canDouble ){
            this.soundFiles.play('coins');
            this.pot += 2 * this.user.bet;
            this.dealer.setBet(this.user.bet);
            this.user.setBet(this.user.bet);
            this.dealTo(this.user, 1);
            this.soundFiles.play('bet');
            this.soundFiles.play('deal_one_card', 400);
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
            this.raise_alert('Doubling is not allowed!');
        }
    }

    get canStand(): boolean {
        return this.canHit;
    }

    stand(): void {
        console.log('Clicked the stand button.');
        if ( this.canStand ){
            const playOn: boolean = true && this.hasBlackjack.length === 0;
            while (playOn && this.dealer.bestHand <= 16) {
                this.dealTo(this.dealer, 1);
                this.round++;
            }
            this.gameOver = true;
            this.endGame();
        }
        else {
            this.raise_alert('Stand action is not allowed!');
        }
    }

    get canSplit(): boolean {
        return this.canDouble && this.user.hand.canSplit;
    }

    split(): void {
        console.log('Clicked the split button.');
        if ( this.canSplit ){// @ts-ignore
            this.splitHands.push(this.user.split());
            this.splitBet = this.user.bet;
            this.dealTo(this.user, 1);
            this.soundFiles.play('deal_one_card', 100);
            this.round++;
            if (this.user.bestHand >= 21) {
                this.gameOver = true;
                this.endGame();
            }
        }
        else {
            this.raise_alert('Split action is not allowed!');
        }
    }

    dealTo(player: Player, amount: number): void {
        if (this.deck.length - amount >= 0) {
            const cards: Card[] = this.deck.popRandomCards(amount);
            player.deal(cards);
        }
    }

    raise_alert(msg: string): void {
        this.soundFiles.play('warning');
        alert(msg);
    }

    disableButton(name: string): void {
        this.soundFiles.play('warning');
        alert(name + '-button is disabled!');
    }
}
