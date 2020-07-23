export class Video {
  constructor(
    public id: string,
    public name: string,
    public type: VideoType,
    public seasons: Season[],
    public image: string,
    public showSeasons?: boolean,
  ) {
  }
}

export class Season {
  constructor(
    public id: string,
    public seasonNumber: number,
    public episodesList: Episode[],
    public showEpisodes?: boolean
  ) {
  }
}


export class Episode {
  constructor(
    public id: string,
    public videoSrc: string,
    public enSubtitlesSrc: string,
    public ruSubtitlesSrc: string,
    public episodeNumber: number
  ) {
  }
}

export type VideoType = 'film' | 'serial';
