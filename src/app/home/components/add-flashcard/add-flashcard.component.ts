import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Flashcard, FlashcardExample } from '../../../shared/models/Flashcard';

@Component({
  selector: 'app-add-flashcard',
  templateUrl: './add-flashcard.component.html',
  styleUrls: ['./add-flashcard.component.scss']
})
export class AddFlashcardComponent implements OnInit {
  flashCardForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddFlashcardComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    if (!this.data) {
      this.data = {
        word: '',
        text: '',
        link: ''
      };
    }

    const {word, text, link} = this.data;

    this.flashCardForm = new FormGroup({
      word: new FormControl(word, [Validators.required]),
      translation: new FormControl('', [Validators.required]),
      transcription: new FormControl('', [Validators.required]),
      text: new FormControl(text, [Validators.required]),
      image: new FormControl('', [Validators.required]),
      link: new FormControl(link)
    });
  }

  closeDialog(flashcard?: Flashcard) {
    this.dialogRef.close(flashcard);
  }

  addCard() {
    const flashCard: Flashcard = this.createFlashcard();

    this.closeDialog(flashCard);
  }

  private createFlashcard(): Flashcard {
    const example: FlashcardExample = new FlashcardExample(this.flashCardForm.value.text,
      this.flashCardForm.value.image, this.flashCardForm.value.link);
    const examples: FlashcardExample[] = [];

    examples.push(example);

    return new Flashcard(this.flashCardForm.value.word,
      this.flashCardForm.value.translation, this.flashCardForm.value.transcription, examples);
  }

  // private addImage(element) {
  //   const file = element && element.target && element.target.files[0];
  //   const reader = new FileReader();
  //
  //   reader.onloadend = () => {
  //     this.flashCardForm.patchValue({image: reader.result});
  //   };
  //
  //   reader.readAsDataURL(file);
  // }
}
