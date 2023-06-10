import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostAdCategory } from 'src/app/interfaces/adCategory';
import { CityZone, Country, CountryState, StateCity } from 'src/app/interfaces';
import { AdCategoryService } from 'src/app/services/post-ad-category.service';
import { CountryStateService } from 'src/app/services/country-state.service';
import { StateCityService } from 'src/app/services/state-city.service';
import { AppService, CityZoneService, ToolsService } from 'src/app/services';
import { ModalService } from 'src/app/library/modal';
import { SearchService } from '../../search.service';


@Component({
  selector: 'app-search-rigth',
  templateUrl: './search-rigth.component.html',
  styleUrls: ['./search-rigth.component.scss']
})
export class SearchRigthComponent implements OnInit {

  @Input() width: any;
  @Input() countryCode: any;
  @Input() categorySlug: any;
  //@Input() countryStateSlug: any;
  @Input() stateCitySlug: any;
  @Input() cityZoneSlug: any;
  @Input() searchModal: any;

  isBrowser: boolean;

  countryStateSlug;
  //stateCitySlug;
  //cityZoneSlug;

  data: any;
  ads: any[];
  registroFormGroup: FormGroup;
  adCategories: PostAdCategory[];
  countryStates: CountryState[];
  
  country: any;
  stateCitiesAll: StateCity[]; 
  stateCitiesOnly: StateCity[]; 
  stateCitiesRest: StateCity[]; 
  swStateCitiesOnly = false;

  cityZones: CityZone[];
  swCityZones = true;

    constructor(
      private activeRoute: ActivatedRoute,
      private fb: FormBuilder,
      @Inject(PLATFORM_ID) private platformId: Object,
      private adCategoryService: AdCategoryService,
      private countryStateService: CountryStateService,
      private stateCityService: StateCityService,
      private cityZoneService: CityZoneService,
      public router: Router,
      private toolsService: ToolsService,
      @Inject(DOCUMENT) private document: Document,
      private modalService: ModalService,
      private appService: AppService,
      private searchService: SearchService
    ) {
      //this.countryCode = this.router.url.split('/')[1]; 
      //this.categorySlug = this.router.url.split('/')[2]; //this.activeRoute.snapshot.paramMap.get('categorySlug');
      this.countryStateSlug = this.activeRoute.snapshot.paramMap.get('countryStateSlug');
      //this.stateCitySlug = this.router.url.split('/')[3]; //this.activeRoute.snapshot.paramMap.get('stateCitySlug');
      //this.cityZoneSlug = this.router.url.split('/')[4];  //this.activeRoute.snapshot.paramMap.get('cityZoneSlug');
  
      if (isPlatformBrowser(this.platformId)) {
        this.isBrowser = true;
      }
      if (isPlatformServer(this.platformId)) {
      
      } 
    }

  ngOnInit(): void {
  
    this.registroFormGroup = this.fb.group({
      categorySlug: [this.categorySlug],
      q: [null],
      countryStateSlug: [this.countryStateSlug !== null ? this.countryStateSlug : ""],
      stateCitySlug: [this.stateCitySlug !== null ? this.stateCitySlug : ""],
      cityZoneSlug: [this.cityZoneSlug !== null ? this.cityZoneSlug : ""],
    });

    this.findAllQuery();

  }

  get search() {
    return  true;//this.searchService.search;
  }

  async findAllQuery()
  { 
    let data ;

    if(!this.countryCode)
    {
      //this.countryCode = this.toolsService.country.slug;
    }

    data = {
      countryCode: this.countryCode,
    };

    const dataCountries = await this.appService.appCountryfindAll().toPromise();
    this.country = dataCountries!.find( country => country.code === this.countryCode ); //? this.countryCode :  this.toolsService.country._id

    const dataAdCategories = await this.appService.appAdCategoriesfindAll().toPromise();
    this.adCategories = dataAdCategories!.filter( category => category.Country === this.country?._id &&category.active === true );
    //console.log(this.adCategories)
    if(this.adCategories.length > 0)
    {
      this.adCategories = this.adCategories;   
      if(!this.categorySlug)
      { 
        this.registroFormGroup.patchValue({
          categorySlug: this.adCategories[0].slug
        });
      } else { 
        this.registroFormGroup.patchValue({
          categorySlug: this.categorySlug
        });
      }
    }

    const dataCountryStates = await this.appService.appCountryStatesfindAll().toPromise();
    this.countryStates = dataCountryStates!.filter( res => res.Country === this.country?._id );
    //console.log(this.countryStates)

    const dataStateCities = await this.appService.appStateCitiesfindAll().toPromise();
    this.stateCitiesAll = dataStateCities!.filter( res => res.Country === this.country?._id );
    //console.log(this.stateCitiesAll)

    //this.findAllQueryAdCategories(data);
    //this.findAllQueryCountryState(data);
    //this.findAllCountryCity(data);
    this.defaultStateCity();
  }

