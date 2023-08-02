import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherURl: string = 'http://localhost:3000/api/weather';
  result:any;
  constructor(private httpClient: HttpClient) { }
  search(Obj){
    return this.httpClient.post<{weather:any}>(this.weatherURl+'/searchCity',Obj);
 
  }
}
