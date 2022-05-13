import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from '../services/basket.service';
import { DialogService } from '../services/dialog.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.css']
})
export class BasketItemComponent implements OnInit {

  @Input() i: number;
  @Input() itemCode: string;
  @Input() description: string;
  @Input() price: number;
  @Input() quantity: number;
  @Input() folderPath: string;
  @Input() basePath: string;
  @Input() physicalFileName: string;
  @Input() orderQuantity: number = 1;
  @Input() supplier: string;

  imageIsLoaded: boolean = false


  constructor(public basketService: BasketService, private dialogService: DialogService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
  }

  onImageLoad() {
    this.imageIsLoaded = true
  }

  addQuantity() {
    if (this.basketService.basket[this.i].orderQuantity.toString() == '') {
      this.basketService.basket[this.i].orderQuantity = 0
    }
    this.basketService.basket[this.i].orderQuantity = Number.parseInt(this.basketService.basket[this.i].orderQuantity.toString())
    this.basketService.basket[this.i].orderQuantity += 1
    this.basketService.doTotal()
  }


  decreaseQuantity() {

    if (this.basketService.basket[this.i].orderQuantity == 1) {

      this.snackbar.openSnackbar("Quantity can't be 0")

    } else {
      if (this.basketService.basket[this.i].orderQuantity == 0 || this.basketService.basket[this.i].orderQuantity == null) {
        this.snackbar.openSnackbar("Quantity can't be < 0")
        this.basketService.basket[this.i].orderQuantity = 1
        return;
      }
      this.basketService.basket[this.i].orderQuantity -= 1
      this.basketService.doTotal()
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
    } else {
      this.basketService.doTotal()
    }

  }

  seeIfZero() {
    if (this.basketService.basket[this.i].orderQuantity == 0) {
      this.basketService.basket[this.i].orderQuantity = 1
      this.basketService.doTotal()
    }
  }

  deleteFromBasket() {
    // if(confirm('This Item Will Removed From Basket.')){
    //   this.basketService.basket.splice(this.i, 1)
    //   this.basketService.doTotal()
    // }
    this.dialogService.openDeleteOneDIalog().afterClosed().subscribe(
      (result) => {
        if (result == 'true') {
          this.basketService.basket.splice(this.i, 1)
          this.basketService.doTotal()
        }
      }
    )

  }



}
