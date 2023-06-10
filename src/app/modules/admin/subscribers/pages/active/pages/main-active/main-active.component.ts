import { Component, OnInit } from '@angular/core';
import { Suscription } from 'src/app/interfaces';
import { SuscriptionService } from 'src/app/services';

@Component({
  selector: 'app-main-active',
  templateUrl: './main-active.component.html',
  styleUrls: ['./main-active.component.scss']
})
export class MainActiveComponent implements OnInit {

  suscriptions: Suscription[];
  constructor( private readonly suscriptionService: SuscriptionService) { }

  ngOnInit(): void {
    this.findAllSusbscribersJoin();
  }

  findAllSusbscribersJoin() {
    const data = {
      active: true
    };
    this.suscriptionService.findAllSubscribersJoin(data).subscribe(res => {
      if(res) {
        this.suscriptions = res;
      }
    });
  }
}