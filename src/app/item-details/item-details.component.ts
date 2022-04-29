import { EventHandlerVars } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../models/Item.model';
import { ItemsService } from '../services/items.service';
import { LoadingService } from '../services/loading.service';
import { OrderTotalService } from '../services/order-total.service';
import { ToolbarService } from '../services/toolbar.service';
@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {


  item: Item;

  constructor(private itemService: ItemsService,
     public orderTotalService: OrderTotalService,
      private route: ActivatedRoute,
      private toolbarService: ToolbarService,
      public loadingService: LoadingService) { }

  ngOnInit(): void {
    this.getItem()
    this.toolbarService.ouOfHome = true
  }

  getItem() {
    this.loadingService.loadBar = true
    var itemCode = this.route.snapshot.params.itemCode
    this.itemService.getItemByItemCode(itemCode).subscribe(
      (res: Item) => {
        this.item = res
        this.orderTotalService.quantity = 1;
        this.orderTotalService.itemPrice = this.item.price;
        this.orderTotalService.stock = this.item.quantity
        this.doTotal()
        this.loadingService.loadBar = false

      }
    )
  }

  validateNumber(event: KeyboardEvent) {
    const keyCode = event.keyCode;

    const excludedKeys = [8, 37, 39, 46];

    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) || (keyCode == 9) || (keyCode == 13) || (keyCode == 32)) ||
      (excludedKeys.includes(keyCode) || String.fromCharCode(event.charCode).match(/^[^*|\":<>[\]{}`\\()';@&$+-=]+$/g) != null)

    ) {
      event.preventDefault();
    }
  }

  increaseQuantity() {
    this.orderTotalService.addQuantity()
    this.doTotal()
  }

  decreaseQuantity() {
    this.orderTotalService.decreaseQuantity()
    this.doTotal()
  }

  doTotal() {
    this.orderTotalService.doTotal()
  }

}
