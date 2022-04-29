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
  attributeValues: AttributeValue[] = []

  constructor(private http: HttpClient, private itemsService: ItemsService) {

   }



  getAttributes(){
    return this.http.get<Attribute[]>(environment.apiUrl + 'Attributes/attributes')
  }

  getAttrValuesWhereAttr(){
    return this.http.get<AttributeValue[]>(environment.apiUrl+ 'Attributes/attribute-values/' +this.itemsService.filterAttr )
  }

  getAttrValues(){
    return this.http.get<AttributeValue[]>(environment.apiUrl+ 'Attributes/attribute-values')
  }



}
