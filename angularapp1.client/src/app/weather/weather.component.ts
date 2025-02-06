import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  latitude: number = 52.52;
  longitude: number = 13.41;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather(): void {
    this.weatherService.getWeather(this.latitude, this.longitude).subscribe(data => {
      this.weatherData = data;
    }, error => {
      console.error('Error fetching weather data', error);
    });
  }
}
