import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-flashcard',
  templateUrl: './add-flashcard.component.html',
  styleUrls: ['./add-flashcard.component.scss']
})
export class AddFlashcardComponent implements OnInit {
  flashCard: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddFlashcardComponent>
  ) { }

  ngOnInit() {
    this.flashCard = new FormGroup({
      word: new FormControl('', [Validators.required]),
      translation: new FormControl('', [Validators.required]),
      transcription: new FormControl('', [Validators.required]),
      text: new FormControl(''),
      image: new FormControl(''),
      link: new FormControl('')
    });
  }

  closeDialog(flashcard?: FormGroup) {
    this.dialogRef.close(flashcard);
  }

  addCard() {
    console.log('addCard', this.flashCard);
    this.closeDialog(this.flashCard);
  }

  private addImage(element) {
    const file = element && element.target && element.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.flashCard.patchValue({image: reader.result});
    };

    reader.readAsDataURL(file);
  }
}
