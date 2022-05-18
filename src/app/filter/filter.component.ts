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
        this.attributeValueService.attributes = res
      }
    )
  }


}
