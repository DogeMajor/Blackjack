import { Injectable } from "@angular/core";


var SOURCES: Map<string, string> = new Map();
SOURCES.set("shuffle", "../../../assets/sounds/card-deck-shuffle.wav");
SOURCES.set("flick", "../../../assets/sounds/card-flick.wav");
SOURCES.set("hits", "../../../assets/sounds/card-hits.wav");
SOURCES.set("placement", "../../../assets/sounds/card-placement.wav");
SOURCES.set("coins", "../../../assets/sounds/coins.wav");
SOURCES.set("warning", "../../../assets/sounds/warning.wav");

@Injectable({
    providedIn: 'root',
})
export class ButtonSounds {

    public sounds: Map<string, any>
    
    constructor() {
        this.sounds = new Map<string, any>();
        for(let el of SOURCES) {
            this.addSound(el[0], el[1]);
        }      
    }
    
    loadAudio(path: string) {
        let audio = new Audio();
        audio.src = path;
        audio.load();
        return audio;
    }

    addSound(key: string, path: string) {
        this.sounds.set(key, this.loadAudio(path));
    }

    play(name: string) {
        this.sounds.get(name).play();
    }
}
