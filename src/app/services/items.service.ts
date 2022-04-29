import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Item } from '../models/Item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {


  items: Item[] = []
  scrolledTimes: number = 1;
  itemsNumber: number = 12;
  
  filterAttr: string;
  filterAttrValue: string;
  filterScrollerTimes: number = 1;
  //filteredItems: Item[] = [];


  searchVar: string;
  searchScrolledTimes: number = 1;
 // searchItems: Item[] = []
  searchMode: boolean = false
  openSearch: boolean = false

  
  constructor(private http: HttpClient) { }
   
  getItemsPagination(){
    return this.http.get<Item[]>(environment.apiUrl+ `items/all-items?scrolledTimes=${this.scrolledTimes}&itemsNumber=${this.itemsNumber}`  )
  }

  getFilteredItemsOnlyByAttrValue(){
    return this.http.get<Item[]>(environment.apiUrl+`Attributes/attribute-value-entity/${this.filterAttrValue}?scrolledTimes=${this.filterScrollerTimes}&itemsNumber=${this.itemsNumber}`)
  }

  getItemByItemCode(itemCode: string){
    return this.http.get<Item>(environment.apiUrl+'items/item/'+ itemCode)
  }

  searchAnItemWithPag(){
    return this.http.get<Item[]>(environment.apiUrl+ `Items/search/${this.searchVar}?scrolledTimes=${this.searchScrolledTimes}&itemsNumber=${this.itemsNumber}`)
  }

  getFilteredItemsWithAttrAndAttrValue(){
    return this.http.get<Item[]>(environment.apiUrl+ `Items/items-by-attribute-and-attribute-value/${this.filterAttr}/${this.filterAttrValue}?scrolledTimes=${this.filterScrollerTimes}&itemsNumber=${this.itemsNumber}`)
  }

  getFilteredItemsOnlyByAttr(){
    return this.http.get<Item[]>(environment.apiUrl+ `Items/items-by-attribute/${this.filterAttr}?scrolledTimes=${this.filterScrollerTimes}&itemsNumber=${this.itemsNumber}`)
  }

  
}
