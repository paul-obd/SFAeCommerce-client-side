import { Component, OnInit } from '@angular/core';
import { Item } from '../models/Item.model';
import { ItemsService } from '../services/items.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.css']
})
export class SortByComponent implements OnInit {

  constructor(public itemsService: ItemsService, public loadService: LoadingService) { }

  ngOnInit(): void {
  }

  sortItems(){
    this.loadService.loadSpinner = true
    if (this.itemsService.searchVar != null && this.itemsService.searchMode == true) {
      this.itemsService.searchScrolledTimes = 1
      this.itemsService.items = []
      this.getSearchItemsWithPagination()
    }
    else if (this.itemsService.filterAttributeValuesCode.length > 0) {
      this.itemsService.items = []
      this.itemsService.filterScrollerTimes = 1
      this.getFilteredItemsOnlyByAttrValueWithPagination()

    }
    else {
      this.initItems()

    }
  }

  getSearchItemsWithPagination(){
    this.itemsService.searchScrolledTimes = 1
    this.itemsService.searchAnItemWithPag().subscribe(
      (res: Item[])=>{
        this.itemsService.items = []
        this.itemsService.items = res
        this.itemsService.searchScrolledTimes = 2
        this.loadService.loadSpinner = false
      }
    )
    
  }


  getFilteredItemsOnlyByAttrValueWithPagination(){
    this.itemsService.filterScrollerTimes = 1
    this.itemsService.getFilteredItemsOnlyByAttrValue().subscribe(
      (res: Item[])=>{
        this.itemsService.items = []
        this.itemsService.items = res
        this.itemsService.filterScrollerTimes = 2
        this.loadService.loadSpinner = false
      }
    )

  }

  initItems(){
    this.itemsService.scrolledTimes = 1
    this.itemsService.getItemsPagination().subscribe(
      (res: Item[])=>{
        this.itemsService.items = []
        this.itemsService.items = res
        this.itemsService.scrolledTimes = 2
        this.loadService.loadSpinner = false
      }
    )

  }
}
