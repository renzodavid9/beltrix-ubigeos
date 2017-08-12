import {Component , Input} from '@angular/core';
import {BaseLocation} from '../model/base-location.model';

@Component({
  selector: 'location-table',
  templateUrl: './location-table.component.html',
  styleUrls: ['app/location-table/location-table.component.css'],
})
//Componente para pintar tabla de ubigeo
export class LocationTableComponent{
    //Tabla con la información del ubigio correspondiente a ser pintado
    @Input() locations : Map<string,BaseLocation>;
    //Nombre de la tabla usado como título
    @Input() title : string;
}