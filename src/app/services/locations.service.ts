import { Injectable } from '@angular/core';
import { Department } from '../model/department.model';
import { Province } from '../model/province.model';
import { District } from '../model/district.model';
import { BaseLocation } from '../model/base-location.model';

@Injectable()
/**
 * Servicio con la lógica de negocio encargada de recibir un string con la representacón del archivo txt, procesarlo y crear
 * las entidades y mapas correspondientes
 */
export class LocationsService {
    //Mapa que representa la tabla de departamentes
    private departments: Map<string,BaseLocation>;
    //Mapa que representa la tabla de provincias
    private pronvinces : Map<string,BaseLocation>;
    //Mapa que representa la tabla de distritos
    private districts : Map<string,BaseLocation>;

    //Metodo para inicializar los ubigeos dada una data con el formato correcto
    initializeLocations( data : any ): void{
        //Se inicializan los mapas vacios
        this.departments = new Map<string,BaseLocation>();
        this.pronvinces = new Map<string,BaseLocation>();
        this.districts = new Map<string,BaseLocation>();
        //Bloque try catch para limpiar los mapas en caso que algo salga mal procesando la data
        try{
            //Se hace split por filas
            let rows = data.split(/\r?\n/);

            //Se recorre cada fila
            for (let i = 0; i < rows.length; i++){
                //Se envía a interpretar cada fila por separado
                this.interpretRow(rows[i]);
            }
        }catch(e){//Si ocurre un error interpretando el archivo se resetean todos los mapas
            this.departments = null;
            this.pronvinces = null;
            this.districts = null;
            throw 'interpretingException';
        }

    }
    //Metodo encargado de interpretar cada fila de la data obtenida del archivo de texto.
    private interpretRow (row : string): void{
        //Se hace split por " para quitarlos
        let rowSplitted = row.split("\"");
        let rowWithoutQuotes;
        //Si se pudo hacer split y queda contenido valido se guarda en variable temporal
        if (rowSplitted.length >= 2){
            //rowSplitted en la pos 1 representa sólo el contenido valido sin ""
            rowWithoutQuotes = rowSplitted[1];
            //Se separan los valores que vienen en la cadena
            let values = rowWithoutQuotes.split("/");
            
            //Se crea departamento
            if (values[0].trim().length > 0){
                let department: Department = this.createDepartment(values[0].trim());
                
                //Se crea provincia
                if (values[1].trim().length > 0){
                    let province: Province = this.createProvince(values[1].trim(),department);

                    //Se crea distrito
                    if (values[2].trim().length > 0){
                        this.createDistrict(values[2].trim(),province);
                    }

                }
            }
        }

    }

    //Metodo que dado una data que representa un departamento, crea una entidad de tipo Department y la inserta al mapa departments
    private createDepartment(data: string): Department{
        //Se obtiene el código único del departamento
        let code : string = (this.getValue(data,0));
        //Si el departamenteo no se ha creado ya anteriormente
        if (!this.departments.has(code)){
            //Se crea departamento vacio
            let newDepartment = new Department();
            //Se asigna codigo
            newDepartment.code = code;
            //Se asigna nombre
            newDepartment.name = this.getValue(data,1);
            //Se insertra el departamento en el mapa de departamentos
            this.departments.set(code,newDepartment);
        }
        //Se retorna el departamento del mapa
        return this.departments.get(code) as Department;
    }

    //Metodo que dado una data que representa una provincia y su departamento padre, crea una entidad de tipo Province y la inserta al mapa provinces
    private createProvince(data: string, department: Department): Province{
        //Se obtiene el código único de la provincia
        let code : string = this.getValue(data,0);
        let newProvince: Province;
        //Si la provincia no se ha creado ya anteriormente
        if (!this.pronvinces.has(code)){
            //Se crea provincia vacía
            newProvince = new Province();
            //Se asigna el código
            newProvince.code = code;
            //Se asigna el nombre
            newProvince.name = this.getValue(data,1);
            //Se asigna el departamento padre
            newProvince.father = department;
            //Se inserta al mapa de provinces
            this.pronvinces.set(code,newProvince);
        }
        //Se obtiene la provincia y se asocia al mapa interno de provincias del departamento papá
        newProvince = this.pronvinces.get(code) as Province;
        department.addProvince(newProvince);
        return newProvince;
    }

    //Metodo que dado una data que representa un distrito y su provincia Padre, crea una entidad de tipo Province y la inserta al mapa provinces
    private createDistrict(data: string, province: Province): District{
        //Se obtiene el código único de distrito
        let code : string = this.getValue(data,0);
        let newDistrict: District;
        //Se verifica si el distrito ya existe en el mapa de distritos. Si no existe se crea uno nuevo y se inserta
        if (!this.districts.has(code)){
            newDistrict = new District();
            newDistrict.code = code;
            newDistrict.name = this.getValue(data,1);
            newDistrict.father = province;//Se asigna la provincia padre
            this.districts.set(code,newDistrict);//Se inserta al mapa
        }
        //Se obtiene el distrito del mapa
        newDistrict = this.districts.get(code) as District;
        //Se anade el distrito a la lista de distritos hijos de la provincia padre
        province.addDistrict(newDistrict);
        return newDistrict;
    }

    /**
     * Método que dado una cadena correspondiente al código unico de un ubigeo, su nombre y una posición, retorna el valor pedido:
     * Si pos es 0 : retorna el código único
     * Si pos es 1 : retorna el nombre
     */
    private getValue(data: string, pos: number):string{
        //Se separa la cadena con los dos valores sólo por el primer espacio que se encuentres
        let values = data.match(/^(\S+)\s(.*)/).slice(1);
        if (values.length > pos){
            return values[pos];
        }
        return null;
    }

    //Retora el mapa de Departamentos
    getDepartments(): Map<string,BaseLocation>{
        return this.departments;
    }
    //Retora el mapa de Distritos
    getDistricts(): Map<string,BaseLocation>{
        return this.districts;
    }
    //Retora el mapa de Provincias
    getProvinces(): Map<string,BaseLocation>{
        return this.pronvinces;
    }

}