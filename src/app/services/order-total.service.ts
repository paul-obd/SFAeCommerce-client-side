import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderTotalService {

  itemPrice: number=0;
  quantity: number = 1;
  total: number = this.itemPrice
  stock: number = 0

  constructor() { }

  doTotal(){
    if (this.quantity < 0) {
      alert("Quantity can't be a negative number")
      
    }else if(this.quantity > this.stock){
      alert("Such Quantity Not Availble in Stock")
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
      alert("Quantity can't be 0")
      
    }else{
      if (this.quantity == 0) {
        return;
      }
      this.quantity -= 1
    }
   
  }
}
