import { Component, OnInit } from '@angular/core';
import * as epubjs from '../../node_modules/epubjs/dist/epub.min';

import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ebook';

  constructor(private db: AngularFirestore) {

  }

  ngOnInit() {
    const things = this.db.collection('students-list').valueChanges();
    things.subscribe(console.log);
  }

  
}
