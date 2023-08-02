import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  //declaration des variables globales
  teams: any = [];
  constructor() { }

  ngOnInit() {
    this.teams = [{id:1, name:'RM' ,owner:'Florantino',foundation:'1907',stadium:'santiago'},
     {id:2, name:'FCB' ,owner:'Laporta',foundation:'1908',stadium:'campnio'}, 
     {id:3, name:'CSS' ,owner:'Khemakhem',foundation:'1930',stadium:'Taib Mhiri'}]
  }

}
