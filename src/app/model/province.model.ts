import { District } from './district.model';
import { Department } from './department.model';
import { BaseLocation } from './base-location.model';
/**
 * Clase que representa una Provincia, hereda de BaseLocation para obtener los atributos básicos de un ubigeo
 */
export class Province extends BaseLocation{
    //Mapa de distritos hijos
    private _districts: Map<string,District>;

    constructor(){
        super();
        this._districts = new Map<string,District>();
    }
    //Método para insertar un distrito hijo
    public addDistrict(district: District): void{
        if (!this._districts.has(district.code)){
            this._districts.set(district.code,district);
        }
    }
}