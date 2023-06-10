import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit } from '@angular/core';
import { Tools } from 'src/app/common/tools';

@Component({
  selector: 'read-more',
     template: `
         <div [innerHTML]="text" [class.collapsed]="isCollapsed" [style.height]="isCollapsed ? maxHeight+'px' : 'auto'">
         </div>
             <div class="cursor-pointer text-sm text-primary-600" *ngIf="isCollapsed" (click)="onChange()">{{'read.more'  | translate}}</div>
             <div class="cursor-pointer text-sm text-primary-600" *ngIf="!isCollapsed" (click)="onChange()">{{'read.less'  | translate}}</div>
     `,
     styles: [`
         div.collapsed {
             overflow: hidden;
         }
     `]
 })
export class ReadMoreComponent implements AfterViewInit {

  //the text that need to be put in the container
    @Input() text: any;

    //maximum height of the container
    @Input() maxHeight: number = 20;

    //set these to false to get the height of the expended container 
    public isCollapsed: boolean = false;
    public isCollapsable: boolean = false;

    constructor(private elementRef: ElementRef, private cd: ChangeDetectorRef) {
    }

    ngAfterViewInit() {
        
      let currentHeight = this.elementRef.nativeElement.getElementsByTagName('div')[0].offsetHeight;
      //collapsable only if the contents make container exceed the max height

        if (currentHeight > this.maxHeight) {
            this.isCollapsed = true;
            this.isCollapsable = true;
        }
      this.cd.detectChanges();

      this.innerText(this.text);
    }
 
    innerText(text: any)
    {
      return Tools.innerText(text);
    }

    onChange() {
      this.isCollapsed = !this.isCollapsed;
    }
 }