import { Component, OnInit, Input } from '@angular/core';
import { Country } from 'src/app/interfaces';
import { Config, Menu } from '../types';

@Component({
  selector: 'app-acordion',
  templateUrl: './acordion.component.html',
  styleUrls: ['./acordion.component.scss']
})
export class AcordionComponent implements OnInit {

  active = false;
  @Input() options: any;
  @Input() countries: any[];
  config: Config;
  
  ngOnInit() {
    this.config = this.mergeConfig(this.options);
  }

  mergeConfig(options: Config) {
    const config = {
      multi: true
    };

    return { ...config, ...options };
  }

  toggle(index: number) {
   
    if (!this.config.multi) {  
      this.countries.filter(
        (menu, i) => i !== index && !menu.activeOnlypu
      ).forEach(menu => {
        menu.activeOnlypu = !menu.activeOnlypu;
        console.log(menu.activeOnlypu);
      });
    }
    this.countries[index].activeOnlypu = !this.countries[index].activeOnlypu;
  }
}