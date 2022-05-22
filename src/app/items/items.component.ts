import { Component, OnDestroy, OnInit } from '@angular/core';
import { AttributeValue } from '../models/attribute-value.model';
import { Item } from '../models/Item.model';
import { AttributeValueService } from '../services/attribute-value.service';
import { ItemsService } from '../services/items.service';
import { LoadingService } from '../services/loading.service';
import { ResponsiveService } from '../services/responsive.service';
import { ToolbarService } from '../services/toolbar.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, OnDestroy {

  constructor(public itemsService: ItemsService, 
    public toolbarService: ToolbarService,
     public loadingService: LoadingService, 
     private attributeValueService: AttributeValueService,
     public responsiveService: ResponsiveService) {


  }


  ngOnDestroy(): void {
    this.toolbarService.ouOfHome = true
  }

  ngOnInit(): void {

    this.toolbarService.ouOfHome = false
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

  initItems() {
    this.loadingService.loadBar = true
    this.itemsService.scrolledTimes = 1
    this.itemsService.getItemsPagination().subscribe(
      (res: Item[]) => {
        this.itemsService.items = []
        this.itemsService.items = res as Item[]
        this.itemsService.scrolledTimes = 2
        this.loadingService.loadBar = false
      }
    )
  }

  onScroll() {
    
 
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
      this.loadingService.paginationLoad == true
  
       
  
      if (this.itemsService.searchVar !== null && this.itemsService.searchVar !== '' && this.itemsService.searchVar !== undefined) {
       
        this.getSearchItemsWithPagination()

      }

      else if (this.itemsService.filterAttributeValuesCode.length > 0) {
      
        this.getFilteredItemsOnlyByAttrValueWithPagination()

      }

      else {
     
        this.getItemsWithPagination()
         
    
      }

      

    }
  }


  getItemsWithPagination() {
    this.itemsService.getItemsPagination().subscribe(
      (res: Item[]) => {
        res.forEach(item => {
          this.itemsService.items.push(item)
        });
      }
    )


    this.itemsService.scrolledTimes += 1
    this.loadingService.paginationLoad = false
  }

  getFilteredItemsOnlyByAttrValueWithPagination() {
    this.itemsService.getFilteredItemsOnlyByAttrValue().subscribe(
      (res: Item[]) => {
        res.forEach(item => {
          this.itemsService.items.push(item)
        });
      }
    )

    this.itemsService.filterScrollerTimes += 1
    this.loadingService.paginationLoad = false
  }





  getSearchItemsWithPagination() {

    this.itemsService.searchAnItemWithPag().subscribe(
      (res: Item[]) => {
        res.forEach(item => {
          this.itemsService.items.push(item)
        });
      }
    )
    this.itemsService.searchScrolledTimes += 1
    this.loadingService.paginationLoad = false
  }
}
