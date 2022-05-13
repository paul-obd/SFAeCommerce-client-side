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
  

  // filterAttr: string;
  // filterAttrValue: string;
  filterScrollerTimes: number = 1;
  filterAttributeValuesCode: string[] = []
  //filteredItems: Item[] = [];


  searchVar: string;
  searchScrolledTimes: number = 1;
 // searchItems: Item[] = []
  searchMode: boolean = false
  openSearch: boolean = false


  sortBy: string = "none"

  // putItemInTable(){
  //   console.log("labib")
  //   this.tableItems = []
  //   this.items.forEach(item => {
  //     let newItem  = {
  //       ...item,
  //       orderQuantity: 1
  //     }
  //     this.tableItems.push(newItem)
  //   });
  // }



  
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

  // getFilteredItemsWithAttrAndAttrValue(){
  //   return this.http.get<Item[]>(environment.apiUrl+ `Items/items-by-attribute-and-attribute-value/${this.filterAttr}/${this.filterAttrValue}?scrolledTimes=${this.filterScrollerTimes}&itemsNumber=${this.itemsNumber}`)
  // }

  // getFilteredItemsOnlyByAttr(){
  //   return this.http.get<Item[]>(environment.apiUrl+ `Items/items-by-attribute/${this.filterAttr}?scrolledTimes=${this.filterScrollerTimes}&itemsNumber=${this.itemsNumber}`)
  // }

  // findAllFilteredItemsAndDelete(filterValue: any){
  //   this.items.forEach(item=>{
  //      if (this.items[0]) {
         
  //      }
  //   })
  // }

  
}
