import { Component, OnInit } from '@angular/core';
import { CarouselImage } from '../models/carousel-image.model';
import { CarouselService } from '../services/carousel.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor(public carouselService: CarouselService) { }

  ngOnInit(): void {
    this.getCarouselImages()
  }

  getCarouselImages(){
    this.carouselService.getAllCarouselImages().subscribe(
      (res: CarouselImage[])=>{
        this.carouselService.carouselImages = res
        this.carouselService.carouselImages.forEach(ci => {
          let fullPath = ci.basePath+ci.folderPath+'/'+ci.physicalFileName
          this.carouselService.carouselImagesFullPath.push(fullPath)
        });
        console.log(this.carouselService.carouselImagesFullPath)
      }
    )
  }

}
