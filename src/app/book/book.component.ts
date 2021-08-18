import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Section from 'epubjs/types/section';
import { BookService } from '../services/book.service';
import { HighlightComponent } from './highlight/highlight.component';

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
  hIndex: string[] = [];
  hClass: string = '';
  hColors = ['red', 'yellow', 'blue']
  constructor(
    private bookService: BookService,
    private bookDialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.bookmarkString = localStorage.getItem('bookmark') && '[]';
    console.log('lloo')
    console.log(this.bookmarkString)
    this.bookMark = JSON.parse(this.bookmarkString) ?? [];
    this.bookmarkLength = this.bookMark.length

    this.hClass = 'h-yellow';



  }


  cond: boolean = false;
  readBook(event) {

    this.bookService.openBook(event.target.files[0])
    this.bookService.renderTo('viewer');
    this.bookService.display()
    this.bookService.rendition.themes.default({
      '::selection': {
        'background': 'rgba(0,255,0, 0.3)'
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

    this.bookService.rendition.on("layout", (layout) => {
      let viewer = document.getElementById("viewer");

      if (layout.spread) {
        this.cond = false;
      } else {
        this.cond = true;
      }
    });

    this.bookService.rendition.on('selected', (cfi, data) => {

      // console.log(data.window.getSelection().toString())
      // data.window.getSelection().then().
      let me = data.window.getSelection().toString()

      if(data.window.getSelection().toString()) {
        console.log(data.window.getSelection().toString())
        this.bookDialog.open(HighlightComponent, { data: {
          text: me
        }})

      }


      // this.bookService.rendition.annotations.highlight(cfi, {}, (e) => {
      //   console.log("highlight clicked", e.target);

      // }, this.hClass);


      let cfiD: string = cfi;
      this.hIndex.push(cfi)


    })

  }

  changeHColor(color) {
    this.hClass = 'h-'+color
  }

  removeH(link) {
    this.bookService.rendition.annotations.remove(link, "highlight")
    this.hIndex = this.hIndex.filter(links => links !=link)
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

  onRightClick(e) {
    e.preventDefault()
    console.log(e.clientX)

    this.bookDialog.open(HighlightComponent, { position: {top: e.clientY+'px', left:e.clientX+'px'}})

    // y

  }

}
