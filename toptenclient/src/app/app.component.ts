import { Component, OnInit } from '@angular/core';
import { TennerService } from './tenner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'toptenclient';

  constructor(public tenner: TennerService){
    
  }
  ngOnInit(): void {
    this.tenner.setupConnection();
  }
}
