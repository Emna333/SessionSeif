import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  addTeamForm: FormGroup;
  stadiumsTab: any = [];
  obj: any = {};
  findedStadium: any;
  stadiumId: any;
  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.stadiumsTab = JSON.parse(localStorage.getItem('stadiums') || '[]');


  }

  generateId(T) {
    var max;
    if (T.length == 0) {
      max = 0;
    }
    else {
      max = T[0].id;
      for (var i = 1; i < T.length; i++) {
        if (T[i].id > max) {
          max = T[i].id;

        }

      }
    }
    return max
  }

  addTeam() {
    // console.log('here obj', this.obj);
    // let teamsTab = JSON.parse(localStorage.getItem('teams') || '[]');
    // this.obj.id = this.generateId(teamsTab) + 1;
    // teamsTab.push(this.obj);
    // localStorage.setItem("teams", JSON.stringify(teamsTab));

    //add team est une methode du service
    //this.team l'objet eli dakhaltou fel formulaire
    console.log('here is obj', this.obj);
    this.teamService.addTeam(this.obj).subscribe();

  }
}
