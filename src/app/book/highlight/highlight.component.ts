import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit {

  formData!: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.formData = data
  }

  ngOnInit(): void {
    console.log(this.formData)
  }

}
