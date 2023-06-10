import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostMedia, User } from 'src/app/interfaces';
import { SpinnerService } from 'src/app/library/spinner/spinner.service';
import { AuthService, PostMediaService, UserService } from 'src/app/services';

@Component({
  selector: 'app-personalization',
  templateUrl: './personalization.component.html',
  styleUrls: ['./personalization.component.scss']
})
export class PersonalizationComponent implements OnInit {

  myformCover: FormGroup;
  myformProfile: FormGroup;
  @Input() user: User;

  imagesCover: any[] = [];
  selectedFilesCover: any[] = [];
  imagesProfile: any[] = [];
  selectedFilesProfile: any[] = [];

  constructor(
    private fb: FormBuilder,
    public postMediaService: PostMediaService,
    private userService: UserService,
    public authService: AuthService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.createFormControls();
  }

  createFormControls() {
    //this.idPost = this.activatedRoute.snapshot.paramMap.get('id');
    this.myformCover = this.fb.group({
      //file: ['', !this.idPost? Validators.required : Validators.nullValidator],
      file: ['', Validators.required],
    });
    this.myformProfile = this.fb.group({
      //file: ['', !this.idPost? Validators.required : Validators.nullValidator],
      file: ['', Validators.required],
    });
  }

  /*****COVER */
  onFileCoverChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var i = 0;
      for (let file of event.target.files) {
        var reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagesCover.push({
            _id: '' + Date.now(),
            file: file,
            url: e.target.result
          });
        };
        reader.readAsDataURL(event.target.files[i]);

        i++;

      }
    }
  }

  deleteImageCover(file: any) {
    this.imagesCover.splice(this.imagesCover.indexOf(file), 1);
    if (this.imagesCover.length == 0) {
      this.myformCover.patchValue({
        file: null
      });
    }
  }

  deleteFileCover(item: any): void {
    this.spinnerService.start();
    const data = {
      User: this.authService.user._id,
      _id: item._id,
      key: item.key
    }

    this.postMediaService.deleteCover(data).subscribe(res => {
      if (res) {
        this.imagesCover = [];
        this.myformCover.patchValue({
          file: null
        });
        this.user = res;
        this.spinnerService.close();
      }
    });
  }

  onSubmitCover() {
    if (this.myformCover.valid) {
      this.spinnerService.start();

      const data = this.myformCover.getRawValue();

      delete data.file;

      // for(let item of this.imagesCover)
      // {
      //   console.log(item.file);

      // }

      const files = [this.imagesCover[0].file];
      this.userService.cover(data, files).subscribe(res => {
        if (res) {
          this.user = res;
          this.imagesCover= [];
          this.selectedFilesCover = this.user.Cover!;
          this.spinnerService.close();
        }
      });
    }
  }

  /*****PROFILE */
  onFileProfileChange(event: any) {
    console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      var i = 0;
      for (let file of event.target.files) {
        var reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagesProfile.push({
            _id: '' + Date.now(),
            file: file,
            url: e.target.result
          });
        };
        reader.readAsDataURL(event.target.files[i]);

        i++;

      }
    }
  }

  deleteImageProfile(file: any) {
    this.imagesProfile.splice(this.imagesProfile.indexOf(file), 1);
    if (this.imagesProfile.length == 0) {
      this.myformProfile.patchValue({
        file: null
      });
    }
  }

  deleteFileProfile(item: any): void {
    this.spinnerService.start();
    const data = {
      User: this.authService.user._id,
      _id: item._id,
      key: item.key
    }
    this.postMediaService.deleteProfile(data).subscribe(res => {
      if (res) {
        this.myformProfile.patchValue({
          file: null
        });
        this.imagesProfile = [];
        this.user = res;
        this.spinnerService.close();
      }
    });
  }

  onSubmitProfile() {
    if (this.myformProfile.valid) {
      this.spinnerService.start();
      const data = this.myformProfile.getRawValue();
      delete data.file;
      const files = [this.imagesProfile[0].file];
      this.userService.profile(data, files).subscribe(res => {
        if (res) {
          this.user = res;
          this.imagesProfile = [];
          this.spinnerService.close();
        }
      }

      );
    } else {

    }
    //}
  }

}

