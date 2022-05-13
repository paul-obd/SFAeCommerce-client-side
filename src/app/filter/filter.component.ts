import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { AttributeValue } from '../models/attribute-value.model';
import { Attribute } from '../models/attribute.model';
import { Item } from '../models/Item.model';
import { AttributeValueService } from '../services/attribute-value.service';
import { ItemsService } from '../services/items.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  animations: [
    trigger('fade', [
      transition('* => void', [
        animate(100, style({
          opacity: 0,
          transform: 'translateX(-50%)',
        }))
      ]),
      transition('void=> *', [
        animate(100, style({
          opacity: 1,
          transform: 'translateX(5%)',
        }))
      ]),
    ])
  ]
})
export class FilterComponent implements OnInit {

  @ViewChild('search') searchBox: ElementRef;
  checked: boolean = false

  constructor(public attributeValueService: AttributeValueService,
    public itemsService: ItemsService,
    public loadingService: LoadingService) { }

  ngOnInit(): void {
    this.getAttributes()
  }

  getAttributes() {
    this.attributeValueService.getAttributes().subscribe(
      (res: Attribute[]) => {
        this.attributeValueService.attributes = []
        // res.forEach(attr => {
        //   attr = {
        //     ...attr,
        //     showShortDesciption: true
        //   } as Attribute
        //   this.attributeValueService.attributes.push(attr)
        // });
        this.attributeValueService.attributes = res
      }
    )
  }



  // getOrRemoveItems(i: number, e:number){
  //   if ( this.itemsService.searchMode == true) {
  //     this.itemsService.openSearch = false
  //     this.itemsService.searchMode = false
  //     this.itemsService.searchVar = '';
  //   }
  //   let attrValue = this.attributeValueService.attributes[i].attributeValues[e]
  //   this.loadingService.loadSpinner = true
  //   if (attrValue.checked ==  true ) {
  //       this.itemsService.filterAttributeValuesCode.push(attrValue.attributeValueCode)
  //       this.itemsService.items = []
  //       this.itemsService.filterScrollerTimes = 1
  //       this.itemsService.getFilteredItemsOnlyByAttrValue().subscribe(
  //         (res: Item[])=>{
  //           this.itemsService.items = res
  //       //    this.itemsService.putItemInTable()
  //           this.itemsService.filterScrollerTimes = 2
  //           this.loadingService.loadSpinner = false
  //         }
  //       )
  //   }
  //   else{
  //    var index = this.itemsService.filterAttributeValuesCode.indexOf(attrValue.attributeValueCode)
  //    this.itemsService.filterAttributeValuesCode.splice(index, 1)
  //    if (this.itemsService.filterAttributeValuesCode.length == 0) {
  //      this.itemsService.items = []
  //      this.itemsService.scrolledTimes = 1
  //      this.itemsService.getItemsPagination().subscribe(
  //        (res: Item[])=>{
  //          this.itemsService.items = res
  //   //       this.itemsService.putItemInTable()
  //          this.itemsService.scrolledTimes = 2
  //          this.loadingService.loadSpinner = false

  //        }
  //      )
  //    }
  //    else{
  //      this.itemsService.items = []
  //      this.itemsService.filterScrollerTimes = 1
  //      this.itemsService.getFilteredItemsOnlyByAttrValue().subscribe(
  //       (res: Item[])=>{
  //         this.itemsService.items = res
  //  //       this.itemsService.putItemInTable()
  //         this.itemsService.filterScrollerTimes = 2
  //         this.loadingService.loadSpinner = false
  //       }
  //     )
  //    }
  //   }
  // }


  





  //   let attrValue = this.attributeValueService.attributes[i].attributeValues[e]
  //   if (this.itemsService.filtered == 0 ) {
  //     this.itemsService.items = []
  //   }
  //   if (attrValue.checked == true) {
  //     this.itemsService.scrolledTimes = 1
  //     this.itemsService.getFilteredItemsOnlyByAttrValue(attrValue.attributeCode).subscribe(
  //       (res: Item[])=>{
  //         res.forEach(item => {
  //           this.itemsService.items.push(item)
  //         });
  //         this.itemsService.filtered += 1
  //       }
  //     )
  //   }
  //   else{
      
  //   }
  //}

  // getItemsAndAttributeValuesWhereAttrr() {
  //   this.loadingService.loadSpinner == true

  //   // if (this.itemsService.filterAttrValue != '' && this.itemsService.filterAttrValue != null && this.itemsService.filterAttrValue != undefined) {
  //   //   // this.itemsService.filterScrollerTimes = 1
  //   //   // this.itemsService.getFilteredItemsWithAttrAndAttrValue().subscribe(
  //   //   //   (res: Item[]) => {
  //   //   //     this.itemsService.items = []
  //   //   //     this.itemsService.items = res
  //   //   //     this.itemsService.filterScrollerTimes = 2
  //   //   //     this.loadingService.loadSpinner = false

  //   //   //   }
  //   //   // )

