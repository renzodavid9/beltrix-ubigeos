"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_location_model_1 = require("./base-location.model");
/**
 * Clase que representa una Provincia, hereda de BaseLocation para obtener los atributos básicos de un ubigeo
 */
var Province = (function (_super) {
    __extends(Province, _super);
    function Province() {
        var _this = _super.call(this) || this;
        _this._districts = new Map();
        return _this;
    }
    //Método para insertar un distrito hijo
    Province.prototype.addDistrict = function (district) {
        if (!this._districts.has(district.code)) {
            this._districts.set(district.code, district);
        }
    };
    return Province;
}(base_location_model_1.BaseLocation));
exports.Province = Province;
//# sourceMappingURL=province.model.js.map