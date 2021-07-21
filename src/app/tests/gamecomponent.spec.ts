import { TestBed , ComponentFixture, fakeAsync, tick, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentRef, DebugElement, Component, OnInit, Injectable } from "@angular/core";
import { GameComponent } from '../game/game.component'
import { By } from "@angular/platform-browser";
import { ButtonSounds, ButtonSoundsMock } from "../game/buttonSounds.model";
import { CardDeckMock } from '../game/cardDeck.model';
import { Card, Suit } from '../game/card.model';


@Injectable({
  providedIn: 'root',
})
export class CardDeckFortesting {
  public cards: Card[] = [];

  constructor() {
      this.cards = [
        new Card(Suit.Diamonds, 2),  // user
        new Card(Suit.Hearts, 2),  // user
        new Card(Suit.Spades, 10),  // dealer
        new Card(Suit.Spades, 8),  // dealer
        new Card(Suit.Clubs, 2),  // user Split 1.1
        new Card(Suit.Clubs, 10),  // user Split 2.1
        new Card(Suit.Clubs, 3),  // user Split 2.1
        new Card(Suit.Clubs, 4),  // user Split 2.1 (19, win)
        new Card(Suit.Hearts, 5),  // user Split 2.2
        new Card(Suit.Hearts, 13),  // user Split 2.2 (17, loss)
        new Card(Suit.Diamonds, 10),  // user Split 1.1
        new Card(Suit.Diamonds, 9),  // user Split 1.1 (21, win)
      ]
      let rest: number = 52 - this.cards.length;
      for (let i=0; i<rest; i++) {
        this.cards.push(new Card(Suit.Diamonds, 14));
      }
  }

  get length() {
      return this.cards.length;
  }

  popRandomCards(amount: number = 1) {  // Pops the cards in the reversed order; not randomly!
      let cards: Card[] = [];
      for (let i = 0; i < amount; i++) {
          //  @ts-ignore
          cards.push(this.cards.splice(0, 1));
      }
      return cards;   
  }
}



@Component({
  selector: "game",
  templateUrl: "../game/game.component.html",
  styleUrls: ["../game/game.component.css"]
})

export class GameComponentMock extends GameComponent implements OnInit {

  constructor( public deck: CardDeckFortesting, public soundFiles: ButtonSoundsMock) {
      super(deck, soundFiles);
  }

  restart() {
      this.soundFiles = new ButtonSoundsMock();
      this.soundFiles.play("shuffle");
      this.deck = new CardDeckFortesting();
      this.clear();
  }
}


/*describe('GameComponent init tests', () => {
    let fixture: ComponentFixture<GameComponentMock>;
    let component: GameComponentMock;
    let debugElement: DebugElement;
    let bindingElement: HTMLDivElement;
    let buttonSounds;)


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        GameComponentMock
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponentMock);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    bindingElement = debugElement.query(By.css("div")).nativeElement;
    fixture.detectChanges();
  });

  afterEach(async () => {
    component.restart();
  });


  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should contain grid titles`, () => {
    expect(bindingElement.textContent).toContain("Menu");
    expect(bindingElement.textContent).toContain("Game Status");
    expect(bindingElement.textContent).toContain("Results");
  });

  it(`should contain game status -related data bindings`, () => {
    expect(component.dealer).toBeTruthy;
    expect(component.user).toBeTruthy;
    expect(component.pot).toBe(0);
    expect(component.round).toBe(1);
    expect(component.splitHands).toHaveSize(0);
    expect(component.splitBet).toBe(0);
    expect(component.earlierBet).toBe(0);
    expect(component.user).toBeTruthy;
  });

  it(`Init stage should yield correct statuses for the analyzer functions`, () => {
    expect(component.howManyPlayers).toBe(2);
    expect(component.cardsLeft).toBe(52);
    expect(component.dealerHand).toBe(0);
    expect(component.hasBlackjack).toHaveSize(0);
    expect(component.canResolveSplit).toBe(false);
    expect(component.canHit).toBe(false);
    expect(component.canDouble).toBe(false);
    expect(component.canStand).toBe(false);
    expect(component.canSplit).toBe(false);
  });


  it(`Should find bet button and it should be clickable`, fakeAsync(() => {
    fixture.detectChanges();
    //let inputEl = debugElement.query(By.css(".inputBet")).nativeElement;
    let inputEl = debugElement.query(By.css("#inputBet")).nativeElement;
    expect(inputEl).toBeTruthy();
    let betDivEl = debugElement.query(By.css(".bet")).query(By.css("div")).nativeElement;
    expect(betDivEl.textContent).toContain("Bet");
    expect(inputEl.value).toBe('0');
    let betButton = debugElement.query(By.css("#betButton")).nativeElement;
    expect(betButton).toBeTruthy();

    spyOn(component, 'bet');
    betButton.click();
    tick(100);
    expect(component.bet).toHaveBeenCalled();
  })
  );

});
*/



describe('GameComponent functional tests', () => {
  let fixture: ComponentFixture<GameComponentMock>;
  let component: GameComponentMock;
  let debugElement: DebugElement;
  let bindingElement: HTMLDivElement;


beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [
      RouterTestingModule
    ],
    declarations: [
      GameComponentMock
    ],
  }).compileComponents();

  fixture = TestBed.createComponent(GameComponentMock);
  component = fixture.componentInstance;
  debugElement = fixture.debugElement;
  bindingElement = debugElement.query(By.css("div")).nativeElement;
  fixture.detectChanges();
  let buttonElement = debugElement.query(By.css("#betButton"));
  let inputBetEl = debugElement.query(By.css("#inputBet")).nativeElement;
  inputBetEl.value = '100'
  buttonElement.triggerEventHandler('click', null);
  fixture.detectChanges();
});

