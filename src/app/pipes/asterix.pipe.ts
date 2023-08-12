import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asterix'
})
export class AsterixPipe implements PipeTransform {
  V: any = ['a', 'e', 'i', 'u', 'o', 'y'];
  transform(ch: any) {
    let X: any;
    let result: any = '';
    for (let i = 0; i < ch.length; i++) {
      X = ch[i];
      for (let j = 0; j < this.V.length; j++) {
        if (ch[i].toLowerCase() == this.V[j]) {
          X = '*';
          break;
        }

      }
      result = result + X;
    }
    return result;
  }

}
