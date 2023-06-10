import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgeValidator, NumericValidator } from 'src/app/common/custom-validators.ts';

import { PostAdCategory, PostMedia, CityZone, CountryState, StateCity, FileMedia } from 'src/app/interfaces/index';

import { AdCategoryService } from 'src/app/services/post-ad-category.service';
import { AuthService } from 'src/app/services/auth.service';
import { CityZoneService } from 'src/app/services/city-zone.service';
import { CountryService } from 'src/app/services/country.service';
import { Country } from 'src/app/interfaces/country';
import { environment } from 'src/environments/environment';
import { AppService, PostAdService, PostMediaService } from 'src/app/services';
import { StateCityService } from 'src/app/services/state-city.service';
import { ToolsService } from 'src/app/services';

@Component({
  selector: 'app-details0',
  templateUrl: './details.component0.html',
  styleUrls: ['./details.component0.scss']
})
export class Details0Component implements OnInit {

  myform: FormGroup;

  isBrowser: boolean;

  idPost: string | null;

  ads: any[];
  adCategories: PostAdCategory[];
  countries: Country[]; 

  countryStates: CountryState[];
  
  stateCitiesAll: StateCity[]; 
  stateCitiesOnly: StateCity[]; 
  stateCitiesRest: StateCity[]; 
  swStateCitiesOnly = false;

  cityZones: CityZone[];
  swCityZones = true;

  images : FileMedia[] = [];
  selectedFiles: FileMedia[] = [];
  //uploadedFiles: any[] = [];

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private adCategoryService: AdCategoryService,
    private stateCityService: StateCityService,
    private cityZoneService: CityZoneService,
    private fb: FormBuilder,
    public router: Router,
    
