import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent implements OnInit {

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
      tel:['',[Validators.required]],
      img:[''],
    })
  }

  signup(){
    console.log('here signup clicked',this.signupForm.value);
    this.signupForm.value.role='admin';
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
