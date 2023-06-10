import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import { PostAdService } from 'src/app/services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() search: any;
  myForm: FormGroup;
  
  constructor( 
        private fb: FormBuilder,
        private postAdService: PostAdService,
        public router: Router,
        ) { 
        }

  ngOnInit(): void {
    this.controlForm();
  }

  controlForm() {
    this.myForm = this.fb.group({
      search: [this.search ? this.search : null, Validators.required],
    });
  }
  onSubmit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url],
                            { queryParams: { search: this.myForm.value.search } });
    //this.findAllPostUser();
   
  }
}