  //   // }
  //   // else {
  //   // if (this.itemsService.filterAttrValue != '' && this.itemsService.filterAttrValue != null && this.itemsService.filterAttrValue != undefined) {
  //   //   let attrValue = this.attributeValueService.attributeValues.find(a => a.attributeValueCode == this.itemsService.filterAttrValue)
  //   //   if (attrValue?.attributeCode == this.itemsService.filterAttr) {
  //   //     return;
  //   //   }
  //   //   this.itemsService.filterScrollerTimes = 1
  //   //   this.itemsService.getFilteredItemsOnlyByAttr().subscribe(
  //   //     (res: Item[]) => {
  //   //       this.itemsService.items = []
  //   //       this.itemsService.items = res
  //   //       this.itemsService.filterScrollerTimes = 2
  //   //       this.loadingService.loadSpinner = false
  //   //     }
  //   //   )
      

  //   //   this.attributeValueService.getAttrValuesWhereAttr().subscribe(
  //   //     (res: AttributeValue[]) => {
  //   //       this.itemsService.filterAttrValue = ''
  //   //       this.attributeValueService.attributeValues = []
  //   //       this.attributeValueService.attributeValues = res
  //   //     }
  //   //   )
  //   // }
  //   // else {

  //     this.itemsService.filterScrollerTimes = 1
  //     this.itemsService.getFilteredItemsOnlyByAttr().subscribe(
  //       (res: Item[]) => {
  //         this.itemsService.items = []
  //         this.itemsService.items = res
  //         this.itemsService.filterScrollerTimes = 2
  //         this.loadingService.loadSpinner = false
  //       }
  //     )
      


  //  // }
  // }

  // // getAttrValues() {

  // //   this.attributeValueService.getAttrValues().subscribe(
  // //     (res: AttributeValue[]) => {
  // //       this.attributeValueService.attributeValues = []
  // //       this.attributeValueService.attributeValues = res
  // //     }
  // //   )
  // // }


  // onAttrValueSelect() {

  //   this.loadingService.loadSpinner == true
  //   this.itemsService.filterScrollerTimes = 1

  //   if (this.itemsService.filterAttr != '' && this.itemsService.filterAttr != null && this.itemsService.filterAttr != undefined) {

  //     this.itemsService.getFilteredItemsWithAttrAndAttrValue().subscribe(
  //       (res: Item[]) => {
  //         this.itemsService.items = []
  //         this.itemsService.items = res
  //         this.itemsService.filterScrollerTimes = 2
  //         this.loadingService.loadSpinner = false


  //       }
  //     )
  //   } else {
  //     this.itemsService.getFilteredItemsOnlyByAttrValue().subscribe(
  //       (res: Item[]) => {

  //         this.itemsService.items = [];
  //         this.itemsService.items = res
  //         this.itemsService.filterScrollerTimes = 2;
  //         this.loadingService.loadSpinner = false

  //       }
  //     )
  //   }

  // }


  // onAttrSelect() {
  //   this.getItemsAndAttributeValuesWhereAttrr()
  // }

  // clearOnlyAttrFilterAndGetItems() {
  //   this.loadingService.loadSpinner == true
  //   this.itemsService.filterAttr = '';

  //   this.itemsService.filterScrollerTimes = 1

  //   if (this.itemsService.filterAttrValue != '' && this.itemsService.filterAttrValue != null && this.itemsService.filterAttrValue != undefined) {

  //     this.itemsService.getFilteredItemsOnlyByAttrValue().subscribe(
  //       (res: Item[]) => {
  //         this.itemsService.items = []
  //         this.itemsService.items = res
  //         this.itemsService.filterScrollerTimes = 2
  //         this.loadingService.loadSpinner = false
  //       }
  //     )
  //   } else {
  //     this.itemsService.scrolledTimes = 1
  //     this.itemsService.getItemsPagination().subscribe(
  //       (res: Item[]) => {
  //         this.itemsService.items = []
  //         this.itemsService.items = res
  //         this.itemsService.scrolledTimes = 2
  //         this.loadingService.loadSpinner = false
  //       })


  //   }

  //   //this.getAttrValues()

  // }


  // clearOnlyAttrValueFilterAndGetItems() {
  //   this.loadingService.loadSpinner = true
  //   this.itemsService.filterAttrValue = ''

  //   this.itemsService.filterScrollerTimes = 1
  //   if (this.itemsService.filterAttr != '' && this.itemsService.filterAttr != null && this.itemsService.filterAttr != undefined) {
  //     console.log(this.itemsService.filterAttr)
  //     this.itemsService.getFilteredItemsOnlyByAttr().subscribe(
  //       (res: Item[]) => {
  //         this.itemsService.items = []
  //         this.itemsService.items = res
  //         this.itemsService.filterScrollerTimes = 2
  //         this.loadingService.loadSpinner = false
  //         console.log(this.itemsService.items)


  //       }
  //     )
  //   }
  //   else {
  //     this.itemsService.scrolledTimes = 1
  //     this.itemsService.getItemsPagination().subscribe(
  //       (res: Item[]) => {
  //         this.itemsService.items = []
  //         this.itemsService.items = res
  //         this.itemsService.scrolledTimes = 2
  //         this.loadingService.loadSpinner = false
  //       })
  //   }
  // }



}
