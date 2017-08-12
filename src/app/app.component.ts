import { Component, OnInit } from '@angular/core';

import {MyFileReaderComponent} from './my-file-reader/my-file-reader.component';
import {LocationTableComponent} from './location-table/location-table.component';

import {BaseLocation} from './model/base-location.model';

import {LocationsService } from './services/locations.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['app/app.component.css'],
  providers: [LocationsService],
})
export class AppComponent implements OnInit{ 
  //Mapa que representa la tabla de departamentes
  department : Map<string, BaseLocation>;
  //Mapa que representa la tabla de provincias
  province : Map<string, BaseLocation>;
  //Mapa que representa la tabla de distritos
  district : Map<string, BaseLocation>;

  constructor (private locationsService: LocationsService){}

  //Se inicializan los ubigeos en null
  ngOnInit(): void {
    this.initializeLocations();
  }

  //Método para sincronizar los ubigeos del servicio con los del componente
  initializeLocations(): void{
    this.department = this.locationsService.getDepartments();
    this.district = this.locationsService.getDistricts();
    this.province = this.locationsService.getProvinces();
  }

  //Listener para escuchar cuando cambian los ubigeos por el componente del MyfileReader
  onLoad (loaded: boolean){
    if (true == loaded){
      //Se sincronizan los ubigeos del componente para que se visualicen en el componente LocationTable
      this.initializeLocations();
    }
  }

}
