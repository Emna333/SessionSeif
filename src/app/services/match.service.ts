import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  //Destination Address
  matchURL: string = 'http://localhost:3000/api/matches';
  //httpClient:Livreur
  constructor(private httpClient: HttpClient) { }
  //Response: Array of objects
  getAllMatches() {
    return this.httpClient.get<{ matchesTab: any }>(this.matchURL);
  }
  //Response:One object
  getMatchById(id) {
    return this.httpClient.get<{ findedMatch: any }>(`${this.matchURL}/${id}`);
    //  +: concaténation
  }
  //Response:Boolean/String
  deleteMatchById(id) {
    return this.httpClient.delete<{ message: string }>(`${this.matchURL}/${id}`);
  }
  //Response:Boolean/String
  addMatch(matchObj: any) {
    return this.httpClient.post<{ msg: string }>(this.matchURL, matchObj);

  }
  //match obj fih les valeurs et l'id donc yaaref win yhot
  //Response:Object/Boolean/String
  editMatch(matchObj) {
    return this.httpClient.put<{ message: string }>(this.matchURL, matchObj);
  }
  searchMatch(matchObj) {
    return this.httpClient.post(this.matchURL + '/searchMatches', matchObj);

  }
}
