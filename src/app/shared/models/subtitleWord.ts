export class SubtitleWord {
  constructor(
    public startTime: number,
    public endTime: number,
    public text: string,
    public wordList: WordList[],
    public active: boolean
  ) {
  }
}

export class WordList {
  constructor(
      public fullText: string,
      public wordForTranslate: string,
      public restText: string,
      public isNewLine: boolean = false
  ) {
  }
}
