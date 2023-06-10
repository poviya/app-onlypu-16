import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  // sendMessage(msg: string) {
  //   this.socket.emit('message', msg);
  // }
  // getMessage() {
  //   return this.socket.fromEvent('message').pipe(map((data: any) => data.msg));
  // }
}
