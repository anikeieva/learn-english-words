export class Flashcard {
  constructor(private id: number,
              public word: string,
              public translation: string,
              public transcription: string,
              public examples: FlashcardExample[]) {
    this.id = id;
    this.word = word;
    this.translation = translation;
    this.transcription = transcription;
    this.examples = examples;
  }
}

export class FlashcardExample {
  constructor(public text: string,
              public image: string,
              public link?: string) {
    this.text = text;
    this.image = image;
    this.link = link;
  }
}
