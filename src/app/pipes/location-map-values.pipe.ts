import {Pipe, PipeTransform} from '@angular/core';

import {BaseLocation} from '../model/base-location.model';

/**
 * Pipe usado para pasar un mapa de ubigeos a una lista y poder pintarla usando un ngFor
 */
@Pipe({name: 'locationMapValues'})
export class LocationMapValuesPipe implements PipeTransform {
    transform(value: Map<number,BaseLocation>, args: string[]): BaseLocation[] {
        let returnArray:BaseLocation[] = [];

        value.forEach((entryVal: BaseLocation, entryKey: number) => {
            returnArray.push(entryVal);
        });

        return returnArray;
    }
}