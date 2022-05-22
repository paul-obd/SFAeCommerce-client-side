import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AttributeValue } from '../models/attribute-value.model';
import { Attribute } from '../models/attribute.model';
import { ItemsService } from './items.service';

@Injectable({
  providedIn: 'root'
})
export class AttributeValueService {

  attributeFilter: string;
  attributes: Attribute[] = [];

  constructor(private http: HttpClient, private itemsService: ItemsService) {

   }

  getAttributes(){
    return this.http.get<Attribute[]>(environment.apiUrl + 'Attributes/attributes')
  }


  getAttrValues(){
    return this.http.get<AttributeValue[]>(environment.apiUrl+ 'Attributes/attribute-values')
  }


  searchAttributeValues(attrCode: string, searchAttrValue: string){
    return this.http.get<AttributeValue[]>(environment.apiUrl+ `Attributes/search-attribute-values?attrCode=${attrCode}&searchAttrValue=${searchAttrValue}`)
  }



}
