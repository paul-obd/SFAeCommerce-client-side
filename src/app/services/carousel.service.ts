import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CarouselImage } from '../models/carousel-image.model';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {


  carouselImages: CarouselImage[] = []

  carouselImagesFullPath: string[] = []

  constructor(private http: HttpClient) { }

  getAllCarouselImages(){
    return this.http.get<CarouselImage[]>(environment.apiUrl+ 'Carousel/carouesl-images'); 
  }
}
