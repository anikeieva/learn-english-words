import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getText'
})
export class GetTextPipe implements PipeTransform {

  transform(text: string, word: string = ''): string {
    const regExp: RegExp = new RegExp(word, 'gi');
    const currentWordMatch: string[] = text && text.match(regExp);
    const currentWord: string = currentWordMatch && currentWordMatch[0];

    return text && text.replace(regExp, `<span class="bold">${currentWord}</span>`);
  }

}
