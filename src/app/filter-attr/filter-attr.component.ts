import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { AttributeValue } from '../models/attribute-value.model';
import { Attribute } from '../models/attribute.model';
import { Item } from '../models/Item.model';
import { AttributeValueService } from '../services/attribute-value.service';
import { ItemsService } from '../services/items.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-filter-attr',
  templateUrl: './filter-attr.component.html',
  styleUrls: ['./filter-attr.component.css']
})
export class FilterAttrComponent implements OnInit {

  @ViewChild('search') searchBox: ElementRef;

  @Input() attribute: Attribute
  @Input() attributeValues: AttributeValue[] = []

  searchValue: string;
  searchAttributeValuesResult: AttributeValue[] = []


  showShortDesciption: boolean= true

  constructor(private itemsService: ItemsService, private attributeValueService: AttributeValueService, public loadingService: LoadingService) { }

  ngOnInit(): void {
  }

  initSearchListener() {

    const keyups = fromEvent(this.searchBox.nativeElement, 'keyup');

    // wait 1s between keyups to emit current value
    keyups
      .pipe(

        debounceTime(1000)
      )
      .subscribe(() => {
      
        if (this.searchValue == '' || this.searchValue  == null) {
          this.getAttributes()
        }else{
          this.searchAttributeValues()
        }
        
      });
  }


  searchAttributeValues(){
    this.attributeValueService.searchAttributeValues(this.attribute.attributeCode, this.searchValue).subscribe(
      (res: AttributeValue[])=>{
        let resArray: AttributeValue[] = []
        res.forEach((attrVal)=>{
          let currenetAttrVal = this.attributeValues.find(a=> a.attributeValueCode == attrVal.attributeValueCode)
          if (currenetAttrVal != undefined) {
            resArray.push(currenetAttrVal)
          }
        })
        this.attributeValues = resArray
      }
    )
  }


  getAttributes() {
    this.attributeValues = this.attribute.attributeValues
  }

  emptyFilter(){
    this.itemsService.filterAttributeValuesCode = []
  }




}
