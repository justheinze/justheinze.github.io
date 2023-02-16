import { Component, OnInit } from '@angular/core';
import { TennerService } from '../tenner.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  playerName!: string;

  constructor(public tenner: TennerService){

  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.tenner.loggedIn = true;
    this.tenner.name = this.playerName;
    this.tenner.join();
  }
}
