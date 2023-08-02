import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 match:any= {id:1,teamOne:'RMD',teamTwo:'FCB',scoreOne:1,scoreTwo:0};
  constructor() { }

  ngOnInit() {
  }

}
