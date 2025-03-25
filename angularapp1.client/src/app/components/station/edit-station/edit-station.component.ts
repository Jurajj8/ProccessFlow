import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Station, StationService } from '../../../services/station.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-station',
  templateUrl: './edit-station.component.html',
  styleUrl: './edit-station.component.css'
})
export class EditStationComponent implements OnInit {
  station: Station | null = null;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private stationService: StationService,
    private _location: Location
  ) { };

  ngOnInit(): void {
    const stationID = this.route.snapshot.paramMap.get('stationID');
    console.log('id:' + stationID);
    if (stationID) {
      this.stationService.getStationsByID(+stationID).subscribe({
        next: (data) => {
          this.station = data;
          console.log('Loaded Station:', this.station);
        },
        error: (err) => console.error('Error loading Station', err),
      });
    }
  }

  updateStation(): void {
    if (!this.station) return;

    console.log('Updating Station:', this.station);


    this.stationService.updateStation(this.station).subscribe({
      next: () => {
        console.log('Station updated successfuly');
        this.back();
      },
      error: (err) => {
        console.error('Error updating Station', err);
      },
    });
  }

  back(): void {
    this._location.back();
  }
}
