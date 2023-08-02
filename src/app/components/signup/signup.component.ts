import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMsg:any;
  imagePreview:string;

  constructor(private X:FormBuilder, private router:Router , private userService:UserService ) { }
  ngOnInit() {
   this.signupForm= this.X.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],//validateur obligatoire
      lastName: ['',[Validators.required, Validators.minLength(5)]],
      email: ['',[Validators.required, Validators.email]],
      pwd: ['',[Validators.required ,
        // Validators.pattern(‘(1=.*[a-z])(1=.*[A-Z])(1=.*[0-9])(1=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,10}’)]
      ]],
      img:[''],
    })
  }

  signup(){
    console.log('here signup clicked',this.signupForm.value);
    this.signupForm.value.role='user';
    this.userService.signup(this.signupForm.value,this.signupForm.value.img).subscribe(
      (response)=>{ console.log('here resp from BE' ,response);
      if (response.msg=='Error with signup') {
        this.errorMsg= response.msg;
      } else {
        this.router.navigate(['login']);
      }
    });

  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }
    
}
