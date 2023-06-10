import { Injectable } from '@angular/core';
import { flush } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class VideoMediaService {

  private openPlay: boolean = false;

  private currentVideoIndex: any = -1;
  private videoStates: boolean[] = [];

  constructor() { }

  get mediaPlay() {
    return this.openPlay;
  } 

  tooglePlay(id: string) {
    this.openPlay = !this.openPlay;
  }

  playVideo(index: any): void {
    this.currentVideoIndex = index;
    this.videoStates[index] = true;
  }

  pauseVideo(index: any): void {
    this.videoStates[index] = false;
  }

  isVideoPlaying(index: any): boolean {
    //return this.currentVideoIndex === index && this.videoStates[index];
    return true;
  }
  
}
