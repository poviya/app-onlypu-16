import { Component, OnInit } from '@angular/core';
import { Suscription } from 'src/app/interfaces';
import { SuscriptionService } from 'src/app/services';

@Component({
  selector: 'app-main-all',
  templateUrl: './main-all.component.html',
  styleUrls: ['./main-all.component.scss']
})
export class MainAllComponent implements OnInit {

  suscriptions: Suscription[];
  constructor( private readonly suscriptionService: SuscriptionService) { }

  ngOnInit(): void {
    this.findAllSusbscribersJoin();
  }

  findAllSusbscribersJoin() {
    const data = {};
    this.suscriptionService.findAllSubscribersJoin(data).subscribe(res => {
      if(res) {
        this.suscriptions = res;
      }
    });
  }
}
