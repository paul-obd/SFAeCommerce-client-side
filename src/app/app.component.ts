import { Component, OnInit } from '@angular/core';
import { MessagingService } from './services/messaging.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  message: any;

  constructor(private messagingService: MessagingService){

  }
  ngOnInit(): void {
    // this.messagingService.requestPermission()
    // this.messagingService.receiveMessage()
    // this.message = this.messagingService.currentMessage
  }
  title = 'SFAeCommerce';
}

