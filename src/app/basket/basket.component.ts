import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket.service';
import { DialogService } from '../services/dialog.service';
import { ResponsiveService } from '../services/responsive.service';
import { ToolbarService } from '../services/toolbar.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(public toolbarService: ToolbarService,public basketService: BasketService, public responsiveService: ResponsiveService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.basketService.doTotal()
  }


  deleteAllFromBasket(){
    this.dialogService.openDeleteAllDialog().afterClosed().subscribe(
      (result)=>{
        if(result == 'true'){
          this.basketService.basket = []
        }
      }
    )

  }
}
