import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';
import { BookRoutingModule } from './book-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromBook from './state/book.reducer';


import {MatDialogModule} from '@angular/material/dialog';
import { HighlightComponent } from './highlight/highlight.component';


@NgModule({
  declarations: [
    BookComponent,
    HighlightComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    MatDialogModule,

    StoreModule.forFeature(fromBook.booksFeatureKey, fromBook.reducer)
  ]
})
export class BookModule { }
