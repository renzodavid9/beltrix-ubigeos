"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_location_model_1 = require("./base-location.model");
/**
 * Clase que representa un Departamento, hereda de BaseLocation para obtener los atributos básicos de un ubigeo
 */
var Department = (function (_super) {
    __extends(Department, _super);
    function Department() {
        var _this = _super.call(this) || this;
        _this._provinces = new Map();
        return _this;
    }
    //Método para anadir una provincia hija
    Department.prototype.addProvince = function (province) {
        if (!this._provinces.has(province.code)) {
            this._provinces.set(province.code, province);
        }
    };
    return Department;
}(base_location_model_1.BaseLocation));
exports.Department = Department;
//# sourceMappingURL=department.model.js.map