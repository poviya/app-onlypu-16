import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileMedia, PostMedia } from 'src/app/interfaces';
import { PostAdService, PostMediaService } from 'src/app/services';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  myform: FormGroup;

  isBrowser: boolean;

  idPost: string | null;
  
  images : FileMedia[] = [];
  selectedFiles: FileMedia[] = [];

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public postMediaService: PostMediaService,
    public postAdService: PostAdService,
  ) { }

  ngOnInit(): void {
    this.createFormControls();
    //this.findAllCountryCity();
   
    //this.findAllQueryCategories();
    this.idPost = this.activatedRoute.snapshot.paramMap.get('id');  console.log(this.idPost)
    if(this.idPost || this.idPost !== 'undefined')
    {
      this.findOne();
    } else {
      
    }
  }

  createFormControls() {
    this.idPost = this.activatedRoute.snapshot.paramMap.get('id');
    this.myform = this.fb.group({
      file: ['', !this.idPost? Validators.required : Validators.nullValidator],
     });
  }

  findOne()
  {
    this.postAdService.findOne(this.idPost).subscribe(res => {
      if(res)
      {
        this.selectedFiles = res.PostMedia!;
      } else {
        this.router.navigate(['/panel/create/details/']);
      }
    });
  }

  onFileChange(event:any) {
    console.log(event.target.files[0].type);
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
      console.log(this.images);
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
      Post: this.idPost,
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

  onSubmit(){
    if (this.myform.valid) {
      if(this.idPost)
      {
         //console.log(this.myform.value);
 
         const data = this.myform.getRawValue();
         
         delete data.file;
         data.planAt = Date.now();
         data.Post = this.idPost;
         
         for(let item of this.images)
         {
           //console.log(item.file);
           const files = [
            item.file
           ];
           this.postAdService.media(data, files).subscribe(res => {
          });
         }
        this.router.navigateByUrl('/panel/create/promote/' + this.idPost);
      } else {
        
      }
    }
  }

}
