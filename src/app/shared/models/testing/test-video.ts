import {Video} from '../video';

export function getTestVideos(): Video[] {
  return [
    {
      id: '1',
      name: 'Gilmore Girls',
      type: 'serial',
      image: 'Gilmore_Girls.jpg',
      seasons: [
        {
          id: '1',
          seasonNumber: 5,
          episodesList: [
            {
              id: '1',
              videoSrc: 'assets/videos/Gilmore_Girls-5x09.mp4',
              enSubtitlesSrc: 'assets/videos/Gilmore_Girls_5-09.en.vtt',
              ruSubtitlesSrc: '',
              episodeNumber: 9
            },
            {
              id: '2',
              videoSrc: 'assets/videos/Gilmore_Girls-5x19.mp4',
              enSubtitlesSrc: 'assets/videos/Gilmore_Girls_5x19.en.srt',
              ruSubtitlesSrc: 'assets/videos/gilmore.girls.5x19.ru.srt',
              episodeNumber: 19
            }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Friends',
      type: 'serial',
      image: 'Friends.jpg',
      seasons: [
        {
          id: '1',
          seasonNumber: 1,
          episodesList: [
            {
              id: '1',
              videoSrc: 'assets/videos/Friends.S01E01.The.One.Where.Monica.Gets.a.Roommate.mp4',
              enSubtitlesSrc: 'assets/videos/[SubtitleTools.com] Friends - 1x01 - The One Where Monica Gets A Roommate.en.srt',
              ruSubtitlesSrc: 'assets/videos/Friends - 1x01 - The One Where Monica Gets A Roommate.ru.srt',
              episodeNumber: 1
            }
          ]
        }
      ]
    }
  ];
}
