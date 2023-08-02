import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherForm: FormGroup;
  searchedCity: any;
  imagePreview: string;
  result: any;
  iconURl: any;
  constructor(private X: FormBuilder, private router: Router, private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherForm = this.X.group({
      city: ['', Validators.required]
    })

  }

  weather() {
    console.log('here weather clicked', this.weatherForm.value);
    this.weatherService.search(this.weatherForm.value).subscribe(
      (response) => {
        console.log('here response from BE', response.weather);
        this.result = response.weather;
        this.iconURl = `https://openweathermap.org/img/wn/${response.weather.icon}@2x.png`;
      });

  }

}