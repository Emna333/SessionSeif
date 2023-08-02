import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { allPlayers } from 'src/app/data/playersData';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  playerForm: FormGroup;
  playerId: any;
  player: any = {};
  players: any = allPlayers;

  constructor(private activatedRoute: ActivatedRoute, private playerService: PlayerService) { }

  ngOnInit() {
    this.playerId = this.activatedRoute.snapshot.paramMap.get('id');
    //playerId existe
    // if (this.playerId) {
    //   this.player = this.players.find(
    //     (obj: any) => { return obj.id == this.playerId }
    //   )
    }
    addPlayer() {
      if (this.playerId) {
        this.playerService.editPlayer(this.player).subscribe();
      }
      else {
        this.playerService.addPlayer(this.player).subscribe();
  
      }
    }
  }


  