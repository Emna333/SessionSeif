import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-stadium',
  templateUrl: './add-stadium.component.html',
  styleUrls: ['./add-stadium.component.css']
})
export class AddStadiumComponent implements OnInit {

  addStadiumForm: FormGroup;
  constructor(private formBuilder: FormBuilder ) { }

  ngOnInit() {

    this.addStadiumForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],//validateur obligatoire
      country: ['', [Validators.required]],
      capacity: ['', [Validators.required]],

    })
  }
 
  addStadium() {

    let stadiumsTab = JSON.parse(localStorage.getItem('stadiums') || '[]');
    this.addStadiumForm.value.id = this.generateId(stadiumsTab) + 1;
    stadiumsTab.push(this.addStadiumForm.value);
    localStorage.setItem("stadiums", JSON.stringify(stadiumsTab));

  }



  generateId(T) {
    let max;
    if (T.length == 0) {
      max = 0;
    }
    else {
      max = T[0].id;
      for (var i = 1; i < T.length; i++) {
        if (T[i].id > max) {
          max = T[i].id;

        }

      }
    }
    return max
  }
}

