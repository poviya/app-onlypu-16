import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnInit {

  @Input() post: Post;

  showMask = false;
  previewImage = false;
  currentImageUrl: string = '';

  ngOnInit() {
    this.addClickOutsideListener();
  }

  onPreviewImage(url: string): void {
    this.showMask = true;
    this.previewImage = true;
    this.currentImageUrl = url;
  }


  onClosePreview(): void {
    this.showMask = false;
    this.previewImage = false;
    this.currentImageUrl = '';
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.isLightboxClicked(event)) {
      this.onClosePreview();
    }
  }

  isLightboxClicked(event: MouseEvent): boolean {
    const lightboxContainer = document.querySelector('.lightbox-container');
    return lightboxContainer !== null && lightboxContainer.contains(event.target as Node);
  }

  addClickOutsideListener() {
    document.addEventListener('click', (event: MouseEvent) => {
      const lightboxContainer = document.querySelector('.lightbox-container');
      const lightboxImage = document.querySelector('.lightbox-image');

      if (lightboxContainer && lightboxImage) {
        if (!lightboxContainer.contains(event.target as Node) && !lightboxImage.contains(event.target as Node)) {
          this.onClosePreview();
        }
      }
    });
  }
}
