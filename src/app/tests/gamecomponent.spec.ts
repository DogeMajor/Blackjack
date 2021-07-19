import { TestBed , ComponentFixture, fakeAsync, tick, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from "@angular/core";
import { GameComponent, GameComponentMock } from '../game/game.component'
import { By } from "@angular/platform-browser";
import { ButtonSounds, ButtonSoundsMock } from "../game/buttonSounds.model";
import { CardDeckMock } from '../game/cardDeck.model';

/*describe('GameComponent init tests', () => {
    let fixture: ComponentFixture<GameComponentMock>;
    let component: GameComponentMock;
    let debugElement: DebugElement;
    let bindingElement: HTMLDivElement;
    let buttonSounds;


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
  fixture.detectChanges();
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
    expect(actionEls).toHaveSize(3);
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
  //fixture.detectChanges();
  let hitButton = debugElement.query(By.css("#hitButton"));
  expect(hitButton).toBeTruthy();
  hitButton.triggerEventHandler('click', null);
  fixture.detectChanges();
  fixture.whenStable().then(() => {
    if (!component.gameOver) {
      expect(component.canBet).toBeFalse();
      expect(component.cardsLeft).toBe(47);
      expect(component.user.hand.cards.length).toBe(3);
      expect(component.dealer.hand.cards.length).toBe(3);
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
});