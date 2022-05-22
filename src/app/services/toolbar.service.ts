import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {


  ouOfHome: boolean = false;

  lang: string = "en"

  constructor() { }
}
