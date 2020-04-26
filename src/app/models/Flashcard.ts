export interface Flashcard {
  word: string;
  translation: string;
  transcription: string;
  examples: FlashcardExample[];
}

export interface FlashcardExample {
  text: string;
  image: string;
  link?: string;
}
