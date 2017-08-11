import { Injectable } from '@angular/core';
import { Department } from '../model/department.model';
import { Province } from '../model/province.model';
import { District } from '../model/district.model';

@Injectable()
export class LocationsService {

    private departments: Map<number,Department> = new Map<number,Department>();
    private pronvinces : Map<number,Province> = new Map<number,Province>();
    private district : Map<number,District> = new Map<number,District>();

    //Metodo para inicializar los ubigeos dada una data con el formato correcto
    initializeLocations( data : any ): void{
        //Se hace split por filas
        let rows = data.split(/\r?\n/);

        //Se recorre cada fila
        for (let i = 0; i < rows.length; i++){
            //Se envía a interpretar cada fila por separado
            this.interpretRow(rows[i]);
        }

    }

    private interpretRow (row : string): void{
        //Se hace split por "
        let rowSplitted = row.split("\"");
        let rowWithoutQuotes;
        //Si se pudo hacer split y queda contenido valido se guarda en variable temporal
        if (rowSplitted.length >= 2){
            rowWithoutQuotes = rowSplitted[1];
            //Se separan los valores que vienen en la cadena
            let values = rowWithoutQuotes.split("/");
            
            //Se crea departamento
            if (values[0].trim().length > 0){
                let department = this.createDepartment(values[0].trim());
                
                //Se crea provincia
                if (values[1].trim().length > 0){
                    let province = this.createProvince(values[1].trim(),department);

                    //Se crea distrito
                    if (values[2].trim().length > 0){
                        this.createDistrict(values[2].trim());
                    }

                }
            }
        }

    }

    private createDepartment(data: string): Department{
        let code : number = Number(this.getValue(data,0));
        if (!this.departments.has(code)){
            let newDepartment = new Department();
            newDepartment.code = code;
            newDepartment.name = this.getValue(data,1);
            this.departments.set(code,newDepartment);
        }
        return this.departments.get(code);
    }

    private createProvince(data: string, department: Department): Province{
        let code : number = Number(this.getValue(data,0));
        let newProvince: Province;
        if (!this.pronvinces.has(code)){
            newProvince = new Province();
            newProvince.code = code;
            newProvince.name = this.getValue(data,1);
            newProvince.father = department;
            this.pronvinces.set(code,newProvince);
        }
        newProvince = this.pronvinces.get(code);
        department.addProvince(newProvince);
        return newProvince;
    }

    private createDistrict(data: string): District{

    }

    private getValue(data: string, pos: number):string{
        let values = data.split(" ");
        if (values.length > pos){
            return values[pos];
        }
        return null;
    }

    getDepartments(): Map<number,Department>{
        return this.departments;
    }

}