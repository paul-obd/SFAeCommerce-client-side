import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { ItemsComponent } from './items/items.component';
import { ItemComponent } from './item/item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import {OrderTotalService} from './services/order-total.service'
import {ItemsService} from './services/items.service'
import { FormsModule } from '@angular/forms';
import { ToolbarService } from './services/toolbar.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FilterComponent } from './filter/filter.component';
import { AttributeValueService } from './services/attribute-value.service';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { LoadingService } from './services/loading.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasketComponent } from './basket/basket.component';
import { BasketItemComponent } from './basket-item/basket-item.component';
import { SortByComponent } from './sort-by/sort-by.component';
import { ResponsiveService } from './services/responsive.service';
import { ItemsTableComponent } from './items-table/items-table.component';
import { TableItemComponent } from './table-item/table-item.component';
import { FilterAttrComponent } from './filter-attr/filter-attr.component';
import { FilterCheckboxComponent } from './filter-checkbox/filter-checkbox.component';
import { DialogDeleteOneComponent } from './dialog-delete-one/dialog-delete-one.component';
import { DialogDeleteAllComponent } from './dialog-delete-all/dialog-delete-all.component';


@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemComponent,
    ToolbarComponent,
    ItemDetailsComponent,
    FilterComponent,
    HomeComponent,
    SearchComponent,
    BasketComponent,
    BasketItemComponent,
    SortByComponent,
    ItemsTableComponent,
    TableItemComponent,
    FilterAttrComponent,
    FilterCheckboxComponent,
    DialogDeleteOneComponent,
    DialogDeleteAllComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    InfiniteScrollModule,
    BrowserAnimationsModule
  ],
  providers: [OrderTotalService,ItemsService, ToolbarService, LoadingService, AttributeValueService, ResponsiveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
