import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasketItem } from '../models/basket-item.model';
import { BasketService } from '../services/basket.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() itemCode: string;
  @Input() description: string;
  @Input() price: number;
  @Input() quantity: number;
  @Input() folderPath: string;
  @Input() basePath: string;
  @Input() physicalFileName: string;
  @Input() supplier: string;

  orderQuantity: number = 1;
  imageIsLoaded: boolean = false

  constructor(private route: Router, private basketService: BasketService, private snackbar:  SnackbarService) { }

  ngOnInit(): void {
  }

  goToDetails(){
    this.route.navigate(['/item-details', this.itemCode])
  }


  onImageLoad(){
    this.imageIsLoaded = true
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
      this.snackbar.openSnackbar("Quantity can't be zero")
      this.orderQuantity = 1
    }
    else{
    let item = this.basketService.basket.find(i => i.description == this.description)
    if (item != null) {
      item.orderQuantity += this.orderQuantity
    }else{
      let newBasketItem = new BasketItem()
      newBasketItem.item_code = this.itemCode
      newBasketItem.description = this.description
      newBasketItem.price = this.price
      newBasketItem.quantity = this.quantity
      newBasketItem.folder_path = this.folderPath
      newBasketItem.base_path = this.basePath
      newBasketItem.physical_file_name = this.physicalFileName
      newBasketItem.orderQuantity = this.orderQuantity
      newBasketItem.supplier = this.supplier

      this.basketService.basket.push(newBasketItem)
    }
    
  }}

}





