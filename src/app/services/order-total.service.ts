import { Injectable } from '@angular/core';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class OrderTotalService {

  itemPrice: number=0;
  quantity: number = 1;
  total: number = this.itemPrice
  stock: number = 0

  constructor(private snackbar: SnackbarService) { }

  doTotal(){
    if (this.quantity < 0) {
      this.snackbar.openSnackbar("Quantity can't be a negative number")
      
    }else if(this.quantity > this.stock){

      this.snackbar.openSnackbar("Such Quantity Not Availble in Stock")
      this.quantity = 1
    }
    else{
      if (this.quantity <= 0) {
        return;
      }else{
        this.total = this.itemPrice * this.quantity
      }
     
    }


  }

  addQuantity(){
    if(this.quantity.toString() == ''){
     
      this.quantity = 0
    }
    this.quantity = Number.parseInt(this.quantity.toString()) 
    this.quantity += 1
    
  }

  decreaseQuantity(){
    if (this.quantity == 1) {

      this.snackbar.openSnackbar("Quantity can't be 0")
    }else{
      if (this.quantity == 0) {
        return;
      }
      this.quantity -= 1
    }
   
  }
}
