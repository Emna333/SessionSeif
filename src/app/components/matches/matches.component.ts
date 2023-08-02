import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allMatches } from 'src/app/data/playersData';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: any = [];
  x: any = 'Matches';
  teamToFind: any;
  path: any;
  findedMatches: any = [];
  constructor(private router: Router, private matchService: MatchService) { }

  ngOnInit() {
    this.matchService.getAllMatches().subscribe((response) => {
      console.log('here resp from BE', response.matchesTab);
this.matches=response.matchesTab;
    });

    //   this.matches = allMatches;
    //   this.teamToFind = JSON.parse(localStorage.getItem('teamToFind'));
    //   for (let i = 0; i < this.matches.length; i++) {
    //     if (this.teamToFind.team == this.matches[i].teamOne ||
    //       this.teamToFind.team == this.matches[i].teamTwo) {
    //       this.findedMatches.push(this.matches[i]);

    //     }
    //   }
    //   this.path = this.router.url;
    //   if (this.path == '/allMatches/search') {
    //     this.matches = this.findedMatches;
    //   }
  }

}
