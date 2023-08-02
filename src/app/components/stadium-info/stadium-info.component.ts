import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stadium-info',
  templateUrl: './stadium-info.component.html',
  styleUrls: ['./stadium-info.component.css']
})
export class StadiumInfoComponent implements OnInit {
  stadiumId: any;
  findedStadium:any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.stadiumId = this.activatedRoute.snapshot.paramMap.get('id');
    let stadiums = JSON.parse(localStorage.getItem('stadiums') || '[]');

    this.findedStadium = stadiums.find(
      //obj:variable locale d'une methode
      (obj: any) => { return obj.id == this.stadiumId }
    )
  }

}
