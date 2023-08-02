import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-occurence',
  templateUrl: './occurence.component.html',
  styleUrls: ['./occurence.component.css']
})
export class OccurenceComponent implements OnInit {
  title: any = 'Occurence';
  occForm: FormGroup;
  obj: any = {};
  result: any = [];

  constructor(private X: FormBuilder) { }

  ngOnInit() {
    this.occForm = this.X.group({
      ch: ['', [Validators.required]],
    }

    )
  }
  //calculate occ number
  nbOcc(ch: any, c: string): number {
    let nb: number = 0;
    for (let i = 0; i < ch.length; i++) {
      if (ch[i] == c) {
        nb = nb + 1;
        // ou nb+=1
      }
    }
    return nb;
  }
  //delete doubles
  cleanCh(chaine: string): string {
    let result: string = '';
    for (let i = 0; i < chaine.length; i++) {
      if (this.nbOcc(result, chaine[i]) == 0) {
        result = result + chaine[i];
      }
    }
    return result;
  }


  display() {
    let userInput = this.cleanCh(this.occForm.value.ch);
    for (let i = 0; i < userInput.length; i++) {
      let nb = this.nbOcc(this.occForm.value.ch, userInput[i]);
      this.result.push(userInput[i] + ':' + nb);

    }
    console.log('here result', this.result);
  }

  deleteSpace(ch: any) {
    let result: any = ch;
    for (let i = 1; i < ch.length - 1; i++) {
      if ((ch[i] == ' ' && ch[i - 1] == ' ') || (ch[i] == ' ' && ch[i + 1] == ' ') || (ch[i] == ' ' && ch[i + 1] == '.')) {
        ch.splice(i, 1);
      }

    }
    if (ch[0] == ' ') {
      ch.splice(0, 1);
    }
    console.log('result', ch);
    alert(ch)
    return ch;

  }


}
