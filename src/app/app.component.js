"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var locations_service_1 = require("./services/locations.service");
var AppComponent = (function () {
    function AppComponent(locationsService) {
        this.locationsService = locationsService;
    }
    //Se inicializan los ubigeos en null
    AppComponent.prototype.ngOnInit = function () {
        this.initializeLocations();
    };
    //Método para sincronizar los ubigeos del servicio con los del componente
    AppComponent.prototype.initializeLocations = function () {
        this.department = this.locationsService.getDepartments();
        this.district = this.locationsService.getDistricts();
        this.province = this.locationsService.getProvinces();
    };
    //Listener para escuchar cuando cambian los ubigeos por el componente del MyfileReader
    AppComponent.prototype.onLoad = function (loaded) {
        if (true == loaded) {
            //Se sincronizan los ubigeos del componente para que se visualicen en el componente LocationTable
            this.initializeLocations();
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.component.html',
        styleUrls: ['app/app.component.css'],
        providers: [locations_service_1.LocationsService],
    }),
    __metadata("design:paramtypes", [locations_service_1.LocationsService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map