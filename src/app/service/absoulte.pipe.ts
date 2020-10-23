
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'abs'
})

export class AbsoultePipe implements PipeTransform {
    transform(num: number, ...args: any[]): any {
        return Math.abs(num);
    }
}