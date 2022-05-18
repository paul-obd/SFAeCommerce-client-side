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

  tableItems: Item[] = []
  

  filterScrollerTimes: number = 1;
  filterAttributeValuesCode: string[] = []



  searchVar: string;
  searchScrolledTimes: number = 1;

  searchMode: boolean = false
  openSearch: boolean = false


  sortBy: string = "none"




  
  constructor(private http: HttpClient) { }
   
  getItemsPagination(){
    return this.http.get<Item[]>(environment.apiUrl+ `items/all-items?sortBy=${this.sortBy}&scrolledTimes=${this.scrolledTimes}&itemsNumber=${this.itemsNumber}`  )
  }

  getFilteredItemsOnlyByAttrValue(){
    return this.http.post<Item[]>(environment.apiUrl+`Attributes/attribute-value-entity/?sortBy=${this.sortBy}&scrolledTimes=${this.filterScrollerTimes}&itemsNumber=${this.itemsNumber}`, this.filterAttributeValuesCode)
  }

  getItemByItemCode(itemCode: string){
    return this.http.get<Item>(environment.apiUrl+'items/item/'+ itemCode)
  }

  searchAnItemWithPag(){
    return this.http.get<Item[]>(environment.apiUrl+ `Items/search/${this.searchVar}?sortBy=${this.sortBy}&scrolledTimes=${this.searchScrolledTimes}&itemsNumber=${this.itemsNumber}`)
  }



  
}
