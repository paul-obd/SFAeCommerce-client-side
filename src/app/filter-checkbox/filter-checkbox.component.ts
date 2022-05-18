import { Component, Input, OnInit } from '@angular/core';
import { AttributeValue } from '../models/attribute-value.model';
import { Item } from '../models/Item.model';
import { AttributeValueService } from '../services/attribute-value.service';
import { ItemsService } from '../services/items.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-filter-checkbox',
  templateUrl: './filter-checkbox.component.html',
  styleUrls: ['./filter-checkbox.component.css']
})
export class FilterCheckboxComponent implements OnInit {

  @Input() attrValue: AttributeValue

  checked: boolean = false

  constructor(private itemsService: ItemsService, private attributeValueService: AttributeValueService, public loadingService: LoadingService) { }

  ngOnInit(): void {
  }


  getOrRemoveItems(){
    console.log(this.attrValue)
    if ( this.itemsService.searchMode == true) {
      this.itemsService.openSearch = false
      this.itemsService.searchMode = false
      this.itemsService.searchVar = '';
    }
    this.loadingService.loadSpinner = true
    if (this.checked ==  true ) {
     
        this.itemsService.filterAttributeValuesCode.push(this.attrValue.attributeValueCode)
        console.log(this.itemsService.filterAttributeValuesCode)
        this.itemsService.items = []
        this.itemsService.filterScrollerTimes = 1
        this.itemsService.getFilteredItemsOnlyByAttrValue().subscribe(
          (res: Item[])=>{
            this.itemsService.items = res
            this.itemsService.filterScrollerTimes = 2
            this.loadingService.loadSpinner = false
          }
        )
    }
    else{
   
     var index = this.itemsService.filterAttributeValuesCode.indexOf(this.attrValue.attributeValueCode)
     this.itemsService.filterAttributeValuesCode.splice(index, 1)
     if (this.itemsService.filterAttributeValuesCode.length == 0) {
       this.itemsService.items = []
       this.itemsService.scrolledTimes = 1
       this.itemsService.getItemsPagination().subscribe(
         (res: Item[])=>{
           this.itemsService.items = res

           this.itemsService.scrolledTimes = 2
           this.loadingService.loadSpinner = false

         }
       )
     }
     else{
       this.itemsService.items = []
       this.itemsService.filterScrollerTimes = 1
       this.itemsService.getFilteredItemsOnlyByAttrValue().subscribe(
        (res: Item[])=>{
          this.itemsService.items = res

          this.itemsService.filterScrollerTimes = 2
          this.loadingService.loadSpinner = false
        }
      )
     }
    }
  }
}
