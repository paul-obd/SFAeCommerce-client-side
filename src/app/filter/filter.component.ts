import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
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

  constructor(public attributeValueService: AttributeValueService,
    public itemsService: ItemsService,
    public loadingService: LoadingService) { }

  ngOnInit(): void {
    this.getAttributes()
    this.getAttrValues()
  }

  getAttributes() {
    this.attributeValueService.getAttributes().subscribe(
      (res: Attribute[]) => {
        this.attributeValueService.attributes = res
      }
    )
  }

  getItemsAndAttributeValuesWhereAttrr() {
    this.loadingService.loadSpinner == true

    if (this.itemsService.filterAttrValue != '' && this.itemsService.filterAttrValue != null && this.itemsService.filterAttrValue != undefined) {
      this.itemsService.filterScrollerTimes = 1
      this.itemsService.getFilteredItemsWithAttrAndAttrValue().subscribe(
        (res: Item[]) => {
          this.itemsService.items = []
          this.itemsService.items = res
          this.itemsService.filterScrollerTimes = 2
          this.loadingService.loadSpinner = false

        }
      )
    }
    else {
      this.itemsService.filterScrollerTimes = 1
      this.itemsService.getFilteredItemsOnlyByAttr().subscribe(
        (res: Item[]) => {
          this.itemsService.items = []
          this.itemsService.items = res
          this.itemsService.filterScrollerTimes = 2
          this.loadingService.loadSpinner = false
        }
      )
    }

    this.attributeValueService.getAttrValuesWhereAttr().subscribe(
      (res: AttributeValue[]) => {
        this.attributeValueService.attributeValues = []
        this.attributeValueService.attributeValues = res
      }
    )
  }

  getAttrValues() {

    this.attributeValueService.getAttrValues().subscribe(
      (res: AttributeValue[]) => {
        this.attributeValueService.attributeValues = []
        this.attributeValueService.attributeValues = res
      }
    )
  }


  onAttrValueSelect() {

    this.loadingService.loadSpinner == true
    this.itemsService.filterScrollerTimes = 1

    if (this.itemsService.filterAttr != '' && this.itemsService.filterAttr != null && this.itemsService.filterAttr != undefined) {

      this.itemsService.getFilteredItemsWithAttrAndAttrValue().subscribe(
        (res: Item[]) => {
          this.itemsService.items = []
          this.itemsService.items = res
          this.itemsService.filterScrollerTimes = 2
          this.loadingService.loadSpinner = false
         

        }
      )
    } else {
      this.itemsService.getFilteredItemsOnlyByAttrValue().subscribe(
        (res: Item[]) => {

          this.itemsService.items = [];
          this.itemsService.items = res
          this.itemsService.filterScrollerTimes = 2;
          this.loadingService.loadSpinner = false
       
        }
      )
    }

  }

  onAttrSelect() {
    this.getItemsAndAttributeValuesWhereAttrr()
  }

  clearOnlyAttrFilterAndGetItems() {
    this.loadingService.loadSpinner == true
    this.itemsService.filterAttr = '';

    this.itemsService.filterScrollerTimes = 1

    if (this.itemsService.filterAttrValue != '' && this.itemsService.filterAttrValue != null && this.itemsService.filterAttrValue != undefined) {

      this.itemsService.getFilteredItemsOnlyByAttrValue().subscribe(
        (res: Item[]) => {
          this.itemsService.items = []
          this.itemsService.items = res
          this.itemsService.filterScrollerTimes = 2
          this.loadingService.loadSpinner = false
        }
      )
    } else {
      this.itemsService.scrolledTimes = 1
      this.itemsService.getItemsPagination().subscribe(
        (res: Item[]) => {
          this.itemsService.items = []
          this.itemsService.items = res
          this.itemsService.scrolledTimes = 2
          this.loadingService.loadSpinner = false
        })


    }

    this.getAttrValues()

  }


  clearOnlyAttrValueFilterAndGetItems() {
    this.loadingService.loadSpinner = true
    this.itemsService.filterAttrValue = ''

    this.itemsService.filterScrollerTimes = 1
    if (this.itemsService.filterAttr != '' && this.itemsService.filterAttr != null && this.itemsService.filterAttr != undefined) {
      console.log(this.itemsService.filterAttr)
      this.itemsService.getFilteredItemsOnlyByAttr().subscribe(
        (res: Item[]) => {
          this.itemsService.items = []
          this.itemsService.items = res
          this.itemsService.filterScrollerTimes = 2
          this.loadingService.loadSpinner = false
          console.log(this.itemsService.items)
          

        }
      )
    }
    else {
      this.itemsService.scrolledTimes = 1
      this.itemsService.getItemsPagination().subscribe(
        (res: Item[]) => {
          this.itemsService.items = []
          this.itemsService.items = res
          this.itemsService.scrolledTimes = 2
          this.loadingService.loadSpinner = false
        })
    }
  }

}
