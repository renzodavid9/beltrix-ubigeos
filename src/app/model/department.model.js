"use strict";
var Department = (function () {
    function Department() {
    }
    Object.defineProperty(Department.prototype, "code", {
        get: function () {
            return this._code;
        },
        set: function (newCode) {
            this._code = newCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Department.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Department.prototype.addProvince = function (province) {
    };
    return Department;
}());
exports.Department = Department;
//# sourceMappingURL=department.model.js.map