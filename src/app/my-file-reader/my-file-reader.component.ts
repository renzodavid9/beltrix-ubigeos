import {Component} from '@angular/core';
import {LocationsService} from '../services/locations.service';

@Component({
  selector: 'my-file-reader',
  templateUrl: './my-file-reader.component.html',
  styleUrls: ['./my-file-reader.component.css'],
  providers: [LocationsService],
})
//Componente para leer y enviar a interpretar el archivo plano con los ubigeos
export class MyFileReaderComponent{

    constructor (private locationsService : LocationsService){}

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

    parseInputFile(event : any) : void{
        //Se obtiene el valor del archivo plano
        let data = event.target.result
        //Se envía al servicio para que lo interprete y construya mapa de ubigeos
        this.locationsService.initializeLocations(data);
    }
}