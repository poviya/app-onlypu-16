import { Injectable } from '@angular/core';
import { flush } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private openDelete: boolean = false;
  private openSuspended: boolean = false;
  private openTip: boolean = false;
  private openTipCollection: boolean = false;
  private openMenuSiber: boolean = false;
  private openBuyCredit: boolean = false;
  private openReport: boolean = false;
  private openPost: boolean = false;
  private openSearch: boolean = false;
  private openComment: boolean = false;

  constructor() { }

  get modalDelete() {
    return this.openDelete;
  } 

  get modalSuspended() {
    return this.openSuspended;
  } 

  get modalTip() {
    return this.openTip;
  } 

  get modalTipCollection() {
    return this.openTipCollection;
  } 

  get modalMenuSiber() {
    return this.openMenuSiber;
  } 

  get modalBuyCredit() {
    return this.openBuyCredit;
  } 

  get modalReport() {
    return this.openReport;
  } 

  get modalPost() {
    return this.openPost;
  } 

  get modalSearch() {
    return this.openSearch;
  } 

  get modalComment() {
    return this.openComment;
  } 

  toogleDelete() {
    this.openDelete = !this.openDelete;
  }

  toogleSuspended() {
    this.openSuspended = !this.openSuspended;
  }

  toogleTip() {
    this.openTip = !this.openTip ;
  }

  toogleTipCollection() {
    this.openTipCollection = !this.openTipCollection;
  }

  toogleMenuSiber() {
    this.openMenuSiber = !this.openMenuSiber ;
  }

  toogleBuyCredit() {
    this.openBuyCredit = !this.openBuyCredit;
  }

  toogleReport() {
    this.openReport = !this.openReport;
  }

  tooglePost() {
    this.openPost = !this.openPost;
  }

  toogleSearch() {
    this.openSearch = !this.openSearch;
  }

  toogleComment() {
    this.openComment = !this.openComment;
  }

}
