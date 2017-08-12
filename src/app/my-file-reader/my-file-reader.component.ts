import {Component, Output, EventEmitter} from '@angular/core';
import {LocationsService} from '../services/locations.service';

@Component({
  selector: 'my-file-reader',
  templateUrl: './my-file-reader.component.html',
  styleUrls: ['app/my-file-reader/my-file-reader.component.css'],
})
//Componente para leer y enviar a interpretar el archivo plano con info de los ubigeos
export class MyFileReaderComponent{

    //Emiter para avisar al componente padre cuando se han cargado los ubigeos y poder refrescar las tablas donde se muestran
    @Output() onLoad = new EventEmitter<boolean>();

    constructor (private locationsService : LocationsService){}
    
    /**
     * Método que se usa cuando se carga un archivo por el input type file. Agarra le archivo de entrada y lo envía al servicio para 
     * construir los ubigeos
     */
    loadFile(event : any) : void {
        //Se obtiene el archivo de texto
        let file : File = event.target.files[0];

        //Se valida que se cargara un archivo y se lee
        if (file !== undefined){
            let reader : FileReader = new FileReader();
            reader.readAsText(file);
            reader.onload = this.parseInputFile.bind(this);
        }
    }
    //Método que se dispara cuando se ha podido leer exitosamente el archivo
    parseInputFile(event : any) : void{
        //Se obtiene el valor del archivo plano
        let data = event.target.result;
        try{
            //Se envía al servicio para que lo interprete y construya mapa de ubigeos
            this.locationsService.initializeLocations(data);
            console.log(this.locationsService.getDepartments());
            //Se cambia valor para avisar que se ha cargado el archivo exitosamente
            this.onLoad.emit(true);
        }catch(e){
            alert("Ocurrio un error cargando el archivo. Por favor verifique la extensión y formato de este.");
            this.onLoad.emit(false);
        }
    }
}