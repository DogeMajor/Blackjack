import { Injectable } from '@angular/core';


const SOURCES: Map<string, string> = new Map();
SOURCES.set('shuffle', '../../../assets/sounds/shuffle.wav');
SOURCES.set('deal_one_card', '../../../assets/sounds/deal_one_card.wav');
SOURCES.set('deal_two_cards', '../../../assets/sounds/deal_two_cards.wav');
SOURCES.set('coins', '../../../assets/sounds/coins.wav');
SOURCES.set('bet', '../../../assets/sounds/bet.wav');
SOURCES.set('warning', '../../../assets/sounds/warning.wav');

@Injectable({
    providedIn: 'root',
})
export class ButtonSounds {

    public sounds: Map<string, any>;

    constructor() {
        this.sounds = new Map<string, any>();
        for (const el of SOURCES) {
            this.addSound(el[0], el[1]);
        }
    }

    loadAudio(path: string): any {
        const audio = new Audio();
        audio.src = path;
        audio.load();
        return audio;
    }

    addSound(key: string, path: string): void {
        this.sounds.set(key, this.loadAudio(path));
    }

    play(name: string, timeout?: number): void {
        if (timeout) {
            setTimeout(() => { this.play(name); }, timeout);
        }
        else {
            this.sounds.get(name).play();
        }
    }
}

@Injectable({
    providedIn: 'root',
})
export class ButtonSoundsMock {

    public sounds: Map<string, any>;

    constructor() {
        this.sounds = new Map<string, any>();
    }

    loadAudio(path: string): any {
        return new Audio();
    }

    addSound(key: string, path: string): void {
        console.log('Nothing happens in this mocked class when adding sounds');
    }

    play(name: string, timeout?: number): void {
        console.log('The real play function would have played the sound for ' + name + '-method.');
    }

}
