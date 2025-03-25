import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Station, StationService } from '../../../services/station.service';
import { AssemblyLine, AssemblyLineService } from '../../../services/assembly-line.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrl: './add-station.component.css'
})
export class AddStationComponent implements OnInit {
  newStation: Station = {
    stationID: 0,
    name: '',
    description: '',
    assemblyLineID: 0
  };
  assemblyLines: AssemblyLine[] = [];
  assemblyLineId: number | null = null;


  constructor(private assemblyLineService: AssemblyLineService, public router: Router, private stationService: StationService,private _location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.extractAssemblyLineId();
    this.loadAssemblyStations();
  }

  loadAssemblyStations() {
    this.assemblyLineService.getAssemblyLines().subscribe((assemblyLines) => {
      this.assemblyLines = assemblyLines;
    }, error => {
      console.error('Error loading assembly lines', error);
    });
  }

  extractAssemblyLineId() {
    this.route.paramMap.subscribe(params => {
      const assemblyLineIdParam = params.get('lineID');
      if (assemblyLineIdParam !== null) {
        this.assemblyLineId = +assemblyLineIdParam;
        this.newStation.assemblyLineID = this.assemblyLineId;
        console.log('Assembly Line ID:', this.assemblyLineId);
      } else {
        console.error('Assembly Line ID parameter is missing');
      }
    });
  }

  addStation(): void {
    if (this.newStation.name.length > 1 && this.newStation.description.length > 1 && this.newStation.assemblyLineID) {
      this.stationService.addStation(this.newStation).subscribe((station) => {
        this.back();
      }, error => {
        console.error('Error adding Station', error);
      });
    } else {
      console.error('Validation failed: All fields are required.');
    }
  }

  back(): void {
    this._location.back();
  }
}
