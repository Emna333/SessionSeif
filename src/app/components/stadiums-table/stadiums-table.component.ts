import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stadiums-table',
  templateUrl: './stadiums-table.component.html',
  styleUrls: ['./stadiums-table.component.css']
})
export class StadiumsTableComponent implements OnInit {
  stadiums: any = [];

  constructor(private router:Router) { }

  ngOnInit() {
    this.stadiums = JSON.parse(localStorage.getItem('stadiums') || '[]');
  }

  goToDisplay(x:Number){
    this.router.navigate([`stadiumInfo/${x}`]) ;
   }

  deleteStadiumAdmin(id) {
    let pos = this.searchPositionById(id, this.stadiums);

    this.stadiums.splice(pos, 1);
    localStorage.setItem('stadiums', JSON.stringify(this.stadiums));
  }
  searchPositionById(id, T) {
    let pos;
    for (var i = 0; i < T.length; i++) {
      if (T[i].id == id) {
        pos = i;
        break;

      }

    }
    return pos;
  }

}
