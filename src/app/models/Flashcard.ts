export interface Flashcard {
  word: string;
  translate: string;
  transcription: string;
  examples: FlashcardExample[];
}

export interface FlashcardExample {
  text: string;
  image: string;
  link?: string;
}
