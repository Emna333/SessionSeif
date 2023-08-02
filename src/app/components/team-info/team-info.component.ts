import { Component, OnInit } from '@angular/core';
import { allTeams } from 'src/app/data/playersData';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {
teams:any=allTeams;
teamId:any;
findedTeam:any;
x:any='Team Info'
  constructor(private activatedRoute: ActivatedRoute , private teamService: TeamService) { }

  ngOnInit() {
    this.teamId = this.activatedRoute.snapshot.paramMap.get('id');

    // this.findedTeam=this.teams.find(
    //   //obj:variable locale d'une methode
    //   (obj:any)=>{return obj.id==this.teamId})

    this.teamService.getTeamById(this.teamId).subscribe();


  }

}
