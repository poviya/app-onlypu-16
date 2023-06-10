import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/library/modal';
import { AppService, ToolsService } from 'src/app/services';
import { SearchService } from '../../search.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit {

  myform: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    public router: Router,
    private toolsService: ToolsService,
    @Inject(DOCUMENT) private document: Document,
    private modalService: ModalService,
    private appService: AppService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.myform = this.fb.group({
      q: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.myform.valid) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    //this.router.navigate([currentUrl]);
    this.router.navigate(['search/users'],
      { queryParams: {q: this.myform.value.q } });
    //this.findAllAds();
    //console.log(this.myform.value);
    }
  }
}
