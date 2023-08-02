import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teamURL: string = 'http://localhost:3000/teams';

  constructor(private httpClient: HttpClient) { }
  //Response: Array of objects
  getAllTeames() {
    return this.httpClient.get(this.teamURL);
  }
  //Response:One object
  getTeamById(id: number) {
    return this.httpClient.get(`${this.teamURL} /${id}`);
    //  +: concaténation
  }
  //Response:Boolean/String
  deleteTeamById(id) {
    return this.httpClient.delete(`${this.teamURL} /${id}`);
  }
  //Response:Boolean/String
  addTeam(teamObj: any) {
    return this.httpClient.post(this.teamURL, teamObj);

  }
  //team obj fih les valeurs et l'id donc yaaref win yhot
  //Response:Object/Boolean/String
  editTeam(teamObj) {
    return this.httpClient.put(this.teamURL, teamObj);
  }
}