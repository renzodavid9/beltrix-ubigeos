"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_location_model_1 = require("./base-location.model");
/**
 * Clase que representa un Distrito, hereda de BaseLocation para obtener los atributos básicos de un ubigeo
 */
var District = (function (_super) {
    __extends(District, _super);
    function District() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return District;
}(base_location_model_1.BaseLocation));
exports.District = District;
//# sourceMappingURL=district.model.js.map