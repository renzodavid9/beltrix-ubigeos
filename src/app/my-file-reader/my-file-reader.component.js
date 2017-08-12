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
var locations_service_1 = require("../services/locations.service");
var MyFileReaderComponent = (function () {
    function MyFileReaderComponent(locationsService) {
        this.locationsService = locationsService;
        //Emiter para avisar al componente padre cuando se han cargado los ubigeos y poder refrescar las tablas donde se muestran
        this.onLoad = new core_1.EventEmitter();
    }
    /**
     * Método que se usa cuando se carga un archivo por el input type file. Agarra le archivo de entrada y lo envía al servicio para
     * construir los ubigeos
     */
    MyFileReaderComponent.prototype.loadFile = function (event) {
        //Se obtiene el archivo de texto
        var file = event.target.files[0];
        //Se valida que se cargara un archivo y se lee
        if (file !== undefined) {
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = this.parseInputFile.bind(this);
        }
    };
    //Método que se dispara cuando se ha podido leer exitosamente el archivo
    MyFileReaderComponent.prototype.parseInputFile = function (event) {
        //Se obtiene el valor del archivo plano
        var data = event.target.result;
        try {
            //Se envía al servicio para que lo interprete y construya mapa de ubigeos
            this.locationsService.initializeLocations(data);
            console.log(this.locationsService.getDepartments());
            //Se cambia valor para avisar que se ha cargado el archivo exitosamente
            this.onLoad.emit(true);
        }
        catch (e) {
            alert("Ocurrio un error cargando el archivo. Por favor verifique la extensión y formato de este.");
            this.onLoad.emit(false);
        }
    };
    return MyFileReaderComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MyFileReaderComponent.prototype, "onLoad", void 0);
MyFileReaderComponent = __decorate([
    core_1.Component({
        selector: 'my-file-reader',
        templateUrl: './my-file-reader.component.html',
        styleUrls: ['app/my-file-reader/my-file-reader.component.css'],
    }),
    __metadata("design:paramtypes", [locations_service_1.LocationsService])
], MyFileReaderComponent);
exports.MyFileReaderComponent = MyFileReaderComponent;
//# sourceMappingURL=my-file-reader.component.js.map