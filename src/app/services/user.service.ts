import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
userURl: string = 'http://localhost:3000/users';
  constructor(private httpClient: HttpClient) { }
  // userObj=FN,LN,email,pwd
  signup(userObj: any , img:File) {
    let fData= new FormData();
    fData.append('img',img);
    fData.append('firstName',userObj.firstName);
    fData.append('lastName',userObj.lastName);
    fData.append('email',userObj.email);
    fData.append('pwd',userObj.pwd);
    fData.append('role',userObj.role);
    if (userObj.tel) {
      fData.append('tel',userObj.tel);

    }
    return this.httpClient.post<{msg:string}>(this.userURl+'/signup', fData);
  }

    // userObj=email,pwd
    
  login(userObj){
    return this.httpClient.post<{msg:string, connectedUser:any}>(this.userURl+'/login', userObj);
  
  }
}
