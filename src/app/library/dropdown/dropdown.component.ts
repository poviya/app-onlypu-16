import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/interfaces';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  animations: [
    trigger('menuAnimation', [
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(-10px)'
      })),
      transition('visible => hidden', animate('0.2s ease')),
      transition('hidden => visible', animate('0.2s ease'))
    ])
  ]
})
export class DropdownComponent implements OnInit {

  items = ['Opción 1', 'Opción 2', 'Opción 3'];
  showMenu = false;

  @Input() Items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  @Input() SelectedItem: string = 'Item 1';
  @Output() OnChange: EventEmitter<string> = new EventEmitter<string>();
  Show: boolean = false;
  private element: any;
  @Input() post: Post;
  
  constructor(
    public router: Router,
    private elementRef: ElementRef
    ) 
    { 
      
    }
  ngOnInit(): void {
 
  }


  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showMenu = false;
    }
  }

}
