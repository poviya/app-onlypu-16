import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private loading: boolean = false;
  private text: string = 'hola';

  constructor() { }

  get toast() {
    return this.loading;
  }

  get message() {
    return this.text;
  }

  start(text: string) {
    this.text = text;
    this.loading = true;
  }

  close() {
    this.loading = false;
  }
}
