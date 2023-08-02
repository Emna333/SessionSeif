import { Component, OnInit } from '@angular/core';
import {FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup;
obj:any={};
errorMsg:string;

  constructor(private userService:UserService, private router:Router ) { }

  ngOnInit() {
  }

  login(){
    console.log('here is user object', this.obj);
    this.userService.login(this.obj).subscribe(
      (response)=>{
        console.log('here resp from BE' , response);
        if(response.msg !="2"){
          this.errorMsg='Please check Email/Pwd';
        } else{
          localStorage.setItem('connectedUser',JSON.stringify(response.connectedUser));
          if (response.connectedUser.role=='admin') {
            this.router.navigate(['admin']);

          } else {
            this.router.navigate(['']);
          }
        }
      
    } );
  }

}
