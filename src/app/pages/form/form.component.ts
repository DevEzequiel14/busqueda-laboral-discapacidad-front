import { ResultService } from './../../data/services/result.service';
import { FormService } from './../../data/services/form.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAddComponent } from 'src/app/shared/components/dialog-add/dialog-add.component';
import * as annyang from 'annyang';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  experienceList: any[] = []
  skillsList: any[] = []
  educationList: any[] = []
  languageList: any[] = []
  increaseFontSize = false;
  flag = false;
  formBackup: any;
  flagRecognitionFirstName = false;
  flagRecognitionLastName = false;
  audio: any;
  flagPlayback = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private formService: FormService,
    private resultService: ResultService
  ) {
    this.form = formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      experiences: [],
      skills: [],
      education: [],
      languages: [],
      language: '',
      level: '',
      typeOfDisability: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    if (this.formService.getData()) {
      this.formBackup = this.formService.getData()
      this.form.controls['firstname'].patchValue(this.formBackup.firstname)
      this.form.controls['lastname'].patchValue(this.formBackup.lastname)
      this.form.controls['typeOfDisability'].patchValue(this.formBackup.typeOfDisability)
      this.formBackup.experiences.forEach((element: string) => {
        this.experienceList.push(element)
      });
      this.formBackup.skills.forEach((element: string) => {
        this.skillsList.push(element)
      });
      this.formBackup.languages.forEach((element: string) => {
        this.languageList.push(element)
      });
      this.formBackup.education.forEach((element: string) => {
        this.educationList.push(element)
      });
    }
  }
  searchForOffers() {
    if (this.form.valid && this.skillsList.length > 0) {
      this.form.controls['experiences'].patchValue(this.experienceList)
      this.form.controls['skills'].patchValue(this.skillsList)
      this.form.controls['education'].patchValue(this.educationList)
      this.form.controls['languages'].patchValue(this.languageList)
      this.formService.saveData(this.form.value);
      this.form.removeControl('language')
      this.form.removeControl('level')
      this.flag = true;
      this.formService.result(this.form.value).subscribe((resp) => {
        this.flag = false;
        this.resultService.updateResults(resp)
        this.router.navigate(['/result']);
      }, (error) => {
        this.flag = false;
        console.log('Error', error);
      }
      );
    }
  }
  openDialog(type: string) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      view: type,
      increaseFontSize: this.increaseFontSize
    }
    const dialogRef = this.dialog.open(DialogAddComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        switch (type) {
          case 'experience': {
            this.experienceList.push(response)
            break;
          }
          case 'skill': {
            this.skillsList.push(response)

            break;
          }
          case 'education': {
            this.educationList.push(response)
            break;
          }
        }
      }
    })
  }
  increaseLetterSize() {
    this.increaseFontSize = !this.increaseFontSize;
  }
  removeExperience(element: string): void {
    this.experienceList = this.experienceList.filter(e => e !== element);
  }
  removeSkill(element: string): void {
    this.skillsList = this.skillsList.filter(e => e !== element);
  }
  removeEducation(element: string): void {
    this.educationList = this.educationList.filter(e => e !== element);
  }
  removeLanguage(element: string): void {
    this.languageList = this.languageList.filter(e => e !== element);
  }
  addLanguage(): void {
    this.form.get('language')?.value;
    if (this.form.get('language')?.value && this.form.get('level')?.value) {
      this.languageList.push({
        language: this.form.get('language')?.value,
        level: this.form.get('level')?.value
      });
      this.form.patchValue({
        language: '',
        level: ''
      });
    }
  }
  onInputKeyPress(event: Event, fieldName: string): void {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      const inputValue = target.value;
      const onlyLetters = inputValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜ\s]/g, '');
      const fieldControl = this.form.get(fieldName);
      if (fieldControl) {
        fieldControl.setValue(onlyLetters);
      }
    }
    event.stopPropagation();
  }
  startVoiceRecognition(field: string) {
    if (annyang) {
      this.flagRecognitionFirstName = field === 'firstname' ? true : false
      this.flagRecognitionLastName = field === 'lastname' ? true : false
      annyang.removeCommands();
      let commands = {
        '*text': (text: string) => {
          this.form.controls[field].patchValue(text)
        }
      };
      annyang.addCommands(commands);
      annyang.setLanguage('es-ES');
      annyang.start();
      setTimeout(() => {
        annyang.abort();
        this.flagRecognitionFirstName = false
        this.flagRecognitionLastName = false
      }, 5000);

    } else {
      alert('El reconocimiento de voz no es compatible con este navegador.');
    }
  }

  playback() {
    if (!this.audio) {
      this.audio = new Audio('./../../../assets/audio/explanation.wav');
      this.audio.addEventListener('playing', () => {
        this.flagPlayback = true;
      });
      this.audio.addEventListener('ended', () => {
        this.flagPlayback = false;
      });
    }
    if (this.flagPlayback) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.flagPlayback = false;
    } else {
      this.audio.play();
      this.flagPlayback = true;
    }
  }
}
