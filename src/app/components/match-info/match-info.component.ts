import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { allMatches } from 'src/app/data/playersData';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent implements OnInit {
  //variables globales
  matchId: any;
  findedMatch: any;
  x: any = 'Match Info'
  constructor(private activatedRoute: ActivatedRoute, private matchService: MatchService) { }

  ngOnInit() {

    // for (let i = 0; i < this.matches.length; i++) {
    //   if (this.matches[i].id == this.matchId) {
    //     this.findedMatch = this.matches[i];
    //     break;
    //   }
    // }

    // this.findedMatch=this.matches.find(
    //   //obj:variable locale d'une methode
    //   (obj:any)=>{return obj.id==this.matchId}
    // )

    this.matchId = this.activatedRoute.snapshot.paramMap.get('id');
    this.matchService.getMatchById(this.matchId).subscribe(
      (response) => { this.findedMatch = response.findedMatch; }
    );
  }

}
