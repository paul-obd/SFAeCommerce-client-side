import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'; 
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import {MatBadgeModule} from '@angular/material/badge';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';

let MaterialComponents = [
  MatButtonModule ,
  MatCardModule,
  MatDividerModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  DragDropModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatRadioModule,
  MatExpansionModule,
  MatChipsModule,
  MatBadgeModule,
  MatListModule,
  MatTableModule,
  MatDialogModule,
  MatSnackBarModule,
  MatMenuModule
  
];

@NgModule({
  
  imports: [MaterialComponents],
  exports: [MaterialComponents]

})

export class MaterialModule { }
