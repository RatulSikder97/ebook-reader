import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
  }

  readBook(event) {

    this.bookService.openBook(event.target.files[0])

  }

}
