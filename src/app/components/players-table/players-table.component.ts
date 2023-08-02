import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allPlayers } from 'src/app/data/playersData';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {
  players: any = [];
  constructor(private router: Router, private playerService:PlayerService ) { }

  ngOnInit() {
    this.playerService.getAllPlayeres().subscribe();
  }
  goToDisplay(x: Number) {
    this.router.navigate([`playerInfo/${x}`])
  }
  goToEdit(x:Number){
    this.router.navigate([`editPlayer/${x}`]) ;
   }
}

 