    public postMediaService: PostMediaService,
    public postAdService: PostAdService,
    private toolsService: ToolsService,
    private appService: AppService
  ) 
  {
  }

  ngOnInit(): void {
    this.createFormControls();
    //this.findAllCountryCity();
    //this.findAllQueryCategories();
    this.idPost = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.idPost)
    {
      this.findOne();
    } else {
      
      //if(this.toolsService.country)
      //{
        // this.countryDefault(this.toolsService.country._id); //console.log( Date.now())
        this.countryDefault(); //console.log( Date.now())
      //}
    }
  }

  createFormControls() {
    this.idPost = this.activatedRoute.snapshot.paramMap.get('id');
    this.myform = this.fb.group({
      PostAdCategory: ['', Validators.required],
      Country: ['', Validators.required], 
      StateCity: ['', Validators.required],
      CityZone: ['', Validators.nullValidator],
      address: ['', Validators.nullValidator],
      postalCode: ['', [Validators.nullValidator]],
      zone: ['', Validators.nullValidator],
      age: ['', [Validators.required, AgeValidator, NumericValidator]],
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      phonePrefix: ['+1', Validators.required],
      phone: ['', [Validators.nullValidator, NumericValidator]],
      whatsapp: [false, Validators.nullValidator],
      telegram: ['', Validators.nullValidator],
      //file: ['', !this.idPost? Validators.required : Validators.nullValidator],
      terms: [false, Validators.requiredTrue],
     });
  }

  get r() { return this.myform.controls; }

  async countryDefault()
  {
    await this.appService.appCountryfindAll().subscribe( async countries => {
      this.countries = countries;
      //const country = countries!.find( res => res._id === Country);

      this.myform.patchValue({
        //Country: country?._id,
        //phonePrefix: country?.phonePrefix,
      });
      const dataStateCities = await this.appService.appStateCitiesfindAll().toPromise();
      //this.stateCitiesAll = dataStateCities!.filter( res => res.Country === Country);
      const dataAdCategories = await this.appService.appAdCategoriesfindAll().toPromise();
      //this.adCategories = dataAdCategories!.filter( res => res.active === true); //res.Country === Country && 
      this.adCategories = [];
    });
    /*
    const data = {
      Country: Country,
    };
    
    this.countryService.findAll().subscribe(res => {
      this.countries = res;  //console.log(res);
      this.myform.patchValue({
        Country: data.Country,
      });
      
      for(let item of  this.countries)
      {
        if(item._id ==  this.toolsService.country._id)
        {
          this.myform.patchValue({
            phonePrefix: item.phonePrefix,
          });
        }
      }
      //this.defaultStateCity();
    });

    this.stateCityService.findAllCountry(data).subscribe(res => {
      this.stateCitiesAll = res;  //console.log(res);
      //this.defaultStateCity();
    });

    this.adCategoryService.findAllCountry(data).subscribe(res => {
      this.adCategories = res;  //console.log(res);
    });
    */
  }

  async countryDefault0(Country: any)
  {
    const data = {
      Country: Country,
    };

    await this.appService.appCountryfindAll().toPromise();

    this.countryService.findAll().subscribe(res => {
     if(res.ok)
     {
      this.countries = res.data;  //console.log(res);
      this.myform.patchValue({
        Country: data.Country,
      });
     } else {
      this.countries = [];
     }
      
      for(let item of  this.countries)
      {
        // if(item._id ==  this.toolsService.country._id)
        // {
        //   this.myform.patchValue({
        //     phonePrefix: item.phonePrefix,
        //   });
        // }
      }
      //this.defaultStateCity();
    });

    this.stateCityService.findAllCountry(data).subscribe(res => {
      this.stateCitiesAll = res;  //console.log(res);
      //this.defaultStateCity();
    });

    const dataAdCategories = await this.adCategoryService.findAllCountry(data).toPromise();
    this.adCategories = dataAdCategories!.filter( res => res.active === true);
    // this.adCategoryService.findAllCountry(data).subscribe(res => {
    //   this.adCategories = res;  //console.log(res);
    // });

  }

  countryDefaultEdit(Country: any)
  {
      this.appService.appCountryfindAll().subscribe( async countries => {
      this.countries = countries;

      const dataStateCities = await this.appService.appStateCitiesfindAll().toPromise();
      this.stateCitiesAll = dataStateCities!.filter( res => res.Country === Country);
      const dataAdCategories = await this.appService.appAdCategoriesfindAll().toPromise();
      this.adCategories = dataAdCategories!.filter( res => res.Country === Country && res.active === true);
    });
    /*
    const data = {
      Country: Country,
    };
    
    this.countryService.findAll().subscribe(res => {
      this.countries = res;  //console.log(res);
      //this.defaultStateCity();
    });
    
    this.stateCityService.findAllCountry(data).subscribe(res => {
      this.stateCitiesAll = res;  //console.log(res);
    });

    this.adCategoryService.findAllCountry(data).subscribe(res => {
      this.adCategories = res;  //console.log(res);
    });
    */
  }

  async onCountry(e: any) {
    const data = {
      Country: e.target.value,
    };
    
    const country = this.countries!.find(res => res._id === data.Country);
    const dataStateCities = await this.appService.appStateCitiesfindAll().toPromise();
    this.stateCitiesAll = dataStateCities!.filter( res => res.Country === data.Country);
    const dataAdCategories = await this.appService.appAdCategoriesfindAll().toPromise();
    this.adCategories = dataAdCategories!.filter( res => res.Country === data.Country && res.active === true);
    /*
    this.stateCityService.findAllCountry(data).subscribe(res => {
      this.stateCitiesAll = res;  //console.log(res);
      //this.defaultStateCity();
    });

    this.adCategoryService.findAllCountry(data).subscribe(res => {
      this.adCategories = res;  //console.log(res);
    });
    */
    this.myform.patchValue({
      StateCity: "",
      CityZone: "",
      PostAdCategory: "",
      phonePrefix: country?.phonePrefix,
    });
  }

  onStateCity(e:any): void {
    if(this.myform.value.StateCity !== '')
    {
      this.queryStetecity(e.target.value);
      this.myform.patchValue({
        CityZone: ""
      });
    } else {
      this.myform.patchValue({
        StateCity: "",
        CityZone: ""
      });
    }
  }

  async queryStetecity(StateCityId: any)
  {
    const data = {
      StateCity: StateCityId
    };
   
    const dataCityZones = await this.appService.appCityZonesfindAll().toPromise();
    this.cityZones = dataCityZones!.filter( res => res.StateCity === data.StateCity);
    if(this.cityZones.length > 0) {
      this.swCityZones = false;
    } else {
      this.swCityZones = true;
      this.myform.patchValue({
        cityZoneSlug: ''
      });
    }
    /*
    this.cityZoneService.findAllStateCity(data).subscribe(res => {
      this.cityZones = res;  //console.log(res);
      if(this.cityZones.length > 0) {
        this.swCityZones = false;
      } else {
        this.swCityZones = true;
        this.myform.patchValue({
          cityZoneSlug: ''
        });
      }
    });
    */
  }

  onFileChange(event:any) {
    //console.log(event.target.files[0]);
    if(event.target.files && event.target.files[0])
    {
      var i =  0;
      for(let file of event.target.files) {
        var reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push({
            _id: '' + Date.now(),
            file: file,
            url: e.target.result
          }); 
        };
        reader.readAsDataURL(event.target.files[i]);

        i++;

      }
      //console.log(this.images);
    } 
  }

  deleteFile(file: any){
    this.images.splice(this.images.indexOf(file), 1);
    if(this.images.length == 0)
    {
      this.myform.patchValue({
        file: null
      });
    }
  }
 
  deleteImage(item: any): void {
    const data = {
      Ad: this.idPost,
      _id: item._id,
      key: item.key
    }
    this.postMediaService.deletePost(data).subscribe(res => {
      if(res)
      {
        this.selectedFiles.splice(this.selectedFiles.indexOf(item), 1);
        if(this.images.length == 0 && this.selectedFiles.length == 0)
        {
          this.myform.patchValue({
            file: null
          });
        }
      }
      }); 
  }

  findOne()
  {
    this.postAdService.findOne(this.idPost).subscribe(res => {
      //this.countryDefaultEdit2(res.Country?._id, );
      this.countryDefaultEdit(res.Country!._id, );
      this.myform.patchValue({
        PostAdCategory: res.PostAdCategory!._id,
        Country: res.Country!._id,
        StateCity: res.StateCity!._id,
        CityZone: res.CityZone ? res.CityZone!._id : '',
        address: res.address,
        postalCode: res.postalCode,
        zone: res.zone,
        age: res.age,
        title: res.title,
        description: res.description,
        phonePrefix: res.phonePrefix,
        phone: res.phone,
        whatsapp: res.whatsapp,
        telegram: res.telegram,
        //file: res.AdImages![0].url!
      });
      this.selectedFiles = res.PostMedia!;

      this.queryStetecity(res.StateCity!._id);
      //console.log(res.StateCity?._id);
     
    }); 
    
  }

  onSubmit(){
    if (this.myform.valid) {
      if(!this.idPost)
      {
         //console.log(this.myform.value);
        const files = [];

        for(let item of this.images)
        {
          //console.log(item.file);
          files.push(item.file);
        }
        const data = this.myform.getRawValue();
        if(!data.CityZone)
        {
          delete data.CityZone;
        } else {
          delete data.StateCity;
        }

        delete data.file;
        delete data.terms;
        data.planAt = Date.now();

        this.postAdService.create(data, files).subscribe(res => {
          //console.log(res);
          this.router.navigateByUrl('/panel/create/media/' + res._id);
        });
      } else {
         //console.log(this.myform.value);
        const files = [];

        for(let item of this.images)
        {
          //console.log(item.file);
          files.push(item.file);
        }
        const data = this.myform.getRawValue();
        
        if(!data.CityZone)
        {
          //delete data.CityZone;
        }
        /*
        if(!data.CityZone)
        {
          
        } else {
          delete data.StateCity;
        }
        */
        delete data.file;
        delete data.terms;
        data.planAt = Date.now();
        
        this.postAdService.update(this.idPost, data, files).subscribe(res => {
          //this.router.navigateByUrl('/panel/create/media/' + res.id);
          this.router.navigateByUrl('/panel/create/media/' + this.idPost);
        });
      }
    }
  }

}
