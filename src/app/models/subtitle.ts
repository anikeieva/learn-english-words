export class Subtitle {
  constructor(
    public startTime: number,
    public endTime: number,
    public text: string,
    public wordList: string[],
    public active: boolean
  ) {
  }
}
