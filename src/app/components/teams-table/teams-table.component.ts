import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allTeams } from 'src/app/data/playersData';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {
  teams: any = [];
  path: string;
  isDisplayed:boolean=false;
  constructor(private router: Router,private teamService:TeamService) { }

  ngOnInit() {
    this.path = this.router.url;
    this.teamService.getAllTeames().subscribe();

    // alert(this.path);
    if (this.path=='/admin') {
      this.isDisplayed=true; 
    }
  }
  goToDisplay(x: number) {
    this.router.navigate([`teamInfo/${x}`]);

  }
}
