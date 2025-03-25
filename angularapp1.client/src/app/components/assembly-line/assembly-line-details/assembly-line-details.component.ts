import { Component, OnInit } from '@angular/core';
import { AssemblyLine, AssemblyLineService } from '../../../services/assembly-line.service';
import { ActivatedRoute } from '@angular/router';
import { Station, StationService } from '../../../services/station.service';

@Component({
  selector: 'app-assembly-line-details',
  templateUrl: './assembly-line-details.component.html',
  styleUrls: ['./assembly-line-details.component.css']
})
export class AssemblyLineDetailsComponent implements OnInit {
  assemblyLine: AssemblyLine | undefined;
  stations: Station[] = [];

  constructor(
    private route: ActivatedRoute,
    private assemblyLineService: AssemblyLineService,
    private stationService: StationService
  ) { }

  ngOnInit(): void {
    const assemblyLineID = Number(this.route.snapshot.paramMap.get('lineID'));
    this.loadAssemblyLine(assemblyLineID);
    this.loadStations(assemblyLineID);
  }

  loadAssemblyLine(assemblyLineID: number): void {
    this.assemblyLineService.getAssemblyLineByID(assemblyLineID).subscribe((assemblyLine) => {
      this.assemblyLine = assemblyLine;
    }, error => {
      console.error('Error loading assembly line', error);
    });
  }

  loadStations(assemblyLineID: number): void {
    this.stationService.getStationByAssemblyLine(assemblyLineID).subscribe((stations) => {
      this.stations = stations;
      if (this.stations.length > 0) {
        console.log('Stations loaded:', this.stations);
      }
    }, error => {
      console.error('Error loading stations', error);
    });
  }

  deleteStation(stationID: number): void {
    if (confirm('Are you sure you want to delete this station?')) {
      this.stationService.deleteStation(stationID).subscribe(() => {
        this.stations = this.stations.filter(al => al.stationID !== stationID);
      }, error => {
        console.error('Error deleting station', error);
      });
    }
  }
}
