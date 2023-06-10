import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post, Suscription } from 'src/app/interfaces';
import { DialogService } from 'src/app/library/dialog/dialog.service';
import { ModalService } from 'src/app/library/modal';
import { AuthService, TipService } from 'src/app/services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dataTip: object;
  @Input() suscriptions: Suscription[];
  
  constructor(
    public router: Router,  
    public authService: AuthService,
    private tipService: TipService,
    private dialogService: DialogService
    ) { }

  ngOnInit(): void {
  }

  prinImages(images: any) 
  { 
    return images[0]['url'];
  };

  async openModalTip(item: Suscription) {
    this.dialogService.toogleTip();
    this.dataTip = {
      type: 'tip_account',
      user: item.Join
    };

    this.tipService.create(this.dataTip);
  }

  onCam(item: Suscription): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/cam' ],
    { queryParams: { roomID: item.Join?.Cam!.roomId } });
  }
}
