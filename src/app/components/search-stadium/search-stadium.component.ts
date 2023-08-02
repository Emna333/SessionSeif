import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-stadium',
  templateUrl: './search-stadium.component.html',
  styleUrls: ['./search-stadium.component.css']
})
export class SearchStadiumComponent implements OnInit {
  title: any = 'Search Stadium';
  searchStadiumForm: FormGroup;
  stadiumsTab: any = JSON.parse(localStorage.getItem('stadiums') || '[]');
  obj: any = {};
  findedStadiums: any = [];
  constructor() { }

  ngOnInit() {
  }

  searchStadium() {
    console.log('here is searched stadiums', this.obj)
    this.findedStadiums=[];
    for (let i = 0; i < this.stadiumsTab.length; i++) {
      if (this.stadiumsTab[i].name == this.obj.name) {
        this.findedStadiums.push(this.stadiumsTab[i]);
      }
    } 


    // this.findedStadiums = this.stadiumsTab.filter(
    //   (elt) => { return elt.name == this.obj.name }
    // );

  }


}
