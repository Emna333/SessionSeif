import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playerURL: string = 'http://localhost:3000/players';

  constructor(private httpClient: HttpClient) { }
  //Response: Array of objects
  getAllPlayeres() {
    return this.httpClient.get(this.playerURL);
  }
  //Response:One object
  getPlayerById(id: number) {
    return this.httpClient.get(`${this.playerURL} /${id}`);
    //  +: concaténation
  }
  //Response:Boolean/String
  deletePlayerById(id) {
    return this.httpClient.delete(`${this.playerURL} /${id}`);
  }
  //Response:Boolean/String
  addPlayer(playerObj: any) {
    return this.httpClient.post(this.playerURL, playerObj);

  }
  //Response:Object/Boolean/String
  editPlayer(playerObj) {
    return this.httpClient.put(this.playerURL, playerObj);
  }
  



}
