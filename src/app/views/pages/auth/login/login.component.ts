import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;

  constructor(private http:HttpClient,private router: Router, private route: ActivatedRoute) { }
loginObj:any={
  "username": "",
  "password":""
}
  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
  }

  onLoggedin(e: Event) {
    console.log('request obj:', JSON.stringify(this.loginObj));

    this.http.post("http://localhost:3000/auth/login",this.loginObj).subscribe((response:any)=>{
      const jwtToken = response.jwt;
      if (jwtToken) {
        alert('login sucess');
        this.router.navigate([this.returnUrl]);
        
        localStorage.setItem('loginToken', jwtToken);
        // Handle JWT token
      } else {
        alert('login fail'+response.message);
        // Handle other status codes (e.g., error handling)
      }
    },
    (error) => {
      console.error('Error:', error);
      // Handle error
    })
    /*e.preventDefault();
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigate([this.returnUrl]);
    }
    */
  }

}
