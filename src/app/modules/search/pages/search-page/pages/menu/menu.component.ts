import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() slug: string | null;
  @Input() count: any;

  search: string | null;
  
  constructor( 
    private activeRoute: ActivatedRoute,
    public router: Router) { 
    this.search = this.activeRoute.snapshot.queryParamMap.get('q');
  }

  ngOnInit(): void {
  }

  queryParamsCompareFn(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedParams = { q: 'para' };
    const currentParams = route.queryParams;
    return JSON.stringify(expectedParams) === JSON.stringify(currentParams);
  }
  

  onSetting() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/panel/setting/personalization']);

  }
}
