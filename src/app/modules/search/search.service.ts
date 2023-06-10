import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private open: boolean = true;
  constructor() { }

  get search() {
    return this.open;
  }

  start() {
    this.open =  true;
  }

  close() {
    this.open =  false;
  }

  device(value: boolean) {
    this.open = value;
  }
}
