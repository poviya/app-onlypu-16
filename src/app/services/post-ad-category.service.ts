import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostAdCategory } from '../interfaces/adCategory';
import { ToolsService } from './tools.service';

@Injectable({
  providedIn: 'root'
})
export class AdCategoryService {
 
  url = 'post-ad-category';
  
  constructor(
    private http: HttpClient,
    private toolsService: ToolsService
  ) 
  { 
    
  }

  findAllCountry(dataQuery: any): Observable<any[]> {

    return this.http.post<PostAdCategory[]>(environment.api + this.url + '/country', dataQuery);
  }

}
