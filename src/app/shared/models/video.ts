export class Video {
  constructor(
    public videoSrc: string,
    public enSubtitlesSrc: string,
    public ruSubtitlesSrc: string,
    public name: string,
    public season: number,
    public episode: number,
    public id?: string
  ) {
  }
}
