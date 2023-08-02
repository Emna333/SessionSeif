import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { allMatches } from 'src/app/data/playersData';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit {
  matchForm: FormGroup;
  matchId: any;
  match: any = {};
  title: any = 'Add Match';
  matches: any = [];

  constructor(private activatedRoute: ActivatedRoute,
    private matchService: MatchService) { }

  ngOnInit() {
    this.matchId = this.activatedRoute.snapshot.paramMap.get('id');
    //matchId existe donc edit
    if (this.matchId) {
      this.title = 'Edit match';
      this.matchService.getMatchById(this.matchId).subscribe((response) => {
        this.match = response.findedMatch;
      });
      // this.match = this.matches.find(
      //   (obj: any) => { return obj.id == this.matchId }
      // )
    }


  }
  addOrEditMatch() {
    console.log('here is obj', this.match);
    //add match est une methode du service
    //this.match l'objet eli dakhaltou fel formulaire
    if (this.matchId) {
      this.matchService.editMatch(this.match).subscribe(
        (response) => {
          console.log('Here response after edit', response.message);

        }
      );
    }
    else {
      this.matchService.addMatch(this.match).subscribe();
      (response) => {
        console.log('Here response after edit', response.msg);

      }
    }
  }
}