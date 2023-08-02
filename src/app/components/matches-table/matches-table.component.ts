import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allMatches } from 'src/app/data/playersData';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.css']
})
export class MatchesTableComponent implements OnInit {
  matches: any = [];
  constructor(private router: Router,
    private matchService: MatchService) { }

  ngOnInit() {
    this.matchService.getAllMatches().subscribe(
      (response) => {
        console.log('here resp from BE', response.matchesTab);
        this.matches = response.matchesTab;
      }
    );
  }
  delete(id) {
    this.matchService.deleteMatchById(id).subscribe(
      (response) => {
        console.log('here response after delete', response.message);
        this.matchService.getAllMatches().subscribe(
          (response) => {
            console.log('here resp from BE', response.matchesTab);
            this.matches = response.matchesTab;
          }
        );
      }
    );

  }


  goToDisplay(x) {
    this.router.navigate([`matchInfo/${x}`]);
  }
  goToEdit(x) {
    this.router.navigate([`editMatch/${x}`]);
  }
}