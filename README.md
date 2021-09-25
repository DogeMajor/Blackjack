# Blackjack

Short project for getting acquainted with angular and ts.
The app supports all the normal blackjack actions: hit, stand, bet, double and split. After installing needed depedencies you can run `ng serve` and open `http://localhost:4200/` to run the dev server. The sound effects are stored in the assets/sounds flder and you can replace them with your own ones. See the model buttonSounds.model.ts in src/game-folder. If you want to rename or add more sounds also change the source code calling the play-method in gameComponent.ts, which is the main component of the app.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Tests for gameComponent are found in the tests folder. First tests ensure that the component itself functions properly. The next test class tests the actual behavior of the app, i.e. it waits for the elements to appear and change after we click on different buttons. The latter test class utilizes a constant cardDeck defined at the beginning of the test file.


## Version Details

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.12.
