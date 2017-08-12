import { Province } from './province.model';
import { BaseLocation } from './base-location.model';

/**
 * Clase que representa un Departamento, hereda de BaseLocation para obtener los atributos básicos de un ubigeo
 */
export class Department extends BaseLocation{
    //Mapa de provincias hijas 
    private _provinces: Map<string, Province>;

    constructor(){
        super();
        this._provinces = new Map<string,Province>();
    }

    //Método para anadir una provincia hija
    public addProvince(province: Province): void{
        if (!this._provinces.has(province.code)){
            this._provinces.set(province.code,province);
        }
    }
}