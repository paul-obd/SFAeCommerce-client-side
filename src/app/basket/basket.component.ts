import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(public basketService: BasketService) { }

  ngOnInit(): void {
    this.basketService.doTotal()
  }


  deleteAllFromBasket(){
    if(confirm('All Items Will be Removed From Basket.')){
      this.basketService.basket = []
    }

  }
}
