import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-save-validation-modal',
  templateUrl: './save-validation-modal.component.html',
  styleUrls: ['./save-validation-modal.component.css'],
})
export class SaveValidationModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<SaveValidationModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    console.log(data);
  }

  ngOnInit(): void {}
}
