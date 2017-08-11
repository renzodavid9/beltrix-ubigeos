"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var department_model_1 = require("../model/department.model");
var LocationsService = (function () {
    function LocationsService() {
        this.departments = new Map();
        this.pronvinces = new Map();
        this.district = new Map();
    }
    //Metodo para inicializar los ubigeos dada una data con el formato correcto
    LocationsService.prototype.initializeLocations = function (data) {
        //Se hace split por filas
        var rows = data.split(/\r?\n/);
        //Se recorre cada fila
        for (var i = 0; i < rows.length; i++) {
            //Se envía a interpretar cada fila por separado
            this.interpretRow(rows[i]);
        }
    };
    LocationsService.prototype.interpretRow = function (row) {
        //Se hace split por "
        var rowSplitted = row.split("\"");
        var rowWithoutQuotes;
        //Si se pudo hacer split y queda contenido valido se guarda en variable temporal
        if (rowSplitted.length >= 2) {
            rowWithoutQuotes = rowSplitted[1];
            //Se separan los valores que vienen en la cadena
            var values = rowWithoutQuotes.split("/");
            //Se crea departamento
            if (values[0].trim().length > 0) {
                var newDepartment = this.createDepartment(values[0].trim());
                //Se crea provincia
                if (values[1].trim().length > 0) {
                    this.createProvince(values[1].trim());
                    //Se crea distrito
                    if (values[2].trim().length > 0) {
                        this.createDistrict(values[2].trim());
                    }
                }
            }
        }
    };
    LocationsService.prototype.createDepartment = function (data) {
        var code = Number(this.getValue(data, 0));
        if (!this.departments.has(code)) {
            var newDepartment = new department_model_1.Department();
            newDepartment.code = code;
            newDepartment.name = this.getValue(data, 1);
            this.departments.set(code, newDepartment);
        }
        return this.departments.get(code);
    };
    LocationsService.prototype.createProvince = function (data) {
    };
    LocationsService.prototype.createDistrict = function (data) {
    };
    LocationsService.prototype.getValue = function (data, pos) {
        var values = data.split(" ");
        if (values.length > pos) {
            return values[pos];
        }
        return null;
    };
    LocationsService.prototype.getDepartments = function () {
        return this.departments;
    };
    return LocationsService;
}());
LocationsService = __decorate([
    core_1.Injectable()
], LocationsService);
exports.LocationsService = LocationsService;
//# sourceMappingURL=locations.service.js.map