import { Component, OnInit } from '@angular/core';
import { Suscription } from 'src/app/interfaces';
import { SuscriptionService } from 'src/app/services';

@Component({
  selector: 'app-main-expired',
  templateUrl: './main-expired.component.html',
  styleUrls: ['./main-expired.component.scss']
})
export class MainExpiredComponent implements OnInit {

  suscriptions: Suscription[];
  constructor( private readonly suscriptionService: SuscriptionService) { }

  ngOnInit(): void {
    this.findAllSusbscribersJoin();
  }

  findAllSusbscribersJoin() {
    const data = {
      expired: true
    };
    this.suscriptionService.findAllSubscribersJoin(data).subscribe(res => {
      if(res) {
        this.suscriptions = res;
      }
    });
  }
}