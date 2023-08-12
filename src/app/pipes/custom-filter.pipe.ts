import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter'
})
export class CustomFilterPipe implements PipeTransform {

  transform(T: any, x: string): any {
    if (x === undefined) {
      return (T);
    }
    return (T.filter(
      (obj:any)=>{return obj.teamOne.toLowerCase().includes(x.toLowerCase()) || obj.teamTwo.toLowerCase().includes(x.toLowerCase())}
    ))
  }

}
