import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { animate, style, transition, trigger, AnimationEvent, state } from '@angular/animations';
import { ModalService } from './modal.service';

@Component({ 
    selector: 'jw-modal', 
    templateUrl: 'modal.component.html', 
    styleUrls: ['modal.component.less'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('fade', [
          state('void', style({ opacity: 0 })),
          state('*', style({ opacity: 1 })),
          transition(':enter', animate('300ms ease-in-out')),
          transition(':leave', animate('300ms ease-in-out')),
        ]),
      ],
})
export class ModalComponent implements OnInit, OnDestroy {
    
    @Input() id: string;
    private element: any;
    modalState = '';

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {

       
        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
            var target = el.target.className;
            if(target.length)
            {
                console.log(target);
                var index = target.indexOf('hello-modal');
                if (index >= 0) {
                    this.close();
                }
            }
            
            //console.log(el.target.className)
        });
        
        
        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    onAnimationEnd(event: AnimationEvent )
    {
        if(event.toState == 'void') 
        {
            this.element.style.display = 'none';
            document.body.classList.remove('jw-modal-open');
        }
    }

    // remove self from modal service when component is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('jw-modal-open');
        this.openModal();
    }

    // close modal
    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('jw-modal-open');
    }


    openModal() {
        this.modalState = 'show';
      }
}