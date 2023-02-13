import { Component, Input, OnInit } from '@angular/core';
import { TennerService } from '../tenner.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() refresh: boolean = false;
  game!: { players: string[]; viewer: string[]; numbers: number[]; answers: string[]; currentNumber: number; captain: number; round: number; thema: string; maxUnicorns: number; unicorns: number; shit: number; started: boolean; finished: boolean; isNSFW: boolean; };

  answer: string = '';

  constructor(public tenner: TennerService) {

  }

  ngOnInit(): void {

  }

  reloadPlayers(){
    this.game = this.tenner.game;
    // this.tenner.refreshPlayers = false;
  }

  ngOnChanges(){
    console.log('There have been changes');
    // if(this.refresh){
    //   this.reloadPlayers();
    // }
  }

  onAnswer(): void {
    this.tenner.answering(this.answer);
    this.answer = '';
  }
}
