
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { AttributeValueService } from '../services/attribute-value.service';
import { ItemsService } from '../services/items.service';
import { LoadingService } from '../services/loading.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDrawer, MatDrawerToggleResult } from '@angular/material/sidenav';
import { BasketService } from '../services/basket.service';
import { Router } from '@angular/router';
import { ResponsiveService } from '../services/responsive.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('drawer') drawer: MatDrawer;
  isDrawerOpen: string ;
  isPhone: boolean ;


  constructor(public attributeValueService: AttributeValueService, public itemsService: ItemsService
    ,public loadingService: LoadingService, private bpObserver: BreakpointObserver,
    public basketService: BasketService, private route: Router, public responsiveService: ResponsiveService) { }


  ngOnInit(): void {

  }
   
  goToBasket(){
      this.route.navigate(['/basket'])
  
   
  }

  toggleGrid(){
    if(this.responsiveService.grid == 'cards'){
      this.responsiveService.grid = 'table'
    }else{
      this.responsiveService.grid = 'cards'
    }
  }

      
  ngAfterViewInit(): void {
    this.bpObserver
      .observe(['(max-width: 900px)'])
      .subscribe((res: any) => {
        if (res.matches) {
          this.responsiveService.isMobile = true
          this.drawer.mode = 'over';
          this.drawer.close().then((sidenavIsOpen: MatDrawerToggleResult) => {
            this.isDrawerOpen = sidenavIsOpen 
          });
        } else {
          this.responsiveService.isMobile = false
          this.drawer.mode = 'side';
          this.drawer.open().then((sidenavIsOpen: MatDrawerToggleResult) => {
            this.isDrawerOpen = sidenavIsOpen 
          });;
        }
      });
  }


  toggleDrawer(){
    this.drawer.toggle().then((sidenavIsOpen: MatDrawerToggleResult) => {
      this.isDrawerOpen = sidenavIsOpen 
    });
  }




}


