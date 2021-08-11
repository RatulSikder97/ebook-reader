import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';
import { BookRoutingModule } from './book-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromBook from './state/book.reducer';



@NgModule({
  declarations: [
    BookComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    StoreModule.forFeature(fromBook.booksFeatureKey, fromBook.reducer)
  ]
})
export class BookModule { }
