import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FlashService {
  private messagesSubject = new BehaviorSubject<string[]>([]);
  messages$ = this.messagesSubject.asObservable();
  private timeoutId: any;

  show(message: string) {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.messagesSubject.next([message]);
    this.timeoutId = setTimeout(() => this.messagesSubject.next([]), 5000);
  }
}