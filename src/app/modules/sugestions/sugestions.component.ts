import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces';
import { UserService } from 'src/app/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sugestions',
  templateUrl: './sugestions.component.html',
  styleUrls: ['./sugestions.component.scss']
})
export class SugestionsComponent implements OnInit {

  loading: boolean;
  users: User[] = [];

  postLoading:string[]=["hola","que","tal"];

  constructor(
    private userService: UserService,

  ) { }

  ngOnInit(): void {
    this.usersSugestions();
  }

  usersSugestions() {
    this.loading = true;
    const data = {
      Site: environment.site
    }
    this.userService.usersSuggestion(data).subscribe(res => {
      if (res) {
        this.users = res;
        this.loading = false;
      }
    })
  }

  prinImages(images: any) {
    return images[0]['url'];
  };

  openModalTip(item: any) {

  }
}
