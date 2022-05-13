import { Component, OnInit } from '@angular/core';
import { BasketItem } from '../models/basket-item.model';
import { Item } from '../models/Item.model';
import { BasketService } from '../services/basket.service';
import { ItemsService } from '../services/items.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.css']
})
export class ItemsTableComponent implements OnInit {

  public displayedColumns = ['img','name', 'price', 'quantity', 'add-to-basket'];

  constructor(public itemsService: ItemsService, private basketService: BasketService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
  }
  
  
  items: Item[] = this.itemsService.items


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

  seeIfZero(itemCode: string){
    let item = this.items.find(i => i.item_code == itemCode) as Item
    if(item.orderQuantity == 0){
      item.orderQuantity = 1
    }
  }



  addQuantity(itemCode: string){
    let item = this.items.find(i => i.item_code == itemCode) as Item
    if(item.orderQuantity.toString() == ''){
     
      item.orderQuantity = 0
    }
    item.orderQuantity = Number.parseInt(item.orderQuantity.toString()) 
    item.orderQuantity += 1
    
  }

  decreaseQuantity(itemCode: string){
    let item = this.items.find(i => i.item_code == itemCode) as Item
    if (item.orderQuantity == 1) {
      this.snackbar.openSnackbar("Quantity can't be 0")
      
    }else{
      if (item.orderQuantity == 0 || item.orderQuantity == null) {
  
        this.snackbar.openSnackbar("Quantity can't be < 0")
        item.orderQuantity = 1 
        return;
      }
      item.orderQuantity -= 1
    }
   
  }












  addToBasket(itemCode: string){
    let item = this.items.find(i => i.item_code == itemCode) as Item
    if(item.orderQuantity == 0 || item.orderQuantity == null ){
  
      this.snackbar.openSnackbar("Quantity can't be 0")
      item.orderQuantity = 1
    }
    else{
    let isItem = this.basketService.basket.find(i => i.description == item.description)
    if (isItem != null) {
      isItem.orderQuantity += isItem.orderQuantity
    }else{
      let newBasketItem = new BasketItem()
      newBasketItem.item_code = item.item_code
      newBasketItem.description = item.description
      newBasketItem.price = item.price
      newBasketItem.quantity = item.quantity
      newBasketItem.folder_path = item.folder_path
      newBasketItem.base_path = item.base_path
      newBasketItem.physical_file_name = item.physical_file_name
      newBasketItem.orderQuantity = item.orderQuantity
      newBasketItem.supplier = item.supplier

      this.basketService.basket.push(newBasketItem)
    }
    
  }




}


}