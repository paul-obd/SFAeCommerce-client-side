import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { ItemsComponent } from './items/items.component';
import { ItemComponent } from './item/item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import {OrderTotalService} from './services/order-total.service'
import {ItemsService} from './services/items.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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


import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { DevExtremeModule, DxTemplateModule, DxDataGridModule, DxGalleryModule } from 'devextreme-angular';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { IsLoggedInDialogComponent } from './is-logged-in-dialog/is-logged-in-dialog.component';
import { DialogLogoutComponent } from './dialog-logout/dialog-logout.component';

import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireDatabaseModule } from"@angular/fire/compat/database";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from 'src/environments/environment';
import { MessagingService } from './services/messaging.service';
import { CarouselComponent } from './carousel/carousel.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { CarouselService } from './services/carousel.service';
import { CompanyInfoService } from './services/company-info.service';

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
    DialogDeleteAllComponent,
    LoginComponent,
    IsLoggedInDialogComponent,
    DialogLogoutComponent,
    CarouselComponent,
    CompanyInfoComponent
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
    BrowserAnimationsModule,
    DevExtremeModule,
    DxTemplateModule,
    DxDataGridModule,
    DxGalleryModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
      }
      }) ,
     
  ],
  providers: [CompanyInfoService,CarouselService,OrderTotalService,MessagingService,ItemsService, ToolbarService, LoadingService, AttributeValueService, ResponsiveService, AuthService, TranslateService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}