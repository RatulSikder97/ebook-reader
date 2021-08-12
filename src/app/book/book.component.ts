import { Component, OnInit } from '@angular/core';
import Section from 'epubjs/types/section';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  bookmarkString ;
  bookMark!: any[];
  bookmarkLength ;
  Location;
  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {

    this.bookmarkString = localStorage.getItem('bookmark') && '[]';
    console.log('lloo')
    console.log(this.bookmarkString)
    this.bookMark = JSON.parse(this.bookmarkString) ?? [];
    this.bookmarkLength = this.bookMark.length
   
  }

  readBook(event) {

    this.bookService.openBook(event.target.files[0])
    this.bookService.renderTo('book-view');
    this.bookService.display()
    this.bookService.rendition.themes.default({
      '::selection': {
        'background': 'rgba(255,255,0, 0.3)'
      },
      '.epubjs-hl' : {
        'fill': 'yellow', 'fill-opacity': '0.3', 'mix-blend-mode': 'multiply'
      }
    });

    this.bookService.rendition.themes.fontSize('16px')
    this.bookService.rendition.on('relocated', (location) =>{
      //console.log(this.bookService.rendition)
      localStorage.setItem('currentLoc', JSON.stringify( location.start.cfi))
      localStorage.setItem('currentPage', JSON.stringify( location.start.displayed.page)) 

      this.bookService.book.loaded.metadata.then(val => {
        //console.log(val)
      })

    });

    this.bookService.rendition.on('rendered', (section: Section) => {
    
      // Update current navItem by section
      const navItem = this.bookService.book.navigation.get(section.href);

      console.log(navItem)
      localStorage.setItem('currSec', navItem.label);
      
    });

   

    

  
  }

  prevPage() {
    this.bookService.rendition.prev(); 
  }

  nextPage() {
    this.bookService.rendition.next(); 

  }

  makeBookmark() {
    let l:any = JSON.parse(localStorage.getItem('currentLoc') ?? '')
    let currSec = localStorage.getItem('currSec')?.trim()
    let currentPage = localStorage.getItem('currentPage')?.trim()
    let linkName = currSec+ " "+ currentPage;
    console.log((  this.bookMark.length))
    if ((l &&  this.bookMark.length == 0) || (l && this.bookMark.length>0 && this.bookMark.indexOf(l) == -1)) {
      this.bookMark.push({name: linkName, link: l});
    }

  
    localStorage.setItem('bookmark',  JSON.stringify(this.bookMark))
    //console.log(this.bookService.book.pageList.cfiFromPage(3))
    
  }

  goToBookMark(link) {
    this.bookService.display(link)
  }

}
