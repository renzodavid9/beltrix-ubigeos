"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var department_model_1 = require("../model/department.model");
var province_model_1 = require("../model/province.model");
var district_model_1 = require("../model/district.model");
var LocationsService = (function () {
    /**
     * Servicio con la lógica de negocio encargada de recibir un string con la representacón del archivo txt, procesarlo y crear
     * las entidades y mapas correspondientes
     */
    function LocationsService() {
    }
    //Metodo para inicializar los ubigeos dada una data con el formato correcto
    LocationsService.prototype.initializeLocations = function (data) {
        //Se inicializan los mapas vacios
        this.departments = new Map();
        this.pronvinces = new Map();
        this.districts = new Map();
        //Bloque try catch para limpiar los mapas en caso que algo salga mal procesando la data
        try {
            //Se hace split por filas
            var rows = data.split(/\r?\n/);
            //Se recorre cada fila
            for (var i = 0; i < rows.length; i++) {
                //Se envía a interpretar cada fila por separado
                this.interpretRow(rows[i]);
            }
        }
        catch (e) {
            this.departments = null;
            this.pronvinces = null;
            this.districts = null;
            throw 'interpretingException';
        }
    };
    //Metodo encargado de interpretar cada fila de la data obtenida del archivo de texto.
    LocationsService.prototype.interpretRow = function (row) {
        //Se hace split por " para quitarlos
        var rowSplitted = row.split("\"");
        var rowWithoutQuotes;
        //Si se pudo hacer split y queda contenido valido se guarda en variable temporal
        if (rowSplitted.length >= 2) {
            //rowSplitted en la pos 1 representa sólo el contenido valido sin ""
            rowWithoutQuotes = rowSplitted[1];
            //Se separan los valores que vienen en la cadena
            var values = rowWithoutQuotes.split("/");
            //Se crea departamento
            if (values[0].trim().length > 0) {
                var department = this.createDepartment(values[0].trim());
                //Se crea provincia
                if (values[1].trim().length > 0) {
                    var province = this.createProvince(values[1].trim(), department);
                    //Se crea distrito
                    if (values[2].trim().length > 0) {
                        this.createDistrict(values[2].trim(), province);
                    }
                }
            }
        }
    };
    //Metodo que dado una data que representa un departamento, crea una entidad de tipo Department y la inserta al mapa departments
    LocationsService.prototype.createDepartment = function (data) {
        //Se obtiene el código único del departamento
        var code = (this.getValue(data, 0));
        //Si el departamenteo no se ha creado ya anteriormente
        if (!this.departments.has(code)) {
            //Se crea departamento vacio
            var newDepartment = new department_model_1.Department();
            //Se asigna codigo
            newDepartment.code = code;
            //Se asigna nombre
            newDepartment.name = this.getValue(data, 1);
            //Se insertra el departamento en el mapa de departamentos
            this.departments.set(code, newDepartment);
        }
        //Se retorna el departamento del mapa
        return this.departments.get(code);
    };
    //Metodo que dado una data que representa una provincia y su departamento padre, crea una entidad de tipo Province y la inserta al mapa provinces
    LocationsService.prototype.createProvince = function (data, department) {
        //Se obtiene el código único de la provincia
        var code = this.getValue(data, 0);
        var newProvince;
        //Si la provincia no se ha creado ya anteriormente
        if (!this.pronvinces.has(code)) {
            //Se crea provincia vacía
            newProvince = new province_model_1.Province();
            //Se asigna el código
            newProvince.code = code;
            //Se asigna el nombre
            newProvince.name = this.getValue(data, 1);
            //Se asigna el departamento padre
            newProvince.father = department;
            //Se inserta al mapa de provinces
            this.pronvinces.set(code, newProvince);
        }
        //Se obtiene la provincia y se asocia al mapa interno de provincias del departamento papá
        newProvince = this.pronvinces.get(code);
        department.addProvince(newProvince);
        return newProvince;
    };
    //Metodo que dado una data que representa un distrito y su provincia Padre, crea una entidad de tipo Province y la inserta al mapa provinces
    LocationsService.prototype.createDistrict = function (data, province) {
        //Se obtiene el código único de distrito
        var code = this.getValue(data, 0);
        var newDistrict;
        //Se verifica si el distrito ya existe en el mapa de distritos. Si no existe se crea uno nuevo y se inserta
        if (!this.districts.has(code)) {
            newDistrict = new district_model_1.District();
            newDistrict.code = code;
            newDistrict.name = this.getValue(data, 1);
            newDistrict.father = province; //Se asigna la provincia padre
            this.districts.set(code, newDistrict); //Se inserta al mapa
        }
        //Se obtiene el distrito del mapa
        newDistrict = this.districts.get(code);
        //Se anade el distrito a la lista de distritos hijos de la provincia padre
        province.addDistrict(newDistrict);
        return newDistrict;
    };
    /**
     * Método que dado una cadena correspondiente al código unico de un ubigeo, su nombre y una posición, retorna el valor pedido:
     * Si pos es 0 : retorna el código único
     * Si pos es 1 : retorna el nombre
     */
    LocationsService.prototype.getValue = function (data, pos) {
        //Se separa la cadena con los dos valores sólo por el primer espacio que se encuentres
        var values = data.match(/^(\S+)\s(.*)/).slice(1);
        if (values.length > pos) {
            return values[pos];
        }
        return null;
    };
    //Retora el mapa de Departamentos
    LocationsService.prototype.getDepartments = function () {
        return this.departments;
    };
    //Retora el mapa de Distritos
    LocationsService.prototype.getDistricts = function () {
        return this.districts;
    };
    //Retora el mapa de Provincias
    LocationsService.prototype.getProvinces = function () {
        return this.pronvinces;
    };
    return LocationsService;
}());
LocationsService = __decorate([
    core_1.Injectable()
], LocationsService);
exports.LocationsService = LocationsService;
//# sourceMappingURL=locations.service.js.map