  async findAllQueryAdCategories(data: any)
  {

    this.adCategoryService.findAllCountry(data).subscribe(res => {
      if(res.length > 0)
      {
        this.adCategories = res;   
        if(!this.categorySlug)
        { 
          this.registroFormGroup.patchValue({
            categorySlug: res[0].slug
          });
        } else { 
          this.registroFormGroup.patchValue({
            categorySlug: this.categorySlug
          });
        }
      }
    });
  }
  
  findAllQueryCountryState(data: any)
  {
    this.countryStateService.findAllCountry(data).subscribe(res => {
      this.countryStates = res;  //console.log(res);
    });
  }

  // showing all the cites of the country
  findAllCountryCity(data: any)
  {
    this.stateCityService.findAllCountry(data).subscribe(res => {
      this.stateCitiesAll = res;  //console.log(res);
      this.defaultStateCity();
    });
  }

  // showing all te cihtes of the country
  async findAllStateCity(data: any)
  {
    const dataStateCities = await this.appService.appCityZonesfindAll().toPromise();
    this.cityZones = dataStateCities!.filter( res => res.StateCity === data.StateCity );
 
    if(this.cityZones.length > 0) {
      this.swCityZones = false;
    } else {
      this.swCityZones = true;
      this.registroFormGroup.patchValue({
        cityZoneSlug: ''
      });
    }
  }

  async findAllStateCity0(data: any)
  {
    this.cityZoneService.findAllStateCity(data).subscribe(res => {
      this.cityZones = res;  //console.log(res);
      if(this.cityZones.length > 0) {
        this.swCityZones = false;
      } else {
        this.swCityZones = true;
        this.registroFormGroup.patchValue({
          cityZoneSlug: ''
        });
      }
    });
  }

  async onCountryState(e:any) {

    if(this.registroFormGroup.value.countryStateSlug !== '')
    {
      const resCountryState =  this.countryStates!.find( res => res.slug === e.target.value );

      const dataStateCities = await this.appService.appStateCitiesfindAll().toPromise();
      const resStateCities = dataStateCities!.filter( res => res.CountryState === resCountryState?._id );

      //this.stateCityService.findAllCountryState(data).subscribe(res => {
        this.stateCitiesOnly = resStateCities;
        this.stateCitiesAll = resStateCities;
        
        if(this.stateCitiesOnly.length == 1)
        {
          this.swStateCitiesOnly = false;
          this.registroFormGroup.patchValue({
            stateCitySlug: this.stateCitiesOnly[0].slug
          });
        } else {
          this.swStateCitiesOnly = true;
          this.registroFormGroup.patchValue({
            stateCitySlug: ''
          });
        }

        this.stateCitiesRest = this.stateCitiesAll;

        for(let item of  this.stateCitiesOnly)
        {
          this.stateCitiesRest =  this.stateCitiesRest.filter((item2) => item2._id !== item._id);
        }
      //});
    } else {
     
      const dataStateCities = await this.appService.appStateCitiesfindAll().toPromise();
      this.stateCitiesAll = dataStateCities!.filter( res => res.Country === this.country?._id );
      this.registroFormGroup.patchValue({
        stateCitySlug: ''
      });
    }
  }

