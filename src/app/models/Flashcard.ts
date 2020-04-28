export class Flashcard {
  constructor(
    public word: string,
    public translation: string,
    public transcription: string,
    public examples: FlashcardExample[],
    public id?: number
  ) {}
}

export class FlashcardExample {
  constructor(
    public text: string,
    public image: string,
    public link?: string
  ) {}
}
