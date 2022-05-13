import { Component, Inject, OnInit } from '@angular/core';
import { ToolbarService } from '../services/toolbar.service';
import { DOCUMENT, Location } from '@angular/common'
import { LoadingService } from '../services/loading.service';
import { ItemsService } from '../services/items.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {


  full: boolean = false

  elem: any;

  constructor(public toolbarService: ToolbarService, private location: Location, 
    public loadingService: LoadingService,
    public itemsService: ItemsService,
    @Inject(DOCUMENT) private document: any) { }

  ngOnInit(): void {
    this.elem = this.document.documentElement;
  }

  back(){
    this.location.back()
  }
  openSearch(){
    this.itemsService.openSearch = true
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
    this.full = true
  }

   /* Close fullscreen */
   closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
    this.full = false
  }
}
