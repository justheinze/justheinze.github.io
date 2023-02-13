import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BoardComponent } from './board/board.component';
import { FormsModule } from '@angular/forms';
import { TennerService } from './tenner.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [TennerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
