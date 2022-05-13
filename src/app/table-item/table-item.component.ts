import { Component, Input, OnInit } from '@angular/core';
import { BasketItem } from '../models/basket-item.model';
import { BasketService } from '../services/basket.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: '[app-table-item]',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.css']
})
export class TableItemComponent implements OnInit {


  @Input() i: number;
  @Input() item_code: string;
  @Input() description: string;
  @Input() price: number;
  @Input() quantity: number;
  @Input() folder_path: string;
  @Input()  base_path: string;
  @Input() physical_file_name: string;
  @Input() supplier: string;

  orderQuantity: number = 1

  constructor(private basketService: BasketService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
  }

  addQuantity(){
    if(this.orderQuantity.toString() == ''){
     
      this.orderQuantity = 0
    }
    this.orderQuantity = Number.parseInt(this.orderQuantity.toString()) 
    this.orderQuantity += 1
    
  }

  decreaseQuantity(){
    if (this.orderQuantity == 1) {
      
      this.snackbar.openSnackbar("Quantity can't be 0")
      
    }else{
      if (this.orderQuantity == 0 || this.orderQuantity == null) {
       
        this.snackbar.openSnackbar("Quantity can't be < 0")
        this.orderQuantity = 1 
        return;
      }
      this.orderQuantity -= 1
    }
   
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

  seeIfZero(){
    if(this.orderQuantity == 0){
      this.orderQuantity = 1
    }
  }


  addToBasket(){
    if(this.orderQuantity == 0 || this.orderQuantity == null ){

      this.snackbar.openSnackbar("Quantity can't be 0")
      this.orderQuantity = 1
    }
    else{
    let item = this.basketService.basket.find(i => i.description == this.description)
    if (item != null) {
      item.orderQuantity += this.orderQuantity
    }else{
      let newBasketItem = new BasketItem()
      newBasketItem.item_code = this.item_code
      newBasketItem.description = this.description
      newBasketItem.price = this.price
      newBasketItem.quantity = this.quantity
      newBasketItem.folder_path = this.folder_path
      newBasketItem.base_path = this.base_path
      newBasketItem.physical_file_name = this.physical_file_name
      newBasketItem.orderQuantity = this.orderQuantity
      newBasketItem.supplier = this.supplier

      this.basketService.basket.push(newBasketItem)
    }
    
  }}
  

}
