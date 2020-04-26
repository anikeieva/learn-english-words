import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getText'
})
export class GetTextPipe implements PipeTransform {

  transform(value: string): string {
    const wordMatch: string = value && value.match(/({{\w+}})/)[0];
    const word: string = wordMatch && wordMatch.replace('{{', '').replace('}}', '');

    return value && value.replace(/({{\w+}})/g, `<span class="bold">${word}</span>`);
  }

}
