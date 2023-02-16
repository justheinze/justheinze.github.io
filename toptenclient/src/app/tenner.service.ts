import { Injectable } from '@angular/core';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { of } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class TennerService {

  constructor() {

  }

  socket!: Socket<DefaultEventsMap, DefaultEventsMap>;
  setupConnection() {
    this.socket = io('https://topten-server.onrender.com:3221');

    this.socket.on('connected', (arg) => {
      console.log(arg);
    });

    this.socket.on('state', (gamestate) => {
      this.game = gamestate;
      if (this.game.captain === this.game.players.indexOf(this.name) && this.game.captain !== -1) {
        this.isCap = true;
      } else {
        this.isCap = false;
      }
      if (this.game.players.indexOf(this.name) !== -1) {
        this.isViewer = false;
      } else {
        this.isViewer = true;
      }

      this.unicorns = this.game.unicorns + '/' + this.game.maxUnicorns + ' Einhörner';
      this.shits = this.game.shit + '/' + this.game.maxUnicorns + ' Häufchen';
      this.calcBar();
      if(this.game.round !== -1){
        this.round = this.game.round;
      }

      if (this.game.answers[this.game.players.indexOf(this.name)]) {
        this.answer = this.game.answers[this.game.players.indexOf(this.name)];
        this.answered = true;
      }

      this.refreshPlayers = true;
      if (this.game.finished) {
        if (this.game.shit >= this.game.maxUnicorns) {
          this.end = 'Das lief ja nicht sogut ... aber ihr habt euch ja auch gerade erst aufgewärmt, oder?';
        } else if (this.game.shit < this.game.maxUnicorns && this.game.shit > this.game.unicorns) {
          this.end = 'Hmm, schon ganz gut, aber nächsts Mal läuft\'s bestimmt besser';
        } else if (this.game.shit < this.game.maxUnicorns && this.game.shit <= this.game.unicorns && this.game.shit > 0) {
          this.end = 'Sehr gut! Ihr seid ja echte Profis!';
        } else if (this.game.shit === 0 && this.game.unicorns === this.game.maxUnicorns) {
          this.end = 'Das war perfekt! Ihr kennt euch wirklich gut!';
        }
      }
    });

    this.socket.on('newGameStarted', (gamestate) => {
      this.isCap = false;
      this.isViewer = true;
      this.answered = false;
      this.disabledGuess = [];
      this.end = '';
      this.refreshPlayers = true;
      this.game = gamestate;
    })
  }

  game = {
    players: <string[]>[],
    viewer: <string[]>[],
    numbers: <number[]>[],
    answers: <string[]>[],
    currentNumber: 0,
    captain: -1,
    round: -1,
    thema: "Noch kein Thema",
    maxUnicorns: 0,
    unicorns: 0,
    shit: 0,
    started: false,
    finished: false,
    isNSFW: false
  }

  unicorns: string = 'Einhörner';
  shits: string = 'Häufchen';
  barPercent: number = 100;
  refreshPlayers: boolean = false;
  loggedIn: boolean = false;
  name: string = '';
  round!: number;
  isCap: boolean = false;
  isViewer: boolean = true;
  answer: string = '';
  answered: boolean = false;
  disabledGuess: string[] = [];
  end: string = '';
  // thema: String = 'Hier könnte ihr Thema stehen';
  // players = [
  //   {
  //     id: 1,
  //     name: 'Tick',
  //   },
  //   { id: 2,
  //     name: 'Trick'
  //   },
  //   {
  //     id: 3,
  //     name: 'Track'
  //   },
  //   {
  //     id: 4,
  //     name: 'Donald'
  //   }
  // ]

  // leadertoken: number = -1;
  // round: number = 0;

  // ownNumber: number = 0;


  // answers = [
  //   {
  //     id: 1,
  //     answer: 'Absolut'
  //   },
  //   {
  //     id: 2,
  //     answer: 'Gar'
  //   },
  //   {
  //     id: 3,
  //     answer: 'Nix'
  //   },
  //   {
  //     id: 4,
  //     answer: 'Nix'
  //   }
  // ];


  next(): void {
    this.socket.emit('nextRound');
    this.answered = false;
    this.disabledGuess = [];
  }

  calcBar(): void {
    this.barPercent = (this.game.unicorns / this.game.maxUnicorns) * 100;
  }

  guess(numbi: number, player: string): void {
    this.socket.emit('guess', numbi);
    this.calcBar();
    this.disabledGuess.push(player);
  }

  answering(): void {
    this.socket.emit('answer', this.answer);
    this.answered = true;
    this.answer = '';
  }

  setNSFW(): void {
    this.socket.emit('setNSFW');
  }

  join(): void {
    this.socket.emit('join', this.name);
  }

  joinGame(): void {
    this.socket.emit('joinGame', this.name);
    this.isViewer = false;
  }

  joinViewer(): void {
    if (!this.isViewer) {
      this.socket.emit('joinViewer', this.name);
      this.isViewer = true;
    }
  }

  startGame(): void {
    this.socket.emit('startGame');
  }

  newGame(): void {
    this.socket.emit('newGame');
  }
}
