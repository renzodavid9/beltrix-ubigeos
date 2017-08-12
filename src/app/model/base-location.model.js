"use strict";
/**
 * Clase que representa una aentidad de Ubigeo básica con sus datos básicos
 * Se crea abstracta para que no pueda ser instanciada directamente
 */
var BaseLocation = (function () {
    function BaseLocation() {
    }
    Object.defineProperty(BaseLocation.prototype, "code", {
        get: function () {
            return this._code;
        },
        set: function (newCode) {
            this._code = newCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseLocation.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseLocation.prototype, "father", {
        get: function () {
            return this._father;
        },
        set: function (father) {
            this._father = father;
        },
        enumerable: true,
        configurable: true
    });
    return BaseLocation;
}());
exports.BaseLocation = BaseLocation;
//# sourceMappingURL=base-location.model.js.map