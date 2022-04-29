import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../services/toolbar.service';
import { Location } from '@angular/common'
import { LoadingService } from '../services/loading.service';
import { ItemsService } from '../services/items.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public toolbarService: ToolbarService, private location: Location, 
    public loadingService: LoadingService,
    public itemsService: ItemsService) { }

  ngOnInit(): void {
  }

  back(){
    this.location.back()
  }
  openSearch(){
    this.itemsService.openSearch = true
  }
}
