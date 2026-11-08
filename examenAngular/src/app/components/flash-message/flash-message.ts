import { Component } from '@angular/core';
import { FlashService } from '../../services/flash';

@Component({
  selector: 'app-flash-message',
  templateUrl: './flash-message.html',
  styleUrls: ['./flash-message.css'],
  standalone: false
})
export class FlashMessage {
  messages$;

  constructor(private flashService: FlashService) {
    this.messages$ = this.flashService.messages$;
  }
}