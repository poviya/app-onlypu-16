import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  private loading: boolean = false;
  
  constructor() { }

  get spinner() {
    return this.loading;
  }

  start() {
    this.loading = true;
  }

  close() {
    this.loading = false;
  }
}