afterEach(async () => {
  component.restart();
});

it('beforeEach should work', () => {
  fixture.detectChanges();
  expect(bindingElement.textContent).toContain("Menu");
  expect(component.cardsLeft).toBe(48);
  expect(component.pot).toBe(200);
  let betDivEl = debugElement.query(By.css(".bet")).query(By.css("div"));
  expect(betDivEl).toBeFalsy();
  let actionEls: DebugElement[] = debugElement.query(By.css(".actions")).queryAll(By.css("div"));
  console.log(actionEls[0]);
  expect(actionEls[0].nativeElement.textContent).toBe('New game');

  if( !component.gameOver ){
    expect(actionEls).toHaveSize(4);
    let hitButton = debugElement.query(By.css("#hitButton"));
    expect(hitButton).toBeTruthy();
  }
  else {
    expect(actionEls).toHaveSize(1);
    let hitButton = debugElement.query(By.css("#hitButton"));
    expect(hitButton).toBeFalsy();
  }
});

it(`Should click hit button`, fakeAsync(() => {
  let hitButton = debugElement.query(By.css("#hitButton"));
  expect(hitButton).toBeTruthy();
  hitButton.triggerEventHandler('click', null);
  tick(200);
  fixture.whenStable().then(() => {
    if (!component.gameOver) {
      expect(component.canBet).toBeFalse();
      expect(component.cardsLeft).toBe(47);
      expect(component.user.hand.howManyCards).toBe(3);
      expect(component.dealer.hand.howManyCards).toBeGreaterThanOrEqual(2);
      expect(component.round).toBe(3);
      expect(component.canDouble).toBeFalse();
      expect(component.canHit).toBeTrue();
      expect(component.canStand).toBeTrue();
      expect(component.canResolveSplit).toBe(false);
      expect(component.canSplit).toBe(false);
      hitButton = debugElement.query(By.css("#hitButton"));
      if(component.canHit) {
        expect(hitButton).toBeTruthy();
      }
      else {
        expect(hitButton).toBeFalsy();
      }
    }
  });
}));

it(`Should click stand button`, fakeAsync(() => {
  
  let standButton = debugElement.query(By.css("#standButton"));
  expect(standButton).toBeTruthy();
  standButton.triggerEventHandler('click', null);
  tick(200);
  fixture.detectChanges();
  fixture.whenStable().then(() => {
    expect(component.gameOver).toBeTrue();
    expect(component.canBet).toBeFalse();
    expect(component.user.hand.howManyCards).toBe(2);
    expect(component.dealer.hand.howManyCards).toBeGreaterThanOrEqual(2);
    expect(component.round).toBeGreaterThanOrEqual(2);
    expect(component.canDouble).toBeFalse();
    expect(component.canHit).toBeFalse();
    expect(component.canStand).toBeFalse();
    expect(component.canResolveSplit).toBe(false);
    expect(component.canSplit).toBe(false);
    standButton = debugElement.query(By.css("#standButton"));
    expect(standButton).toBeFalsy();
  });
}));

it(`Should click double button`, fakeAsync(() => {
  let doubleButton = debugElement.query(By.css("#doubleButton"));
  expect(doubleButton).toBeTruthy();
  doubleButton.triggerEventHandler('click', null);
  tick(200);
  fixture.detectChanges();
  fixture.whenStable().then(() => {
    expect(component.gameOver).toBeTrue();
    expect(component.canBet).toBeFalse();
    expect(component.user.hand.howManyCards).toBe(3);
    expect(component.dealer.hand.howManyCards).toBeGreaterThanOrEqual(2);
    expect(component.round).toBe(3);
    expect(component.canDouble).toBeFalse();
    expect(component.canHit).toBeFalse();
    expect(component.canStand).toBeFalse();
    expect(component.canResolveSplit).toBe(false);
    expect(component.canSplit).toBe(false);
    doubleButton = debugElement.query(By.css("#doubleButton"));
    expect(doubleButton).toBeFalsy();
  });

}));


it(`Should click split button`, fakeAsync(() => {
  let splitButton = debugElement.query(By.css("#splitButton"));
  expect(splitButton).toBeTruthy();
  splitButton.triggerEventHandler('click', null);  // First split
  tick(200);
  fixture.detectChanges();
  fixture.whenStable().then(() => {
    expect(component.gameOver).toBeFalse();
    expect(component.canDouble).toBeTrue();
    expect(component.user.hand.howManyCards).toBe(2);
    expect(component.dealer.hand.howManyCards).toBe(2);
    expect(component.round).toBe(3);
    expect(component.canDouble).toBeFalse();
    expect(component.canHit).toBeFalse();
    expect(component.canStand).toBeFalse();
    expect(component.canResolveSplit).toBe(false);
    splitButton = debugElement.query(By.css("#doubleButton"));
    expect(splitButton).toBeTruthy();
    // Because in the testing deck we get three deuces in a row!

    splitButton.triggerEventHandler('click', null);  // Second split
    tick(200);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.gameOver).toBeFalse();
      expect(component.canBet).toBeFalse();
      expect(component.user.hand.howManyCards).toBe(3);
      expect(component.dealer.hand.howManyCards).toBeGreaterThanOrEqual(2);
      expect(component.round).toBe(3);
      expect(component.canDouble).toBeFalse();
      expect(component.canHit).toBeFalse();
      expect(component.canStand).toBeFalse();
      expect(component.canResolveSplit).toBe(false);
      expect(component.canSplit).toBe(false);
      splitButton = debugElement.query(By.css("#doubleButton"));
      expect(splitButton).toBeFalsy();
    });
  });
}));
});
