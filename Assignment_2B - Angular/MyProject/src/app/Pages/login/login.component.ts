// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router'; // Import RouterModule

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, RouterModule], // Include RouterModule
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   loginObj:loginModel = new loginModel();
// }

// export class loginModel{
  
//   email:string;
//   password:string;
//   constructor(){
    
//     this.email ="";
//     this.password ="";
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  signupUsers: any[] = [];
  loginObj: any = {
    student_id: '',
    password: '',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    const localData = localStorage.getItem('signupUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
  }

  onLogin() {
    const isUserExist = this.signupUsers.find(
      (m) =>
        m.student_id == this.loginObj.student_id &&
        m.password == this.loginObj.password
    );

    if (isUserExist != undefined) {
      alert('Login Successful');

      //Store the logged-in user's details in localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(isUserExist));
      
      this.router.navigate(['/profile']);
    } else {
      alert('Invalid Credentials');
    }
  }
}
