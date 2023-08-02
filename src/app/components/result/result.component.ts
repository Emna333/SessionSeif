import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
@Input() X:any;
@Output()matchesToSend:EventEmitter<any>=new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  scoreColor(s1,s2){
if (s1>s2) {
  return'green';  
}
else if (s1<s2) {
  return'orange';
} else {
  return 'blue';
}

  }
}
