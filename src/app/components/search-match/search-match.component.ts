import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-match',
  templateUrl: './search-match.component.html',
  styleUrls: ['./search-match.component.css']
})
export class SearchMatchComponent implements OnInit {
  title: any = 'Search match';
  searchForm: FormGroup;
  obj:any={};

  constructor(private router:Router) { }

  ngOnInit() {
  }
  searchMatch() {
    localStorage.setItem('teamToFind',JSON.stringify(this.obj));
    this.router.navigate(['allMatches/search']);
  }
}
