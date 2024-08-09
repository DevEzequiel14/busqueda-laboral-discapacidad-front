import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent implements OnInit {
  form: FormGroup;
  increaseFontSize = false;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddComponent>, @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {
    this.form = this.fb.group({
      experience: [''],
      skill: ['', [this.onlyLettersValidator()]],
      title: ['', [this.onlyLettersValidator()]],
      institution: [''],
      state: [''],
    });
  }
  ngOnInit() {
    this.increaseFontSize = this.data.increaseFontSize
  }
  add() {
    switch (this.data.view) {
      case 'experience': {
        if (this.form.controls['experience'].value) this.dialogRef.close(this.form.controls['experience'].value);
        break;
      }
      case 'skill': {
        if (this.form.controls['skill'].value) this.dialogRef.close(this.form.controls['skill'].value);
        break;
      }
      case 'education': {
        const educacion = {
          titulo: this.form.controls['title'].value,
          establecimiento: this.form.controls['institution'].value,
          estado: this.form.controls['state'].value,
        }
        this.dialogRef.close(educacion);
        break;
      }
    }
  }
  close() {
    this.dialogRef.close();
  }
  onlyLettersValidator() {
    return (control: any) => {
      const valid = !(/[^a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]/g).test(control.value);
      return valid ? null : { invalidFormat: true };
    };
  }
}
