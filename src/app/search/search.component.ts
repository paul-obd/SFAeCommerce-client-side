import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Item } from '../models/Item.model';
import { AttributeValueService } from '../services/attribute-value.service';
import { ItemsService } from '../services/items.service';
import { LoadingService } from '../services/loading.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [

    trigger('search', [

      transition('* => void', [
        animate(100, style({
          opacity: 0,
          transform: 'translateX(50%)',
        }))
      ]),
      transition('void=> *', [
        animate(100, style({
          opacity: 1,
          transform: 'translateX(-5%)',
        }))
      ]),
    ]),

  ],

})
export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild('search') searchBox: ElementRef;

  constructor(public itemsService: ItemsService, private loadingService: LoadingService, private attributeService: AttributeValueService) { }
  ngAfterViewInit(): void {
    this.initSearchListener()
  }

  ngOnInit(): void {

  }

  closeSearch(event: Event) {
    this.itemsService.openSearch = false
    this.itemsService.searchMode = false
    this.itemsService.searchVar = '';
    this.loadingService.loadSpinner = true

    this.getItemsWithPag()
    event.stopPropagation();
  }


  initSearchListener() {

    const keyups = fromEvent(this.searchBox.nativeElement, 'keyup');

    // wait 1s between keyups to emit current value
    keyups
      .pipe(

        debounceTime(1000)
      )
      .subscribe(() => {
        if (this.itemsService.searchVar == '') {
          this.loadingService.loadSpinner = true
          this.getItemsWithPag()
        } else {

          this.loadingService.loadSpinner = true
          this.itemsService.searchScrolledTimes = 1
          this.itemsService.searchAnItemWithPag().subscribe(
            (res: Item[]) => {
              this.itemsService.searchMode = true
              this.itemsService.items = []
              this.itemsService.items = res
        
              this.itemsService.searchScrolledTimes = 2

              this.loadingService.loadSpinner = false
            }
          )

        }
      });

  }


  getItemsWithPag() {
    if (this.itemsService.filterAttributeValuesCode.length > 0) {
      this.getFilteredItemsOnlyByAttrValue()
    } else {

      this.itemsService.scrolledTimes = 1
      this.itemsService.getItemsPagination().subscribe(
        (res: Item[]) => {
          this.itemsService.items = []
          this.itemsService.items = res
   
          this.loadingService.loadSpinner = false
        }
      )
    }

  }


  getFilteredItemsOnlyByAttrValue() {
    this.itemsService.filterScrollerTimes = 1
    this.itemsService.getFilteredItemsOnlyByAttrValue().subscribe(
      (res: Item[]) => {

        this.itemsService.items = [];
        this.itemsService.items = res
        this.itemsService.filterScrollerTimes = 2;
        this.loadingService.loadSpinner = false

      })
  }

}




