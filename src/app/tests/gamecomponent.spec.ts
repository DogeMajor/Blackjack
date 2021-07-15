import { TestBed , ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from "@angular/core";
import { GameComponent } from '../game/game.component'
import { By } from "@angular/platform-browser";
import { ButtonSounds, ButtonSoundsMock } from "../game/buttonSounds.model";

describe('GameComponent', () => {
    let fixture: ComponentFixture<GameComponent>;
    let component: GameComponent;
    let debugElement: DebugElement;
    let bindingElement: HTMLDivElement;
    let labelElement: HTMLLabelElement;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        GameComponent
      ],
    }).compileComponents();
    TestBed.overrideComponent(
        GameComponent,
        { set: { providers: [{ provide: ButtonSounds, useClass: ButtonSoundsMock }] } }
    );
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    bindingElement = debugElement.query(By.css("div")).nativeElement;
    labelElement = debugElement.query(By.css("label")).nativeElement;
    
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


  it(`Should find bet button`, () => {
    //const fixture = TestBed.createComponent(GameComponent);
    //const app = fixture.componentInstance;
    let buttonEl = debugElement.query(By.css("button"));
    console.log(buttonEl);
    console.log(buttonEl.nativeElement.innerHTML);
    //component.bet(1);
    //fixture.detectChanges();
    //expect(component.cardsLeft).toBe(48);
    //expect(component.pot).toBe(2);

    

    //let buttonEl = bindingElement.children[0].query(By.css("div")).nativeElement;
  });

  /*it(`Betting should function`, () => {
    //const fixture = TestBed.createComponent(GameComponent);
    //const app = fixture.componentInstance;
    component.bet(1);
    fixture.detectChanges();
    expect(component.cardsLeft).toBe(48);
    expect(component.pot).toBe(2);
    
    expect(component.round).toBe(2);
    expect(component.splitHands).toHaveSize(0);
    expect(component.splitBet).toBe(0);
    expect(component.earlierBet).toBe(1);

    

    //let buttonEl = bindingElement.children[0].query(By.css("div")).nativeElement;
  });

  it(`Bet + hit should work`, () => {
    component.bet(1);
    fixture.detectChanges();
    expect(component.cardsLeft).toBe(48);
    expect(component.pot).toBe(2);
    expect(component.round).toBe(2);
    expect(component.splitHands).toHaveSize(0);
    expect(component.splitBet).toBe(0);
    expect(component.earlierBet).toBe(1);

    

    //let buttonEl = bindingElement.children[0].query(By.css("div")).nativeElement;
  });*/
});
