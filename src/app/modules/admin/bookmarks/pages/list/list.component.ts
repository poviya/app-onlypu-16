import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tools } from 'src/app/common/tools';
import { Post } from 'src/app/interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() posts: Post[];
  
  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  onEdit(id: string): void {
    this.router.navigate(['/panel/create/details/' + id]);
  }

  onPromote(id: string): void {
    this.router.navigate(['/panel/create/promote/' + id]);
  }

  prinImages(images: any) 
  { 
    return images[0]['url'];
  };

  textMessage(item: Post)
  {
    return "Hola, acabo de ver tu anuncio en Onlypu.com, "
            + Tools.cropText(item.title!, 25) + '(...)' + 
            ", me gustaría hacer le delicioso contigo."
            + " https://onlypu.com/" + item.slug;
  }
}