  async onCountryState0(e:any) {

    if(this.registroFormGroup.value.countryStateSlug !== '')
    {
      let CountryState;

      for(let item of  this.countryStates)
      {
        if(item.slug == e.target.value)
        {
          CountryState = item._id;
        }
      }

      const data = {
        CountryState: CountryState
      };

      this.stateCityService.findAllCountryState(data).subscribe(res => {
        this.stateCitiesOnly = res;
        this.stateCitiesAll = res;
        
        if(this.stateCitiesOnly.length == 1)
        {
          this.swStateCitiesOnly = false;
          this.registroFormGroup.patchValue({
            stateCitySlug: this.stateCitiesOnly[0].slug
          });
        } else {
          this.swStateCitiesOnly = true;
          this.registroFormGroup.patchValue({
            stateCitySlug: ''
          });
        }

        this.stateCitiesRest = this.stateCitiesAll;

        for(let item of  this.stateCitiesOnly)
        {
          this.stateCitiesRest =  this.stateCitiesRest.filter((item2) => item2._id !== item._id);
        }
      });
    } else {
      this.registroFormGroup.patchValue({
        stateCitySlug: ''
      });
    }
  }

  defaultStateCity()
  {
    if(this.stateCitySlug)
    { 
      this.queryStetecity(this.stateCitySlug);
    } else {
      this.registroFormGroup.patchValue({
        stateCitySlug: "",
        cityZoneSlug: ""
      });
    }
  }

  async onStateCity(e:any) { 
    if(this.registroFormGroup.value.stateCitySlug !== '')
    { 
        this.queryStetecity(e.target.value);
    } else {
      const dataStateCities = await this.appService.appStateCitiesfindAll().toPromise();
      this.stateCitiesAll = dataStateCities!.filter( res => res.Country === this.country?._id );
      this.registroFormGroup.patchValue({
        countryStateSlug: "",
        stateCitySlug: ""
      });
    }
  }

  queryStetecity(slug: any)
  {

    const resStateCity = this.stateCitiesAll!.find( res => res.slug === slug);
    const resCountryState = this.countryStates!.find( res => res._id === resStateCity!.CountryState);

    const data = {
      StateCity: resStateCity?._id
    };
    
    this.registroFormGroup.patchValue({
      countryStateSlug: resCountryState!.slug
    });
    
    this.findAllStateCity(data);
    
   //console.log( this.stateCitiesAll);
  }

  queryStetecity0(slug: any)
  {
    let StateCity;
    
    for(let item of  this.stateCitiesAll)
    {
      if(item.slug == slug)
      {
        StateCity = item._id;
      }
    }
    const data = {
      StateCity: StateCity
    };
    //console.log(data);
    this.stateCityService.findOne(StateCity).subscribe(res => {
      this.registroFormGroup.patchValue({
        countryStateSlug: res.CountryState?.slug
      });
    });
    this.findAllStateCity(data);
    
   //console.log( this.stateCitiesAll);
  }

  onSubmit(): void {
    //this.closeModal(this.searchModal);
    //let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    //this.router.navigate([currentUrl]);
    if(this.registroFormGroup.value.stateCitySlug && !this.registroFormGroup.value.cityZoneSlug) 
    {
      this.router.navigate([this.countryCode + '/' + this.registroFormGroup.value.categorySlug + '/' + 
                            this.registroFormGroup.value.stateCitySlug],
                            { queryParams: { search: this.registroFormGroup.value.q } });
    } else if(this.registroFormGroup.value.stateCitySlug && this.registroFormGroup.value.cityZoneSlug) 
    {
      this.router.navigate([this.countryCode + '/' + this.registroFormGroup.value.categorySlug + '/' + 
                            this.registroFormGroup.value.stateCitySlug + '/' + 
                            this.registroFormGroup.value.cityZoneSlug],
                            { queryParams: { search: this.registroFormGroup.value.q } });
    } else if(!this.registroFormGroup.value.stateCitySlug && !this.registroFormGroup.value.cityZoneSlug) 
    {
      this.router.navigate([this.countryCode + '/' + this.registroFormGroup.value.categorySlug],
                            { queryParams: { search: this.registroFormGroup.value.q } });
    }
    //this.findAllAds();
    //console.log(this.registroFormGroup.value);
  }
  

  /// ANTERIOR CODIGO
  onStateCity0(e:any): void {
    if(this.registroFormGroup.value.stateCitySlug !== '')
    {
      let StateCity;

      for(let item of  this.stateCitiesAll)
      {
        if(item.slug == e.target.value)
        {
          StateCity = item._id;
        }
      }
      const data = {
        StateCity: StateCity
      };
      
      this.stateCityService.findOne(StateCity).subscribe(res => {
        this.registroFormGroup.patchValue({
          countryStateSlug: res.CountryState?.slug
        });
      });
      this.findAllStateCity(data);
    }
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
