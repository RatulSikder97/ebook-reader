import { Injectable } from '@angular/core';
import ePub,{ Book, Rendition } from 'epubjs';
import { RenditionOptions } from 'epubjs/types/rendition';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  book: Book = ePub();
  rendition!: Rendition;

  constructor() {
    
   }

   openBook(input: any, what?: string) {
    this.book.open(input, what);
    //console.log(this.book)
  }

  display(target?: string) {
    this.rendition.display(target);
  }

  renderTo(element: string, options?: RenditionOptions) {
    this.rendition = this.book.renderTo(element, { height: 600 , width: 500});
  }

  
}
