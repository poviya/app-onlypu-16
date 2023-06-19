import { Component, ViewChild, ElementRef, Input, OnInit, OnChanges } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileMedia, PostMedia } from 'src/app/interfaces';
import { AuthService, PostService, AudioRecordingService } from 'src/app/services/index';
import { NumericValidator, PricePostValidator } from 'src/app/common/custom-validators.ts';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { DomSanitizer } from "@angular/platform-browser";
import { SpinnerService } from 'src/app/library/spinner/spinner.service';
import { ToastService } from 'src/app/library/toast/toast.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  isRecording = false;
  recordedTime: any;
  blobUrl: any;
  teste: any;

  @ViewChild('videoElement') public videoElement: ElementRef;
  @Input('snapshotName') public snapshotName: string;
  @Input('downloadImageType') public userImageType: string;

  @Input() idPost: string | null;

  public videoUrl: any;
  public videoLoaded = false;
  public loadingState = false;
  public fileSelected = false;

  public imageTypes = ['JPG', 'PNG', 'BMP', 'TIFF', 'GIF', 'PPM', 'PGM', 'PBM', 'PNM', 'WebP', 'HEIF', 'BPG', 'ECW', 'FITS', 'FLIP', 'PAM', 'CD5', 'CPT', 'PSD', 'PSP', 'XCF', 'PDN'];
  myform: FormGroup;
  filesArray: any = [];
  filesData: any = [];

  filesVideo: any;
  filesVideoArray: any;

  filesVideoSnapshot: any;
  filesVideoSnapshotArray: any;
  videoPresentationUrl: any = null;

  selectedFilesProfile: FileMedia[] = [];

  @ViewChild('player') videoPlayer: ElementRef;
  @ViewChild('btnPlayPause') btnPlayPause: HTMLButtonElement;
  @ViewChild('btnMute') btnMute: HTMLButtonElement;
  @ViewChild('progressBar') progressBar: ElementRef;
  @ViewChild('volumeBar') volumeBar: ElementRef;

  // controls video
  swPlayPause = true;
  swMute = true;
  imageBase64 = '';

  imgResult: string = '';

  typeViewArray = [
    //{name: 'payment', value: 'PAYMENT'},
    { name: 'suscribers', value: 'SUBSCRIBERS' },
    { name: 'free', value: 'FREE' }
  ]

  //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  progressInfo: any = []
  //Mensaje que almacena la respuesta de las Apis
  message: any = '';

  filesImages: any = [];
  filesImagesArray: any = [];

  selectedFiles: FileMedia[] = [];

  mediaButton: boolean = true;
  imagesButton: boolean = false;
  videoButton: boolean = false;

  swPrice: boolean = true;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private postService: PostService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinnerService: SpinnerService,
    private audioRecordingService: AudioRecordingService,
    private sanitizer: DomSanitizer,
    private toastService: ToastService
  ) {

    this.audioRecordingService
      .recordingFailed()
      .subscribe(() => (this.isRecording = false));
    this.audioRecordingService
      .getRecordedTime()
      .subscribe(time => (this.recordedTime = time));
    this.audioRecordingService.getRecordedBlob().subscribe(data => {
      this.teste = data;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)
      );
    });

    this.router.events
      .pipe(filter((routerEvent) => routerEvent instanceof ActivationEnd))
      .subscribe((routerEvent: ActivationEnd | any) => {
        const data = routerEvent.snapshot.data;
        if (data?.someId) {
          console.log('someId', data.someId);
        }
      });
  }

  ngOnInit(): void {
    this.idPost = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.idPost) {
      this.findOne();
    }
    this.createFormControls();
  }

  ngOnChanges() {

  }

  createFormControls() {
    //this.idPost = this.activatedRoute.snapshot.paramMap.get('id');
    this.myform = this.fb.group({
      //file: ['', !this.idPost? Validators.required : Validators.nullValidator],
      fileVideo: ['', Validators.nullValidator],
      fileImages: ['', Validators.nullValidator],
      //filePromotional: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', Validators.required],
      typeView: ['SUBSCRIBERS', Validators.required],
      credit: [1, [Validators.required, PricePostValidator, NumericValidator]],
      comment: [true, Validators.nullValidator],
    });

    if (this.myform.value.typeView == 'PAYMENT') {

      this.swPrice = true;
    } else {
      this.swPrice = false;
    }
  }

  public readUrl(event: any,) { //linkUrl: any
    //console.log( event.target.files[0]);

    this.mediaButton = false;
    this.imagesButton = false;
    this.videoButton = true;

    //linkUrl.value = '';
    this.loadingState = true;
    this.videoLoaded = false;
    this.fileSelected = false;
    //this.filesData = [];
    //this.filesArray = [];

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (data: any) => {
        this.playVideo(data.target.result);
        const mimetype = event.target.files[0].type.split('/')[1];
        const name = `${Date.now()}`;
        const myNewFile = new File([event.target.files[0]], `${name}.${mimetype}`, { type: event.target.files[0].type });

        this.filesVideo = myNewFile;
        this.filesVideoArray = {
          _id: `${name}`,
          type: 'ORIGINAL'
        }
        //  this.filesData.push(
        //     myNewFile
        //   ); 
        //   this.filesArray.push(
        //     {
        //       _id: `${name}`,
        //       type: 'ORIGINAL'
        //     }
        //   )
      };
      reader.readAsDataURL(event.target.files[0]);

    }

  }

  public getLink(linkUrl: any, fileElement: any) {
    fileElement.value = '';
    if (linkUrl.value.trim() !== '') {
      this.loadingState = true;
      this.videoLoaded = false;
      this.http.get(linkUrl.value.trim(), { responseType: 'blob' }).subscribe((res) => {
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onload = (data: any) => {
          this.playVideo(data.target.result);
        };
      },
        (err) => {
          linkUrl.value = '';
          alert('Invalid URL');
          this.loadingState = false;
          this.videoLoaded = false;
        }
      );
    }
  }
  public takeSnapshot() {

    if (this.videoElement) {
      const canvasElement = <HTMLCanvasElement>document.createElement('CANVAS');
      const video = this.videoElement.nativeElement!;
      const context = canvasElement.getContext('2d');
      let w: number, h: number, ratio: number;
      ratio = video.videoWidth / video.videoHeight;
      w = video.videoWidth - 100;
      h = w / ratio;
      canvasElement.width = w;
      canvasElement.height = h;
      context!.fillRect(0, 0, w, h);
      context!.drawImage(video, 0, 0, w, h);
      const link = document.createElement('a');
      this.snapshotName = this.snapshotName !== '' ? this.snapshotName : 'snapshot';
      this.userImageType = this.imageTypes.indexOf(this.userImageType.toUpperCase()) >= 0 ? this.userImageType.toUpperCase() : 'PNG';
      link.setAttribute('download', this.snapshotName + '.' + this.userImageType);
      const dataURL = canvasElement.toDataURL();
      this.imageBase64 = dataURL;
      link.href = dataURL;
      document.body.appendChild(link);
      // const imgFile = new File([dataURL], 'MyFileName.png', {
      //   type: 'image/png',
      //   lastModified: new Date().getTime()
      // });
      // this.fileArray.push({
      //   _id: '' + Date.now(),
      //   file: imgFile,
      //   url: dataURL
      // });
      // console.log(this.fileArray);
      //link.click();
    }
  }
  public playVideo(url: any) {
    this.fileSelected = true;
    this.videoUrl = url;
    if (this.videoElement !== undefined) {
      this.videoElement.nativeElement.load();
    }
    this.loadingState = false;
    this.videoLoaded = true;
  }

  setVolume() {
    this.videoPlayer.nativeElement.volume = parseInt(this.volumeBar.nativeElement.value);
  }

  playPauseVideo() {
    if (this.videoPlayer.nativeElement.paused || this.videoPlayer.nativeElement.ended) {
      // Change the button to a pause button
      this.changeButtonType(this.btnPlayPause, 'pause');
      this.videoPlayer.nativeElement.play();
      this.swPlayPause = false;
    }
    else {
      // Change the button to a play button
      this.changeButtonType(this.btnPlayPause, 'play');
      this.videoPlayer.nativeElement.pause();
      this.swPlayPause = true;
    }
  }

  // Stop the current media from playing, and return it to the start position
  stopVideo() {
    this.videoPlayer.nativeElement.pause();
    if (this.videoPlayer.nativeElement.currentTime) this.videoPlayer.nativeElement.currentTime = 0;
  }

  // Toggles the media player's mute and unmute status
  muteVolume() {
    if (this.videoPlayer.nativeElement.muted) {
      // Change the button to a mute button
      this.changeButtonType(this.btnMute, 'mute');
      this.videoPlayer.nativeElement.muted = false;
      this.swMute = true;
    }
    else {
      // Change the button to an unmute button
      this.changeButtonType(this.btnMute, 'unmute');
      this.videoPlayer.nativeElement.muted = true;
      this.swMute = false;
    }
  }

  // Replays the media currently loaded in the player
  replayVideo() {
    this.resetPlayer();
    this.videoPlayer.nativeElement.play();
  }

  // Update the progress bar
  updateProgressBar() {
    // Work out how much of the media has played via the duration and currentTime parameters
    var percentage = Math.floor((100 / this.videoPlayer.nativeElement.duration) * this.videoPlayer.nativeElement.currentTime);
    // Update the progress bar's value
    this.progressBar.nativeElement.value = percentage;
    // Update the progress bar's text (for browsers that don't support the progress element)
    this.progressBar.nativeElement.innerHTML = percentage + '% played';
  }
  seek(e: any) {
    var percent = e.offsetX / this.progressBar.nativeElement.offsetWidth;
    this.videoPlayer.nativeElement.currentTime = percent * this.videoPlayer.nativeElement.duration;
    e.target.value = Math.floor(percent / 100);
    e.target.innerHTML = this.progressBar.nativeElement.value + '% played';
  }

  // Updates a button's title, innerHTML and CSS class
  changeButtonType(btn: any, value: any) {
    btn.title = value;
    btn.innerHTML = value;
    btn.className = value;
  }

  resetPlayer() {
    this.progressBar.nativeElement.value = 0;
    // Move the media back to the start
    this.videoPlayer.nativeElement.currentTime = 0;
    // Set the play/pause button to 'play'
    this.changeButtonType(this.btnPlayPause, 'play');
  }

  /** GIF */
  public readPresentation(event: any,) { //linkUrl: any
    //console.log( event.target.files[0]);

    //linkUrl.value = '';
    // this.loadingState = true;
    // this.videoLoaded = false;
    // this.fileSelected = false;

    //this.filesData = [];
    //this.filesArray = [];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (data: any) => {
        const mimetype = event.target.files[0].type.split('/')[1];
        const name = `${Date.now()}`;
        const myNewFile = new File([event.target.files[0]], `${name}.${mimetype}`, { type: event.target.files[0].type });

        this.filesVideoSnapshot = myNewFile;
        this.filesVideoSnapshotArray = {
          _id: `${name}`,
          type: 'SNAPSHOT'
        }

        // this.filesData.push(
        //   myNewFile
        // ); 
        // this.filesArray.push(
        //   {
        //     _id: `${name}`,
        //     type: 'SNAPSHOT'
        //   }
        // )
        this.videoPresentationUrl = data.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  onSubmit() {
    this.takeSnapshot();
    if (this.myform.valid && this.authService.user) {
      this.spinnerService.start();
      this.filesArray = [];
      this.filesData = [];

      //const data = this.myform.getRawValue();

      //delete data.fileImages;
      //delete data.fileVideo;

      // delete data.filePromotional;

      // this.filesData.push(
      //     this.filesVideo
      // ); 
      // this.filesArray.push(
      //  this.filesVideoArray
      // )

      // this.filesData.push(
      //   this.filesVideoSnapshot
      // ); 
      // this.filesArray.push(
      //   this.filesVideoSnapshotArray
      // )

      if (this.videoButton)
      //convert snapshot:
      {
        const name = `${Date.now()}`;
        this.filesVideoSnapshot = this.dataURLtoFile(this.imageBase64, `${name}.png`);
        this.filesVideoSnapshotArray = {
          _id: `${name}`,
          type: 'SNAPSHOT'
        };

        this.filesData.push(
          this.filesVideo
        );
        this.filesArray.push(
          this.filesVideoArray
        )

        this.filesData.push(
          this.filesVideoSnapshot
        );
        this.filesArray.push(
          this.filesVideoSnapshotArray
        )
      } else if (this.imagesButton) {
        for (let item of this.filesImagesArray) {
          delete item.url;
        }

        this.filesData = this.filesImages;
        this.filesArray = this.filesImagesArray;
      }

      console.log('filesData', this.filesData)
      console.log('filesArray', this.filesArray);

      const data = {
        filesArray: this.filesArray,
        title: this.myform.value.title,
        description: this.myform.value.description,
        credit: this.myform.value.credit,
        comment: this.myform.value.comment,
        typeView: this.myform.value.typeView
      }

      console.log('data', data);

      this.imagesButton = false;
      this.mediaButton = true;
      this.videoButton = false;
      this.filesImages = [];
      this.filesImagesArray = [];
      this.filesVideo = null;
      this.filesVideoArray = null;
      this.filesVideoSnapshot = null;
      this.filesVideoSnapshotArray = null;

      this.postService.create(data, this.filesData).subscribe(res => {
        if (res) {
          this.createFormControls();
          this.onDiscard();
          this.spinnerService.close();
          console.log('repuesta', res);
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/pu/' + res.slug]);
        }
      },(error) => {
        this.spinnerService.close();
        this.toastService.start('pleaseTryAgain');
        setTimeout(() => this.toastService.close(), 2000);
      });
    }
  }

  onUpdate(): void {
    this.spinnerService.start();
    if (this.myform.valid && this.authService.user && this.idPost) {
      const data = {
        title: this.myform.value.title,
        description: this.myform.value.description,
        credit: Number(this.myform.value.credit),
        comment: this.myform.value.comment,
        typeView: this.myform.value.typeView
      }
      console.log(data);
      this.postService.update(this.idPost, data).subscribe(res => {
        this.onDiscard();
        this.spinnerService.close();
        console.log('repuesta', res);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/pu/' + res.slug]);
      },(error) => {
        this.spinnerService.close();
        this.toastService.start('pleaseTryAgain');
        setTimeout(() => this.toastService.close(), 2000);
      });
    }
  }

  onDiscard() {
    this.videoUrl = null;
    this.videoLoaded = false;
    this.loadingState = false;
    this.fileSelected = false;
    this.filesData = [];
    this.createFormControls();
  }

  dataURLtoFile(dataurl: any, filename: any) {

    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }


  // upload file
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var i = Number(0);
      for (let file of event.target.files) {
        const name = `${Date.now()}`;
        var reader = new FileReader();
        reader.onload = (e: any) => {
          this.filesImagesArray.push({
            _id: `${name}`,
            typeFile: file.type.split('/'),
            url: e.target.result,
            type: 'ORIGINAL',
          });
        };
        reader.readAsDataURL(event.target.files[i]);
        const mimetype = event.target.files[i].type.split('/')[1];
        const myNewFile = new File([event.target.files[i]], `${name}.${mimetype}`, { type: event.target.files[i].type });
        this.filesImages.push(myNewFile);

        i++;

      }
      this.mediaButton = false;
      this.imagesButton = true;
      this.videoButton = false;

      //console.log(this.filesImages);
      //console.log(this.filesImagesArray);
    }
  }

  deleteImage(file: any) {

    this.filesImages = this.filesImages.filter((item: any) => item.name.split('.')[0] !== file._id);
    this.filesImagesArray = this.filesImagesArray.filter((item: any) => item._id !== file._id);
    //this.filesImages.splice(this.filesImages.indexOf(file), 1);
    //this.filesImagesArray.splice(this.filesImagesArray.indexOf(file), 1);

    if (this.filesImagesArray.length == 0) {
      this.imagesButton = false;
      this.mediaButton = true;
      this.videoButton = false;
      this.myform.patchValue({
        fileImages: null,
        fileVideo: null
      });
    }

    //console.log(this.filesImages);
    //console.log(this.filesImagesArray);
  }

  deleteFile(item: any): void {
  }

  deleteVideo(): void {
    this.imagesButton = false;
    this.mediaButton = true;
    this.videoButton = false;

    this.filesVideo = null;
    this.filesVideoArray = null;

    this.filesVideoSnapshot = null;
    this.filesVideoSnapshotArray = null;

    this.myform.patchValue({
      fileImages: null,
      fileVideo: null
    });
  }

  onTypeView(e: any) {
    this.myform.patchValue({
      credit: 1
    });
    if (e.target.value == 'PAYMENT') {

      this.swPrice = true;
    } else {
      this.swPrice = false;
    }
  }

  findOne() {
    this.postService.findOne(this.idPost).subscribe(res => {
      //this.countryDefaultEdit2(res.Country?._id, );
      this.myform.patchValue({
        // PostAdCategory: res.PostAdCategory!._id,
        // Country: res.Country!._id,
        // StateCity: res.StateCity!._id,
        // CityZone: res.CityZone ? res.CityZone!._id : '',
        // address: res.address,
        // postalCode: res.postalCode,
        // zone: res.zone,
        // age: res.age,
        title: res.title,
        description: res.description,
        credit: Number(res.credit),
        comment: res.comment,
        typeView: res.typeView
        // phonePrefix: res.phonePrefix,
        // phone: res.phone,
        // whatsapp: res.whatsapp,
        // telegram: res.telegram,
        //file: res.AdImages![0].url!
      });

      if (res.typeView == 'PAYMENT') {
        this.swPrice = true;
      } else {
        this.swPrice = false;
      }
      this.selectedFiles = res.PostMedia!;

    });

  }

  /** audio */
  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

  download(): void {
    const url = window.URL.createObjectURL(this.teste.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = this.teste.title;
    link.click();
  }
}

