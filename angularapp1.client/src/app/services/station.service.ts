import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface Station {
  stationID: number
  assemblyLineID: number
  name: string
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class StationService {
  private ApiURL = environment.apiURL + '/Stations';

  constructor(private http: HttpClient) { }

  getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(this.ApiURL);
  }
  getStationsByID(id: number): Observable<Station> {
    return this.http.get<Station>(`${this.ApiURL}/${id}`);
  }

  getStationByAssemblyLine(assemblyLineID: number): Observable<Station[]> {
    return this.http.get<Station[]>(`${this.ApiURL}?AssemblyLineID=${assemblyLineID}`);
  }

  addStation(station: Station): Observable<Station> {
    return this.http.post<Station>(this.ApiURL, station);
  }

  updateStation(station: Station): Observable<void> {
    return this.http.put<void>(`${this.ApiURL}/${station.stationID}`, station);
  }

  deleteStation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ApiURL}/${id}`);
  }
}
