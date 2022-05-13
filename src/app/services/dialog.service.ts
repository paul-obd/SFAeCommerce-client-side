import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteAllComponent } from '../dialog-delete-all/dialog-delete-all.component';
import { DialogDeleteOneComponent } from '../dialog-delete-one/dialog-delete-one.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }


  openDeleteOneDIalog(){
    return this.dialog.open(DialogDeleteOneComponent)
  }
  openDeleteAllDialog(){
    return this.dialog.open(DialogDeleteAllComponent)
  }

}
