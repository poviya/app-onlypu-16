import { Component, Input, OnInit } from '@angular/core';
import { Cam, User } from 'src/app/interfaces';
import { SpinnerService } from 'src/app/library/spinner/spinner.service';
import { CamService } from 'src/app/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cam',
  templateUrl: './cam.component.html',
  styleUrls: ['./cam.component.scss']
})
export class CamComponent implements OnInit {

  @Input() user: User;
  cam : Cam;
  
  constructor(
    private camService: CamService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.findOneUser();
  }

  findOneUser() {
  if(this.user) {
    this.camService.findOneUser(this.user._id!).subscribe(res => {
       if(res) {
          this.cam = res;
       }
    })
  }
  }

  onCreate(): void {
    if(this.user) {
      this.spinnerService.start();
      const data = {
        Site: environment.site
      };
      this.camService.create(data).subscribe(res => {
        if(res) {
          this.cam = res;
          this.spinnerService.close();
        }
      });
    }
  }

  onStatus(): void {
    if(this.user && this.cam) {
      this.spinnerService.start();
      const data = {
        active: this.cam.active ? false : true
      };
      this.camService.update(this.cam._id!, data).subscribe(res => {
        if(res) {
          this.cam = res;
          this.spinnerService.close();
        }
      });
    }
  }
}
